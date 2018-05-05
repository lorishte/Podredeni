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

	changeQuantity = (method) => {
		let currentQuantity = Number(this.state.quantity);

		switch (method) {
			case 'increment' : currentQuantity += 1; break;
			case 'decrement' : currentQuantity -= 1; break;
		}

		if (currentQuantity < 1 || currentQuantity > 10) return;

		let productId = this.props.data.id;
		this.setState({quantity: currentQuantity}, () => {
			this.props.edit(productId, this.state.quantity);
		});
	};

	render () {
		let product = this.props.data;
		let quantity = this.props.quantity;

		return (
			<tr>
				{this.props.editable &&
					<td>
						<button onClick={() => this.props.delete(product.id)}
						        className="btn btn-xs">
							<i className="fa fa-times" aria-hidden="true"/>
						</button>
					</td>
				}
				<td>{this.props.index}</td>
				<td className="col-xs-1"><img className="image-thumbnail" src={product.images[0]}/></td>
				<td>{product.name}</td>
				<td>
					<span className="col-xs-2 quantity">{this.state.quantity}</span>
					{this.props.editable &&
						<span className="col-xs-8 arrows-container">
							<button className="btn btn-xs" onClick={() => this.changeQuantity('increment')}>+</button>
							<button className="btn btn-xs" onClick={() => this.changeQuantity('decrement')}>-</button>
						</span>
					}
				</td>
				<td className="text-right">{product.price.toFixed(2)}</td>
				<td className="text-right">{(product.price * quantity).toFixed(2)}</td>
			</tr>

		);
	}
}

export default CartProductRow;
