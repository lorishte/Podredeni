import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, FormGroup, FormControl, ControlLabel, Checkbox, Radio, Button } from 'react-bootstrap';

import RecipientInfoInputs from '../recipientDetails/RecipientInfoInputs';
import EkontInfoInputs from './EkontInfoInputs';
import AddressInfoInputs from './AddressInfoInputs';

class DeliveryOptions extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			toAddress: false,
		};
	}

	render () {
		return (

			<FormGroup >
				<Radio
					name="1"
					inline
					defaultChecked={this.state.toAddress}
					onClick={(e) => {
						this.setState({toAddress: true}, () => {
							this.props.onChange('toAddress', this.state.toAddress);
						})
					}}>
					Delivery to address
				</Radio>{' '}
				<Radio
					name="1"
					inline
					defaultChecked={!this.state.toAddress}
					onClick={(e) => {
						this.setState({toAddress: false}, () => {
							this.props.onChange('toAddress', this.state.toAddress);
						})
					}}>
					Delivery to Ekont office
				</Radio>{' '}
			</FormGroup>
		);
	}
}

export default DeliveryOptions;
