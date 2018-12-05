import React from 'react';
import { ToastContainer } from 'react-toastr';
import { Grid, Row, Col, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

import FormInputField from '../../../common/formComponents/FormInputField';

import PartnerAddressInput from './partials/PartnerAddressInput';

import partnersService from '../../../../services/partners/partnersService';

import { TOASTR_MESSAGES, PARTNERS, PARTNER_CATEGORIES } from '../../../../data/constants/componentConstants';

class EditCreatePartner extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			name: '',
			logoUrl: '',
			webUrl: '',
			category: '',
			addresses: []
		};
	}

	partnerId = this.props.match.params.id;

	componentDidMount () {
		if (this.partnerId) {
			this.loadPartner();
		}
	}

	loadPartner = () => {

		partnersService.load(this.partnerId)
			.then(res => {

				this.setState({
					name: res.name,
					logoUrl: res.logoUrl,
					webUrl: res.webUrl,
					category: res.category,
					addresses: res.partnerLocations
				});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});

			});
	};

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	showMessage = (prop) => {
		this.toastContainer.error('Моля, попълнете следните полета: ' + PARTNERS[prop], '', {
			closeButton: false,
		});
	};

	addToAddressList = (el) => {
		this.setState({addresses: [...this.state.addresses, el]});
	};

	removeAddress = (index) => {
		let prevState = [...this.state.addresses];
		prevState.splice(index, 1);

		this.setState({addresses: prevState});
	};

	cancel = () => {
		this.props.history.go(-1);
	};

	submitInfo = (e) => {

		e.preventDefault();

		if (this.partnerId) {

			partnersService.edit(this.partnerId, this.state).then(res => {

				this.props.history.go(-1);

			}).catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});

			});
		} else {

			partnersService.create(this.state).then(res => {

				this.props.history.go(-1);

			}).catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});

			});
		}
	};

	render () {

		let addresses;

		if (this.state.addresses.length > 0) {
			addresses = this.state.addresses.map((e, i) => {
				return <p key={i}>
					<button className="btn btn-default btn-xs" onClick={(e) => {
						e.preventDefault();
						this.removeAddress(i);
					}}>x
					</button>
					&nbsp;&nbsp; {e.city}, {e.address}</p>;
			});
		}

		let categories = Object.keys(PARTNER_CATEGORIES).map(e => {
			return <option key={e} value={e}>{PARTNER_CATEGORIES[e]}</option>;
		});

		return (
			<Grid id="create-partner">

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				<Row>
					<Col sm={12}>
						{!this.promoId && <h3>Добавяне на партньор</h3>}
						{this.promoId && <h3>Редакция на партньор</h3>}
						<hr/>
					</Col>
				</Row>

				<form onSubmit={(e) => this.submitInfo(e)}>
					<Row>
						<Col xs={12} md={5} sm={8}>
							<FormInputField
								label={PARTNERS.name}
								name="name"
								type="text"
								value={this.state.name}
								required={true}
								disabled={false}
								onChange={this.handleChange}/>

						</Col>
					</Row>

					<Row>
						<Col xs={12} md={5} sm={8}>
							<FormInputField
								label={PARTNERS.logoUrl}
								name="logoUrl"
								type="url"
								value={this.state.logoUrl}
								required={false}
								disabled={false}
								onChange={this.handleChange}/>
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={5} sm={8}>
							<FormInputField
								label={PARTNERS.webUrl}
								name="webUrl"
								type="url"
								value={this.state.webUrl}
								required={false}
								disabled={false}
								onChange={this.handleChange}/>

						</Col>
					</Row>

					<Row>
						<Col xs={12} md={5} sm={8}>
							<FormGroup controlId={PARTNERS.category}>
								<ControlLabel>{PARTNERS.category}<label className="text-danger">&nbsp;*</label>
								</ControlLabel>
								<FormControl
									componentClass="select"
									name='category'
									value={this.state.category}
									onChange={this.handleChange}
									required={true}>

									<option value="" disabled={false}>Моля, изберете:</option>

									{categories}

								</FormControl>
							</FormGroup>

						</Col>
					</Row>


					<PartnerAddressInput
						addToAddressList={this.addToAddressList}
						showMessage={this.showMessage}/>

					{addresses}

					<Row className="buttons-container">
						<Col xs={12}>
							<Button onClick={this.cancel}>Отказ</Button>
							<Button bsStyle='primary' type="submit">Потвърди</Button>
						</Col>
					</Row>

				</form>
			</Grid>
		);
	}
}

export default EditCreatePartner;
