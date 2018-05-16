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

	submitInfo = (e) => {
		e.preventDefault();

		if (sessionStorage.getItem('role') === 'admin'){
			this.props.continue();
			return;
		}

		if (!this.state.termsAgreed) {
			this.toastContainer.warning('Моля, попълнете всички задължителни полета.', '', {
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
							* Съгласен/а съм с <Link to={'/products'} className="btn-link">Условията за
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
