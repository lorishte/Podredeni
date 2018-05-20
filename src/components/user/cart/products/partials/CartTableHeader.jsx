import React from 'react';

import { CART } from '../../../../../data/constants/componentConstants';

class CartTableHeader extends React.Component {
	constructor (props) {
		super(props);
	}
	render() {
		return (
			<thead>
			<tr>
				{this.props.editable &&
				<th/>
				}
				<th colSpan={2}>{CART.product}</th>
				<th>{CART.quantity}</th>
				<th className="text-right">{CART.price}</th>
				<th className="text-right">{CART.sum}</th>
			</tr>
			</thead>
		);
	}
}

export default CartTableHeader;
