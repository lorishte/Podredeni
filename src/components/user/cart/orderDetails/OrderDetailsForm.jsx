import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastr';
import { Row, Col } from 'react-bootstrap';

import RecipientDetails from './recipientDetails/RecipientDetails';
import DeliveryToEkontOffice from './deliveryDetails/DeliveryToEkontOffice';
import DeliveryToAddress from './deliveryDetails/DeliveryToAddress';
import DeliveryOptions from './deliveryDetails/DeliveryOptions';
import Comment from './comment/Comment';

const REQUIRED_FIELDS = [];

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

	updateInfo = (stateProp, data) => {
		this.setState({[stateProp]: data}, () => {
			this.props.onChange('orderDetails', this.state);
		});
	};

	handleCheckBox = (e) => {
		this.setState({termsAgreed: e.target.checked});
	};

	checkFields = () => {
		let emptyFields = [];

		for (let el in this.state) {
			if (el === 'toAddress' || el === 'comment') continue;

			console.log(el);

			if (el === 'recipientInfo') {
				console.log('from user');
				let user = this.state.recipientInfo;

				for (let input in user) {
					if (user[input] === '') {
						emptyFields.push(input);
					}
				}
			}

			if (el === 'ekontDetails' && !this.state.toAddress) {
				console.log('from ekont');
				let ekont = this.state.ekontDetails;

				for (let input in ekont) {
					if (input === 'country') continue;

					if (ekont[input] === '') {
						emptyFields.push(input);
					}
				}
			}

			if (el === 'addressDetails' && this.state.toAddress) {
				console.log('from address');
				let address = this.state.addressDetails;

				for (let input in address) {

					if (input === 'district' ||
						input === 'street' ||
						input === 'streetNo' ||
						input === 'block' ||
						input === 'entrance' ||
						input === 'floor' ||
						input === 'apartment') continue;

					if (address[input] === '') {
						emptyFields.push(input);
					}
				}
			}

			if (el === 'termsAgreed') {
				console.log('from terms');
				if (sessionStorage.getItem('role') === 'admin') continue;

				if (!this.state[el]) {
					emptyFields.push(el);
					this.agreed.current.focus();
				}
			}
		}

		return emptyFields;
	};

	showWarning = (message) => {
		this.toastContainer.warning(message, 'Моля, попълнете следните полета:', {
			closeButton: false,
		});
	};

	submitInfo = (e) => {
		e.preventDefault();

		console.log(this.checkFields());

		let result = this.checkFields();

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
			<form onSubmit={(e) => this.submitInfo(e)}>

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
								<span className="text-danger">*&nbsp;</span> Съгласен/а съм с <Link to={'/products'} className="btn-link">Условията за
								ползване.</Link>
							</label>
						}

					</Col>
				</Row>

				<Row className="buttons-container">
					<Col xs={12} className="text-center">
						<button className={isAdmin ? "btn btn-default" : "btn-custom default md"}
						        onClick={e => {
							e.preventDefault();
							this.props.cancel();
						}}>Отказ
						</button>
						<button className={isAdmin ? "btn btn-default" : "btn-custom default md"}
						        onClick={ e => {
							e.preventDefault();
							this.props.goBack();
						}}>Назад
						</button>
						<button className={isAdmin ? "btn btn-primary" : "btn-custom primary md"}
						        type="submit">Напред</button>
					</Col>
				</Row>
			</form>
		);
	}
}

export default OrderDetails;
