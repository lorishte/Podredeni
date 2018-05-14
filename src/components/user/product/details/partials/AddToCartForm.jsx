import React from 'react';

import { FormGroup, ControlLabel, FormControl, Col, Row, Button, Form } from 'react-bootstrap';

class AddToCartForm extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			quantity: 1,
		};
	}

	handleChange = (e) => {
		this.setState({quantity: e.target.value});
	};

	message = '';
	getValidationState = () => {
		const num = Number(this.state.value);
		console.log(num);

		if (num === 0) {
			this.message = 'Please, add at least one product.';
			return 'error';
		}
		else if (num > 10) {
			this.message = 'You can add a maximum of 10 testimonials at time.';
			return 'warning';
		}
		else if (num > 0) {
			this.message = '';
			return 'success';
		}

		return null;
	};

	submit = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.state.quantity);

		this.setState({quantity: 1});
	};

	render () {
		return (
			<Row>

				<Col xs={4} sm={12}>
					<Form inline onSubmit={this.submit}>
						<FormGroup
							bsSize="large"
						>
							<ControlLabel/>{' '}
							<FormControl
								type="number"
								min="1"
								max="10"
								value={this.state.quantity}
								onChange={this.handleChange}/>

						</FormGroup>{' '}
						<button type="submit" className="btn-custom primary lg">Add To Cart</button>
					</Form>
				</Col>

			</Row>

		);
	}
}

export default AddToCartForm;