import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, FormGroup, FormControl, ControlLabel, Checkbox, Radio, Button } from 'react-bootstrap';

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
			toAddress: this.props.data.toAddress
		};
	}

	updateInfo = (stateProp, data) => {
		this.setState({[stateProp]: data}, () => {
			this.props.onChange('orderDetails', this.state);
		});
	};

	submitInfo = (e) => {
		e.preventDefault();
		this.props.continue();
	};

	render () {
		return (
			<form onSubmit={(e) => this.submitInfo(e)}>
				<Row className="bg-light">
					<Col sm={12}>
						<h3>Данни за получателя</h3>
						<hr/>
						<RecipientDetails
							data={this.state.recipientInfo}
							onChange={this.updateInfo}/>
					</Col>
				</Row>

				<Row>
					<Col sm={12}>
						<h3>Данни за доставка</h3>
						<hr/>

						<DeliveryOptions
							onChange={this.updateInfo}
							toAddress={this.state.toAddress}/>

						<hr/>

						{!this.state.toAddress &&
						<DeliveryToEkontOffice
							data={this.state.ekontDetails}
							onChange={this.updateInfo}/>}

						{this.state.toAddress &&
						<DeliveryToAddress
							data={this.state.addressDetails}
							onChange={this.updateInfo}/>}
					</Col>
				</Row>

				<Row>
					<Col sm={12}>
						<h3>Допълнителна информация</h3>
						<hr/>

						<Comment
							data={this.state.comment}
							onChange={this.updateInfo}/>

						<Checkbox readOnly>
							Съгласен/а съм с <Link to={'/products'} className="btn-link">Условията за ползване.</Link>
						</Checkbox>
					</Col>
				</Row>

				<Button  onClick={this.props.goBack}>Назад</Button>
				<Button bsStyle='primary' type="submit">Продължи</Button>
			</form>
		);
	}
}

export default OrderDetails;
