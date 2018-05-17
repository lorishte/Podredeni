import React from 'react';

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
				{!resolution && <th colSpan={colSpan} className="text-right">Общо:</th>}
				{!resolution && <th className="text-right">{totalSum}</th>}

				{resolution && <th colSpan={colSpan + 1} className="text-center">Общо: {totalSum}</th>}
			</tr>
			</tfoot>
		);
	}
}

export default CartTableFooter;
