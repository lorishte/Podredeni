import React from 'react';

class PartnerCard extends React.Component {

	constructor (props) {
		super(props);

	}

	render () {

		let p = this.props.partner;

		return (
			<div className="partner-card">
				<div className="image-container">
					<img src={p.logoUrl} className="img-thumbnail"/>
				</div>
				<p>{p.name}</p>
			</div>
		);
	}
}

export default PartnerCard;