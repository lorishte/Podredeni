import React from 'react';

class PartnerCard extends React.Component {

	constructor (props) {
		super(props);

	}

	render () {

		let p = this.props.partner;

		let addresses;

		if (p.addresses.length > 0) {
			addresses = p.addresses.map((a, i) => {
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
				<h4>{p.name}</h4>

				{addresses}

			</div>
		);
	}
}

export default PartnerCard;