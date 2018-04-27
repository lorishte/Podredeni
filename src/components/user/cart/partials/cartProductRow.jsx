import React from 'react';

import { Form, FormGroup, Col, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap';

class CartProductRow extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			quantity: this.props.quantity
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	increment = () => {
		let currentQuantity = Number(this.state.quantity);
		if (currentQuantity === 10) return;
		this.setState({quantity: Number(this.state.quantity) + 1}, () => {
			this.props.edit(this.props.data.id, this.state.quantity);
		});
	};

	decrement = () => {
		let currentQuantity = Number(this.state.quantity);
		if (currentQuantity === 1) return;
		this.setState({quantity: currentQuantity - 1}, () => {
			this.props.edit(this.props.data.id, this.state.quantity);
		});
	};

	render () {

		let product = this.props.data;
		let quantity = this.props.quantity;

		return (
			<tr>
				<td>{this.props.index}</td>
				<td>{product.name}</td>
				<td>
					{this.state.quantity}
					<button onClick={this.increment}>+</button>
					<button onClick={this.decrement}>-</button>
				</td>
				<td>{product.price.toFixed(2)}</td>
				<td>{(product.price * quantity).toFixed(2)}</td>
				<th>
					<button onClick={() => this.props.delete(product.id)} className="btn btn-xs btn-danger">
						<i className="fa fa-times" aria-hidden="true"/>
					</button>
				</th>
			</tr>

		);
	}
}

export default CartProductRow;
