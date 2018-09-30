import React from 'react';

import { Row, Col, PageHeader, Label } from 'react-bootstrap';

import { PRODUCT, CURRENCY } from '../../../../../data/constants/componentConstants';

class ProductInfo extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		const p = this.props.data;

		return (
			<Row>
				<Col xs={12}>
					<PageHeader>
						{p.discount > 0 &&
						<span className="promo-label">-{p.discount}%</span>
						}
						{p.name + ' '}
					</PageHeader>
					<p>{p.description}</p>

					{p.discount === 0 &&
					<p>{PRODUCT.price} <span className="price">{p.price.toFixed(2)} {CURRENCY}</span></p>}

					{p.discount > 0 &&
					<p>
						{PRODUCT.price}
						<span className="old-price">{p.price.toFixed(2)} {CURRENCY}</span>
						<span className="price">{(p.price - p.discount / 100 * p.price).toFixed(2)} {CURRENCY}</span>
					</p>
					}

				</Col>
			</Row>
		);
	}
}

export default ProductInfo;