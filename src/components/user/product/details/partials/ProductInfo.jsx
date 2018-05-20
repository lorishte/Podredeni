import React from 'react';

import { Row, Col, PageHeader, Label } from 'react-bootstrap';

import { PRODUCT, CURRENCY } from '../../../../../data/constants/componentConstants';

class ProductInfo extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		const product = this.props.data;

		return (
			<Row>
				<Col xs={12}>
					<PageHeader>
						{product.name + ' '}
					</PageHeader>
					<p>{product.description}</p>
					<p>{PRODUCT.price} <span className="price">{product.price.toFixed(2)} {CURRENCY}</span></p>
				</Col>
			</Row>
		);
	}
}

export default ProductInfo;