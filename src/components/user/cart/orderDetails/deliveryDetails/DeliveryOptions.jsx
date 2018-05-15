import React from 'react';

import { FormGroup, Radio } from 'react-bootstrap';


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
					Доставка до офис на ЕКОНТ
				</Radio>{' '}
			</FormGroup>
		);
	}
}

export default DeliveryOptions;
