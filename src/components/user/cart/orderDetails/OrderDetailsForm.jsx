import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Checkbox, Button } from 'react-bootstrap';

import { ToastContainer } from 'react-toastr';

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
		this.setState({termsAgreed: e.target.checked}, () => console.log(this.state));
	};

	submitInfo = (e) => {
		e.preventDefault();

		if (!this.state.termsAgreed) {
			this.toastContainer.warning('Моля, съгласете се с условията за ползване!', '', {
				closeButton: false,
			});

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
						<Comment
							data={this.state.comment}
							onChange={this.updateInfo}/>

						<label>
							<input type="checkbox"
							       ref={this.agreed}
							       name="termsAgreed"
							       defaultChecked={this.state.termsAgreed}
							       onChange={this.handleCheckBox}/>
							Съгласен/а съм с <Link to={'/products'} className="btn-link">Условията за
							ползване.</Link>
						</label>

					</Col>
				</Row>

				<Row className="buttons-container">
					<Col xs={12} className="text-center">
						<button className="btn-custom default md" onClick={this.props.cancelOrder}>Отказ</button>
						<button className="btn-custom default md" onClick={this.props.goBack}>Назад</button>
						<button className="btn-custom primary md" type="submit">Напред</button>
					</Col>
				</Row>
			</form>
		);
	}
}

export default OrderDetails;
