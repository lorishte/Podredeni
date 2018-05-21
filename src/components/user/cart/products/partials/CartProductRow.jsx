import React from 'react';

import { CURRENCY } from '../../../../../data/constants/componentConstants';


class CartProductRow extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			quantity: this.props.data.quantity
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
		let p = this.props.data;

		return (
			<tr>
				{this.props.editable &&
					<td>
						<button onClick={() => this.props.delete(p.id)}
						        className="btn btn-default btn-xs">

							x
						</button>
					</td>
				}
				<td >
					<img className="image-thumbnail" src={p.image}/>
				</td>
				<td>
					{p.name}
					</td>
				<td className="text-center">
					<span className="quantity">
						{this.state.quantity}
					</span>

					{this.props.editable &&
					<span className="arrows-container">
							<button className="btn btn-default btn-xs" onClick={() => this.changeQuantity('increment')}>+</button>
							<button className="btn btn-default btn-xs" onClick={() => this.changeQuantity('decrement')}>-</button>
						</span>
					}
				</td>

				<td className="text-right">
					{p.price.toFixed(2) + ' ' + CURRENCY}
					</td>
				<td className="text-right">
					{(p.price * p.quantity).toFixed(2) + ' ' + CURRENCY}
					</td>
			</tr>

		);
	}
}

export default CartProductRow;
