import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, FormGroup, FormControl, ControlLabel, Checkbox, Radio, Button } from 'react-bootstrap';

import RecipientInfoInputs from '../recipientDetails/RecipientDetails';
import EkontInfoInputs from './DeliveryToEkontOffice';
import AddressInfoInputs from './DeliveryToAddress';

class DeliveryOptions extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			toAddress: this.props.toAddress,
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
					Доставка до посочен адрес
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
					Доставка со офис на ЕКОНТ
				</Radio>{' '}
			</FormGroup>
		);
	}
}

export default DeliveryOptions;
