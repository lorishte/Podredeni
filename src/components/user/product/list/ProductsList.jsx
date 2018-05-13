import React from 'react';

import { Row, Grid } from 'react-bootstrap';
import { ToastContainer } from 'react-toastr';

import ProductCard from './partials/ProductCard';

import productsService from '../../../../services/products/productsService';

class ProductsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: [],
			size: 50,
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
				res.products.forEach(e => e.images.reverse());
				this.setState({products: res.products});
			})
			.catch(err => {
				console.log(err.responseText);
			});
	}

	render () {
		let productsList;

		productsList = this.state.products.map(e => {
			return <ProductCard key={e.id} data={e} toastContainer={this.toastContainer}/>;
		});

		return (
			<Grid>
				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>
				<Row className="show-grid top-sellers">
					{productsList}
				</Row>
			</Grid>
		);
	}
}

export default ProductsList;