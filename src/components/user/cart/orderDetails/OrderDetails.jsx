import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, FormGroup, FormControl, ControlLabel, Checkbox, Radio, Button } from 'react-bootstrap';

import RecipientInfoInputs from './RecipientInfoInputs';
import EkontInfoInputs from './EkontInfoInputs';
import AddressInfoInputs from './AddressInfoInputs';
import DeliveryOptions from './DeliveryOptions';

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
			console.log(this.state[stateProp]);
		});
	};

	toggleDeliveryInputs = () => {
		this.setState({toAddress: !this.state.toAddress});
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
						<FormGroup controlId="formControlsTextarea">
							<ControlLabel>Comment</ControlLabel>
							<FormControl componentClass="textarea"/>
						</FormGroup>

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
