import React from 'react';

import { Link } from 'react-router-dom';

import utils from '../../../../../utils/utils';

import { BUTTONS_BG } from '../../../../../data/constants/componentConstants';

class PromoTableRow extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		let p = this.props.data;

		let promoType = this.props.promoType;

		let editRoute = '/promos/edit-' + promoType +'-promo/' + p.id;

		return (
			<tr className="text-center">
				<td>
					{p.name}
				</td>

				{promoType === 'discount' &&
				<td>
					{p.discount} %
				</td>
				}

				{promoType === 'product' &&
				<td>
					{p.usedQuota + " / " + p.quota}
				</td>
				}

				<td>
					{utils.formatDate(p.startDate)}
				</td>
				<td>
					{utils.formatDate(p.endDate)}
				</td>
				<td className="text-center">

					<Link to={editRoute} className="btn btn-success btn-xs">
						<i className="fa fa-pencil" aria-hidden="true"/>
					</Link>

					<button className={'btn btn-danger btn-xs'}
					        onClick={() => this.props.confirmDelete(p.id, promoType)}>
						<i className="fa fa-eraser" aria-hidden="true"/>
					</button>
				</td>
			</tr>

		);
	}
}

export default PromoTableRow;
