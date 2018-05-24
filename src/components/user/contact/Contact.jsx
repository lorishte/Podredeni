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
			content: '',
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

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	resetState = () => {
		this.setState(this.baseState);
	};

	sendContactForm = () => {

		const [name, email, subject, content] = [this.state.name, this.state.email, this.state.subject, this.state.content];

		contactService.sendContactForm(name, email, subject, content)
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
				<div style={{"textAlign": "center"}}>
					<p>
						<strong>Армоник ООД</strong> е вносител на американските магнитни клипсове<br/>
						адрес: гр. София, бул. Цар Борис III, 91<br/>
						тел. 0888 170 767
					</p>
				</div>

				<hr/>
				<div style={{"textAlign": "center"}}>
					<p>
						<strong>Форма за контакт</strong>
					</p>
				</div>
				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				<Row>
					<Col xs={resolution ? 12 : 8} sm={6} md={4} xsOffset={resolution ? 0 : 2} smOffset={3} mdOffset={4}>
						<FormGroup controlId="contact-form">

							<FormInputField
								label={CONTACT_FORM.name}
								type="text"
								name="name"
								required={true}
								value={this.state.name}
								placeholder=""
								onChange={this.handleChange}
							/>

							<FormInputField
								label={CONTACT_FORM.email}
								type="email"
								name="email"
								required={true}
								value={this.state.email}
								placeholder=""
								onChange={this.handleChange}
							/>

							<FormInputField
								label={CONTACT_FORM.subject}
								type="text"
								name="subject"
								required={false}
								value={this.state.subject}
								placeholder=""
								onChange={this.handleChange}/>

							<FormTextareaField
								label={CONTACT_FORM.message}
								componentClass="textarea"
								type="text"
								name="content"
								required={true}
								value={this.state.content}
								placeholder=""
								onChange={this.handleChange}/>
						</FormGroup>

						<div className="buttons-container text-center">

							<button className="btn-custom primary md"
							        onClick={this.sendContactForm}>{BUTTONS_BG.send}</button>
						</div>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default Contact;
