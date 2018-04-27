import React from 'react';

class CartProductRow extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		let product = this.props.data;
		let quantity = this.props.quantity;

		return (
			<tr>
				<td>{this.props.index}</td>
				<td>{product.name}</td>
				<td>{quantity}</td>
				<td>{product.price.toFixed(2)}</td>
				<td>{(product.price * quantity).toFixed(2)}</td>
				<th>
					<button onClick={() => this.props.delete(product.id)} className="btn btn-xs btn-danger">
						<i className="fa fa-times" aria-hidden="true"/>
					</button>
					{' '}
					<button onClick={() => this.props.edit(product.id)} className="btn btn-xs btn-success">
						<i className="fa fa-pencil" aria-hidden="true"/>
					</button>
				</th>
			</tr>

		);
	}
}

export default CartProductRow;
