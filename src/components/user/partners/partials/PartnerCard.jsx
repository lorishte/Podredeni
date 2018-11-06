import React from 'react';

import { Link } from 'react-router-dom';

import { PARTNER_CATEGORIES } from '../../../../data/constants/componentConstants';

class PartnerCard extends React.Component {

	constructor (props) {
		super(props);
	}



	render () {

		let p = this.props.partner;
		let webPage = p.webUrl.split('//')[1];

		let addresses;

		if (p.partnerLocations) {
			addresses = p.partnerLocations.map((a, i) => {
				return (
					<p key={i} className="partner-address">{a.address}</p>
				)
			})
		}

		return (
			<div className="partner-card">
				<span className="image-container">
					<img src={p.logoUrl} className="img-thumbnail"/>
				</span>
				<h4 className="partner-name">{p.name}</h4>
				<p className="category">{PARTNER_CATEGORIES[p.category]}</p>

				{addresses!== undefined && <hr/>}
				{addresses}

				{webPage !== undefined && <hr/>}
				{webPage !== undefined && <a href={p.webUrl} target="blank" className="text-sm text-primary">{webPage}</a>}

			</div>
		);
	}
}

export default PartnerCard;