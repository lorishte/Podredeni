import React from 'react';
import { Link } from 'react-router-dom';


class TopSellerProductCard extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		const data = this.props.data;

		return (
				<Link to={'/products/' + data.id}>
					<div className="top-seller-card" style={{width: this.props.width + 'px'}}>
						<div className="product-image">
							<img className="card-img-top" src={data.images[0]} alt="Card image cap"/>
						</div>
						<div className="card-body">
							<h4 className="card-title">{data.name}</h4>
							<p className="card-text">{data.description.substring(0, 80) + ' ...'}</p>
							<p className="price">{data.price.toFixed(2)}</p>
						</div>
					</div>
				</Link>
		);
	}
}

export default TopSellerProductCard;
