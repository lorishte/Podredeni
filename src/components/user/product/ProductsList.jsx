import React from 'react';

import { Row, PageHeader, Grid } from 'react-bootstrap';

import ProductCard from './partials/ProductCard';
import products from '../../../data/products';

class ProductsList extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		this.topSellers = products.map(product => {
			return <ProductCard key={product.id} data={product}/>;
		});

		return (
			<Grid>
				<PageHeader>
					Products
				</PageHeader>
				<Row className="show-grid top-sellers">
					{this.topSellers}
					{this.topSellers}
					{this.topSellers}
				</Row>
			</Grid>
		);
	}
}

export default ProductsList;