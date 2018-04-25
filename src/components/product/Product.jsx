import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, PageHeader } from 'react-bootstrap';

import ProductInfo from './partials/ProductInfo'
import ProductTabs from './partials/ProductTabs';

import products from '../../data/products';

class Product extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			product: '',
		};
	}

	componentDidMount () {
		this.getProductDetails(this.props.match.params.id);
	}

	getProductDetails = (id) => {
		const product = products.filter(p => p.id === Number(id))[0];
		this.setState({product});
	};

	render () {
		const product = this.state.product;

		return (
			<Grid id="product" className="container">
				<PageHeader>
					<Link to="/products" className="hidden-link">Products</Link>
				</PageHeader>
				<div>
					<ProductInfo data={product}/>
					<ProductTabs/>
				</div>
			</Grid>
		);
	}
}

export default Product;