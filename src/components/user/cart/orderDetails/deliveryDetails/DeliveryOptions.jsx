import React from 'react';

import { FormGroup, Radio } from 'react-bootstrap';

import { CART } from '../../../../../data/constants/componentConstants';


class DeliveryOptions extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			toAddress: this.props.toAddress,
		};
	}

	render () {
		return (

			<FormGroup className="delivery-options">
				<Radio
					name="1"
					inline
					defaultChecked={this.state.toAddress}
					onClick={(e) => {
						this.setState({toAddress: true}, () => {
							this.props.onChange('toAddress', this.state.toAddress);
						})
					}}>
					{CART.toAddress}
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
					{CART.toEkontOffice}
				</Radio>{' '}
			</FormGroup>
		);
	}
}

export default DeliveryOptions;
