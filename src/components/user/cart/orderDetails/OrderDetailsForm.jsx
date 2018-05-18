import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastr';
import { Row, Col } from 'react-bootstrap';

import RecipientDetails from './recipientDetails/RecipientDetails';
import DeliveryToEkontOffice from './deliveryDetails/DeliveryToEkontOffice';
import DeliveryToAddress from './deliveryDetails/DeliveryToAddress';
import DeliveryOptions from './deliveryDetails/DeliveryOptions';
import Comment from './comment/Comment';

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

		for (let el in this.state) {
			if (el === 'toAddress' || el === 'comment') break;
			console.log(el);

			if (el === 'termsAgreed') {
				console.log('from terms');

				if (!this.state[el]) {
					this.showWarning();
					this.agreed.current.focus();
					return false;
				}
			}

			if (el === 'recipientInfo') {
				console.log('from user');
				let user = this.state.recipientInfo;

				for (let input in user) {
					console.log(user[input]);
					if (user[input] === '') {
						console.log(222)
						this.showWarning();
						return false;
					}
				}
			}

			if (el === 'ekontDetails' && !this.state.toAddress) {
				console.log('from ekont');
				let ekont = this.state.ekontDetails;

				for (let input in ekont) {
					console.log(ekont[input]);
					if (ekont[input] === '') {
						this.showWarning();
						return false;
					}
				}
			}

			if (el === 'addressDetails' && this.state.toAddress) {
				console.log('from address');
				let address = this.state.addressDetails;

				for (let input in address) {
					console.log(address[input]);
					if (address[input] === '') {
						this.showWarning(input);
						return false;
					}
				}
			}
		}
	};

	showWarning = (message) => {
		this.toastContainer.warning('Моля, попълнете всички задължителни полета.', message, {
			closeButton: false,
		});
	};

	submitInfo = (e) => {
		e.preventDefault();

		if (!this.checkFields()) return;

		if (sessionStorage.getItem('role') === 'admin') {
			this.props.continue();
			return;
		}

		if (!this.state.termsAgreed) {

			this.showWarning();
			this.agreed.current.focus();
			return;
		}

		this.props.continue();
	};

	render () {
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

						{sessionStorage.getItem('role') !== 'admin' &&
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
						<button className="btn-custom default md" onClick={e => {
							e.preventDefault();
							this.props.cancel();
						}}>Отказ
						</button>
						<button className="btn-custom default md" onClick={ e => {
							e.preventDefault();
							this.props.goBack();
						}}>Назад
						</button>
						<button className="btn-custom primary md" type="submit">Напред</button>
					</Col>
				</Row>
			</form>
		);
	}
}

export default OrderDetails;
