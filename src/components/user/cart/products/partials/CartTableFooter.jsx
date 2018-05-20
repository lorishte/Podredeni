import React from 'react';

import { CART } from '../../../../../data/constants/componentConstants';

class CartTableFooter extends React.Component {
	constructor (props) {
		super(props);
	}
	render() {

		let resolution = this.props.resolution;
		let totalSum = this.props.totalSum;
		let colSpan = this.props.colSpan;

		return (
			<tfoot>
			<tr className="lead">
				{!resolution && <th colSpan={colSpan} className="text-right">{CART.totalSum}</th>}
				{!resolution && <th className="text-right">{totalSum}</th>}

				{resolution && <th colSpan={colSpan + 1} className="text-center">{CART.totalSum} {totalSum}</th>}
			</tr>
			</tfoot>
		);
	}
}

export default CartTableFooter;
