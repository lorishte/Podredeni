import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Grid, PageHeader, Image, Label, Tabs, Tab } from 'react-bootstrap';

import AddToCartForm from './AddToCartForm';

class ProductInfo extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		const product = this.props.data;

		return (
			<Row>
				<Col xs={8} sm={6} md={4}>
					<Image src={'../' + product.imageUrl} thumbnail/>
				</Col>
				<Col mdOffset={1} xs={12} sm={6} md={7}>
					<PageHeader>
						{product.name + ' '}<Label bsStyle="info">New</Label>
					</PageHeader>
					<p>{product.description}</p>
					<p>Price: <span className="price">{product.price}</span></p>

					<AddToCartForm/>
				</Col>
			</Row>
		);
	}
}

export default ProductInfo;