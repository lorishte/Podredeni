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
				<th>
					<OrderListSortButtons
						sortProperty="number"
						changeClass={this.props.changeClass}
						sort={this.props.sort}/></th>

				<th>{LABELS_BG.status}</th>

				<th className="visible-md visible-lg">{LABELS_BG.lastModificationTableHeader}
					<OrderListSortButtons
						sortProperty="lastModificationDate"
						changeClass={this.props.changeClass}
						sort={this.props.sort}/></th>

				<th className="visible-md visible-lg">{LABELS_BG.customer}</th>

				<th className="visible-md visible-lg">{LABELS_BG.phone}</th>

				<th className="text-right visible-md visible-lg">{LABELS_BG.amount}</th>

				<th className="text-center" >{LABELS_BG.edit}</th>
			</tr>
			</thead>
		);
	}
}

export default OrderListTableHead;
