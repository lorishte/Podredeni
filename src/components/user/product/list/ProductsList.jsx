import React from 'react';

import { Row, PageHeader, Grid } from 'react-bootstrap';

import ProductCard from './partials/ProductCard';

import productsService from '../../../../services/products/productsService';

class ProductsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: [],
			size: 16,
			page: 1,
			sortProperty: 'number',
			descending: true,
			filterProperty: 'name',
			filterValue: ''
		};
	}

	componentDidMount () {
		productsService
			.loadProducts(this.state)
			.then(res => {
				this.setState({products: res.products});
			})
			.catch(err => {
				console.log(err.responseText);
			});
	}

	render () {
		let productsList;

		productsList = this.state.products.map(e => {
			return <ProductCard key={e.id} data={e}/>;
		});

		return (
			<Grid>
				<PageHeader>
					Products
				</PageHeader>
				<Row className="show-grid top-sellers">
					{productsList}
				</Row>
			</Grid>
		);
	}
}

export default ProductsList;