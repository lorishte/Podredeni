import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastr';
import { Row, Col } from 'react-bootstrap';

import RecipientDetails from './recipientDetails/RecipientDetails';
import DeliveryToEkontOffice from './deliveryDetails/DeliveryToEkontOffice';
import DeliveryToAddress from './deliveryDetails/DeliveryToAddress';
import DeliveryOptions from './deliveryDetails/DeliveryOptions';
import Comment from './comment/Comment';

import { ORDER_DELIVERY_INPUTS, NOT_REQUIRED_ORDER_INPUTS, TOASTR_MESSAGES, BUTTONS_BG } from '../../../../data/constants/componentConstants';

class OrderDetails extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			recipientInfo: this.props.data.recipientInfo,
			ekontDetails: this.props.data.ekontDetails,
			addressDetails: this.props.data.addressDetails,
			comment: this.props.data.comment,
			toAddress: this.props.data.toAddress,
			termsAgreed: false
		};

		this.agreed = React.createRef();
	}

	componentDidMount () {
		window.scrollTo(0, 0);
	}

	updateInfo = (stateProp, data) => {
		this.setState({[stateProp]: data}, () => {
			this.props.onChange('orderDetails', this.state);
		});
	};

	handleCheckBox = (e) => {
		this.setState({termsAgreed: e.target.checked});
	};

	validateForm = () => {
		let emptyFields = [];

		for (let el in this.state) {
			if (el === 'toAddress' || el === 'comment') continue;

			if (el === 'recipientInfo') {
				let recipient = this.state.recipientInfo;

				for (let input in recipient) {
					if (recipient[input].trim() === '') {
						emptyFields.push(ORDER_DELIVERY_INPUTS[input]);
					}
				}
			}

			if (el === 'ekontDetails' && !this.state.toAddress) {
				let ekont = this.state.ekontDetails;

				for (let input in ekont) {
					if (input === 'country') continue;

					if (ekont[input].trim() === '') {
						emptyFields.push(ORDER_DELIVERY_INPUTS[input]);
					}
				}
			}

			if (el === 'addressDetails' && this.state.toAddress) {
				let address = this.state.addressDetails;

				for (let input in address) {

					if (NOT_REQUIRED_ORDER_INPUTS.hasOwnProperty(input)) continue;

					if (address[input].trim() === '') {
						emptyFields.push(ORDER_DELIVERY_INPUTS[input]);
					}
				}
			}

			if (el === 'termsAgreed') {
				if (sessionStorage.getItem('role') === 'admin') continue;

				if (!this.state[el]) {
					emptyFields.push(ORDER_DELIVERY_INPUTS[el]);
					this.agreed.current.focus();
				}
			}
		}

		return emptyFields;
	};

	showWarning = (message) => {
		this.toastContainer.warning(message, TOASTR_MESSAGES.requestEmptyFields, {
			closeButton: false,
		});
	};

	submitInfo = (e) => {
		e.preventDefault();

		let result = this.validateForm();

		if (result.length !== 0) {
			this.showWarning(result.join(', '));
			return;
		}

		if (sessionStorage.getItem('role') === 'admin') {
			this.props.continue();
			return;
		}

		this.props.continue();
	};

	render () {

		let isAdmin = sessionStorage.getItem('role') === 'admin';

		return (
			<form onSubmit={(e) => this.submitInfo(e)} id="order-details-form">

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				<Row className="bg-light">
					<Col sm={12}>
						<RecipientDetails
							data={this.state.recipientInfo}
							onChange={this.updateInfo}/>
					</Col>

					<Col sm={12}>
						<hr/>

						<DeliveryOptions
							onChange={this.updateInfo}
							toAddress={this.state.toAddress}/>

						<hr/>

						{!this.state.toAddress &&
						<DeliveryToEkontOffice
							data={this.state.ekontDetails}
							onChange={this.updateInfo}/>
						}

						{this.state.toAddress &&
						<DeliveryToAddress
							data={this.state.addressDetails}
							onChange={this.updateInfo}/>
						}
					</Col>

					<Col sm={12}>
						<hr/>
						<Comment
							data={this.state.comment}
							onChange={this.updateInfo}/>

						{!isAdmin &&
						<label>
							<input type="checkbox"
							       ref={this.agreed}
							       name="termsAgreed"
							       defaultChecked={this.state.termsAgreed}
							       onChange={this.handleCheckBox}/>
							<span className="text-danger">*&nbsp;</span>
							Съгласен/а съм с &nbsp;
							<Link to={'/terms'} className="btn-link">Условията за ползване и политика за поверителност.</Link>
						</label>
						}

					</Col>
				</Row>

				<Row className="buttons-container">
					<Col xs={12} className="text-center">
						<button className={isAdmin ? 'btn btn-default' : 'btn-custom default md'}
						        onClick={ e => {
							        e.preventDefault();
							        this.props.goBack();
						        }}>{BUTTONS_BG.back}
						</button>
						<button className={isAdmin ? 'btn btn-primary' : 'btn-custom primary md'}
						        type="submit">
							{BUTTONS_BG.next}
						</button>
					</Col>
				</Row>
			</form>
		);
	}
}

export default OrderDetails;
