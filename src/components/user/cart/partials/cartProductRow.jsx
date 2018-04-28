import React from 'react';

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
				<td className="col-xs-1"><img className="image-thumbnail" src={product.imageUrl}/></td>
				<td>{product.name}</td>
				<td>
					<span className="col-xs-2 quantity">{this.state.quantity}</span>
					<span className="col-xs-8 arrows-container">
						<button className="btn btn-xs" onClick={this.increment}>+</button>
						<button className="btn btn-xs" onClick={this.decrement}>-</button>
					</span>

				</td>
				<td>{product.price.toFixed(2)}</td>
				<td>{(product.price * quantity).toFixed(2)}</td>
				<th>
					<button onClick={() => this.props.delete(product.id)}
					        className="btn btn-xs">
						<i className="fa fa-times" aria-hidden="true"/>
					</button>
				</th>
			</tr>

		);
	}
}

export default CartProductRow;
