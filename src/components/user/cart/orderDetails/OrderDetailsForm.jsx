import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, FormGroup, FormControl, ControlLabel, Checkbox, Radio, Button } from 'react-bootstrap';

import RecipientInfoInputs from './recipientDetails/RecipientInfoInputs';
import EkontInfoInputs from './deliveryDetails/EkontInfoInputs';
import AddressInfoInputs from './deliveryDetails/AddressInfoInputs';
import DeliveryOptions from './deliveryDetails/DeliveryOptions';
import Comment from './comment/Comment';

class OrderDetails extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			recipientInfo: {},
			ekontDetails: {},
			addressDetails: {},
			comment: '',
			toAddress: false
		};
	}

	updateInfo = (stateProp, data) => {
		this.setState({[stateProp]: data}, () => {
			this.props.onChange('orderDetails', this.state);
		});
	};


	render () {
		return (
			<form>
				<Row className="bg-light">
					<Col sm={12}>
						<h3>Recipient details</h3>
						<hr/>
						<RecipientInfoInputs onChange={this.updateInfo}/>
					</Col>
				</Row>

				<Row>
					<Col sm={12}>
						<h3>Delivery details</h3>
						<hr/>
						<DeliveryOptions onChange={this.updateInfo}/>

						{!this.state.toAddress && <EkontInfoInputs onChange={this.updateInfo}/>}
						{this.state.toAddress && <AddressInfoInputs onChange={this.updateInfo}/>}
					</Col>
				</Row>

				<Row>
					<Col sm={12}>
						<h3>Additional info</h3>
						<hr/>
						<Comment
							id="delivery-comment"
							onChange={this.updateInfo}/>

						<Checkbox readOnly>
							I agree with the <Link to={'/products'} className="btn-link">Terms of Use.</Link>
						</Checkbox>
					</Col>
				</Row>

				<Button type="submit">Submit</Button>
			</form>
		);
	}
}

export default OrderDetails;
