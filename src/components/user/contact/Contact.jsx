import React from 'react';
import { ToastContainer } from 'react-toastr';

import { Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import FormInputField from '../../common/formComponents/FormInputField';
import FormTextareaField from '../../common/formComponents/FormTextareaField';

import contactService from '../../../services/contact/contactService';

import { TOASTR_MESSAGES, CONTACT_FORM, BUTTONS_BG, RESOLUTIONS } from '../../../data/constants/componentConstants';

class Contact extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			subject: '',
			message: '',
			resolution: window.innerWidth
		};

		this.baseState = this.state;

		this.toastContainer = React.createRef();
	}

	componentDidMount () {
		window.scrollTo(0, 0);
		window.addEventListener('orientationchange', this.handleResolutionChange);
		window.addEventListener('resize', this.handleResolutionChange);
	}

	componentWillUnmount () {
		window.removeEventListener('orientationchange', this.handleResolutionChange);
		window.removeEventListener('resize', this.handleResolutionChange);
	}

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth});
	};

	handleInputChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	resetState = () => {
		this.setState(this.baseState);
	};

	validateForm = () => {
		let emptyFields = [];

		for (let el in this.state) {
			if (el === 'subject' || el === 'resolution')continue;
			if (this.state[el].trim() === '') {
				emptyFields.push(CONTACT_FORM[el])
			}
		}

		return emptyFields;
	};

	showWarning = (message) => {
		this.toastContainer.warning(message, TOASTR_MESSAGES.requestEmptyFields, {
			closeButton: false,
		});
	};

	sendMessage = (e) => {
		e.preventDefault();

		const [name, email, subject, message] = [this.state.name, this.state.email, this.state.subject, this.state.message];

		// Check for empty fields
		let result = this.validateForm();
		if (result.length !== 0) {
			this.showWarning(result.join('; '));
			return;
		}

		contactService.sendContactForm(name, email, subject, message)
			.then(res => {
				this.resetState();
				this.toastContainer.success(TOASTR_MESSAGES.messageSent, '', {
					closeButton: true,
				});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};

	render () {

		let resolution = this.state.resolution < RESOLUTIONS.xs;

		return (

			<Grid >
				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				<p className="text-center">
					<strong>Армоник ООД</strong> е вносител на американските магнитни клипсове.<br/>
					адрес: гр. София, бул. Цар Борис III, 91<br/>
					тел. 0888 170 767
				</p>
				<hr/>



				<Row>
					<Col xs={resolution ? 12 : 8} sm={6} md={4} xsOffset={resolution ? 0 : 2} smOffset={3} mdOffset={4}>
						<form onSubmit={this.sendMessage}>

							<FormGroup controlId="contact-form">

								<FormInputField
									label={CONTACT_FORM.name}
									type="text"
									name="name"
									required={true}
									value={this.state.name}
									placeholder=""
									onChange={this.handleInputChange}
								/>

								<FormInputField
									label={CONTACT_FORM.email}
									type="email"
									name="email"
									required={true}
									value={this.state.email}
									placeholder=""
									onChange={this.handleInputChange}
								/>

								<FormInputField
									label={CONTACT_FORM.subject}
									type="text"
									name="subject"
									required={false}
									value={this.state.subject}
									placeholder=""
									onChange={this.handleInputChange}/>

								<FormTextareaField
									label={CONTACT_FORM.message}
									componentClass="textarea"
									type="text"
									name="message"
									required={true}
									value={this.state.message}
									placeholder=""
									onChange={this.handleInputChange}/>
							</FormGroup>

							<div className="buttons-container text-center">

								<button type="submit" className="btn-custom primary md">{BUTTONS_BG.send}</button>
							</div>
						</form>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default Contact;
