import React from 'react';
import { Link } from 'react-router-dom';

import utils from '../../../../../../utils/utils'

import { CURRENCY } from '../../../../../../data/constants/componentConstants';


class TopSellerProductCard extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		const p = this.props.data;

		return (

				<Link to={'/products/' + p.id}>
					<div className="top-seller-card" style={{width: this.props.width - 50 + 'px'}}>
						{p.discount > 0 &&
							<span className="promo-label">-{p.discount}%</span>
						}

						<div className="product-image">
							<img className="card-img-top" src={p.images[0]} alt="Card image cap"/>
						</div>

						<div className="card-body">
							<h4 className="card-title">{p.name}</h4>

							{p.discount === 0 &&
							<p className="price">{p.price.toFixed(2)} {CURRENCY}</p>}

							{p.discount > 0 &&
							<p className="price">
								<span className="old-price">{p.price.toFixed(2)} {CURRENCY}</span>
								<span>{(utils.calculatePriceAfterDiscount(p.price, p.discount)).toFixed(2)} {CURRENCY}</span>
							</p>
							}

						</div>
					</div>
				</Link>

		);
	}
}

export default TopSellerProductCard;
