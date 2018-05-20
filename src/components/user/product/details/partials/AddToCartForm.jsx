import React from 'react';

import { FormGroup, ControlLabel, FormControl, Col, Row, Button, Form } from 'react-bootstrap';

import { PRODUCT } from '../../../../../data/constants/componentConstants';

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

	submit = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.state.quantity);

		this.setState({quantity: 1});
	};

	render () {
		return (
			<Row>
				<Col xs={6} sm={4}>
					<FormGroup bsSize="large">
						<FormControl
							type="number"
							min="1"
							max="10"
							value={this.state.quantity}
							onChange={this.handleChange}/>

					</FormGroup>{' '}
				</Col>

				<button onClick={this.submit} className="btn-custom primary lg add-to-cart-btn">{PRODUCT.addToCart}</button>
			</Row>
		);
	}
}

export default AddToCartForm;