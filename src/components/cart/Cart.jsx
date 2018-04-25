import React from 'react';

import { FormGroup, ControlLabel, HelpBlock, FormControl, Col, Row, Button } from 'react-bootstrap';

class Cart extends React.Component {
	constructor (props, context) {
		super(props, context);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			value: 1,
		};
	}

	message = '';

	getValidationState = () => {
		const num = Number(this.state.value);

		if (num === 0) {
			this.message = 'Please, add at least one product.';
			return 'error';
		}
		else if (num > 9) {
			this.message = 'Are you sure you want to add ' + num + ' testimonials?';
			return 'warning';
		}
		else if (num > 0) {
			this.message = '';
			return 'success';
		}

		return null;
	};

	handleChange (e) {
		this.setState({value: e.target.value});
	}
	render() {
		return (
			<div className="container">
				<h1>Cart</h1>
				<Row>
					<Col xs={8} md={6}>
						<form>
							<FormGroup
								controlId="formBasicText"
								validationState={this.getValidationState()}
							>
								<ControlLabel>Working example with validation</ControlLabel>
								<FormControl
									type="number"
									value={this.state.value}
									min='0'
									placeholder="Enter text"
									onChange={this.handleChange}
								/>
								<FormControl.Feedback />
								<HelpBlock>{this.message}</HelpBlock>
							</FormGroup>
						</form>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Cart;
