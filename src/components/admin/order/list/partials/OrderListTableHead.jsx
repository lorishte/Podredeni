import React from 'react';

import OrderListSortButtons from './OrderListSortButtons';

import { LABELS_BG } from '../../../../../data/constants/componentConstants';

class OrderListTableHead extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<thead>
			<tr>
				<th className="text-center">
					<span className="text-hidden-xs">#</span>
					<OrderListSortButtons
						sortProperty="number"
						changeClass={this.props.changeClass}
						sort={this.props.sort}/></th>

				<th className="visible-md visible-lg">{LABELS_BG.status}</th>

				<th>
					<span className="text-hidden-xs">{LABELS_BG.lastModificationTableHeader}</span>
					<OrderListSortButtons
						sortProperty="lastModificationDate"
						changeClass={this.props.changeClass}
						sort={this.props.sort}/></th>

				<th className="visible-md visible-lg">{LABELS_BG.customer}</th>

				<th className="visible-md visible-lg">{LABELS_BG.phone}</th>

				<th className="text-right visible-md visible-lg">{LABELS_BG.amount}</th>

				<th className="text-center" />
			</tr>
			</thead>
		);
	}
}

export default OrderListTableHead;
