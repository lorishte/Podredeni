import React from 'react';

import { Row, Col, PageHeader, Label } from 'react-bootstrap';

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
					<p>Price: <span className="price">{product.price.toFixed(2)}</span></p>
				</Col>
			</Row>
		);
	}
}

export default ProductInfo;