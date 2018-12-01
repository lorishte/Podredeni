import React from 'react';

import { Link } from 'react-router-dom';

import utils from '../../../../../utils/utils';

import { BUTTONS_BG } from '../../../../../data/constants/componentConstants';

class PromoTableRow extends React.Component {
	constructor (props) {
		super(props);
	}

	confirmDelete = this.props.confirmDelete;

	render () {

		let p = this.props.data;

		let discountType = this.props.isProductPromo ? 'product' : 'discount';

		let editBtn = (
			<Link to={'/promos/edit-' + discountType +'-promo/' + p.id} className="btn btn-success btn-xs">
				<i className="fa fa-pencil" aria-hidden="true"/>
			</Link>
		);

		return (
			<tr className="text-center">
				<td>
					{p.name} <label>{discountType}</label>
				</td>
				<td>
					{p.discount}
				</td>
				<td>
					{utils.formatDate(p.startDate)}
				</td>
				<td>
					{utils.formatDate(p.endDate)}
				</td>
				<td className="text-center">

					{editBtn }


					<button className={'btn btn-danger btn-xs'}
					        onClick={() => this.confirmDelete(p.id)}><i className="fa fa-eraser" aria-hidden="true"/>
					</button>
				</td>
			</tr>

		);
	}
}

export default PromoTableRow;
