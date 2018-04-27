import React from 'react';

import { Form, FormGroup, Col, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap';

class CartProductRow extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			disabled: true,
			quantity: this.props.quantity
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	toggleInputState = () => {
		this.setState({disabled: !this.state.disabled});
	};

	render () {

		let product = this.props.data;
		let quantity = this.props.quantity;

		return (
			<tr>
				<td>{this.props.index}</td>
				<td>{product.name}</td>
				<td>
					<Form onSubmit={(e) => {
						e.preventDefault();
						this.props.edit(product.id, this.state.quantity)
					}}>
						<FormControl
							type="number"
							name="quantity"
							placeholder={this.state.quantity}
							value={this.state.quantity}
							disabled={this.state.disabled}
							onChange={this.handleChange}/>
					</Form>
				</td>
				<td>{product.price.toFixed(2)}</td>
				<td>{(product.price * quantity).toFixed(2)}</td>
				<th>
					<button onClick={() => this.props.delete(product.id)} className="btn btn-xs btn-danger">
						<i className="fa fa-times" aria-hidden="true"/>
					</button>
					{' '}
					<button onClick={this.toggleInputState} className="btn btn-xs btn-success">
						<i className="fa fa-pencil" aria-hidden="true"/>
					</button>
				</th>
			</tr>

		);
	}
}

export default CartProductRow;
