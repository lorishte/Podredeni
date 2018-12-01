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
				<th colSpan={2}>{CART.product}</th>
				<th className="text-center">{CART.quantity}</th>
				<th className="text-right">{CART.price}</th>
				<th className="text-right">{CART.sum}</th>
			</tr>
			</thead>
		);
	}
}

export default CartTableHeader;
