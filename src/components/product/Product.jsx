import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Grid, Row, Col, Image, PageHeader } from 'react-bootstrap';

import ProductInfo from './partials/ProductInfo';
import AddToCartForm from './partials/AddToCartForm';
import ProductTabs from './partials/ProductTabs';

import products from '../../data/products';

class Product extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			product: '',
			quantity: 0
		};
	}

	componentDidMount () {
		this.getProductDetails(this.props.match.params.id);
	}

	getProductDetails = (id) => {
		const product = products.filter(p => p.id === Number(id))[0];
		this.setState({product});
	};

	addToCart = (quantity) => {
		this.setState({quantity}, () => {
			if (sessionStorage.getItem('products') === null) {
				sessionStorage.setItem('products', JSON.stringify([this.state]));
			} else {
				let addedProducts = JSON.parse(sessionStorage.getItem('products'));
				addedProducts.push(this.state);
				sessionStorage.products = JSON.stringify(addedProducts);
			}
		});
	};

	render () {
		const product = this.state.product;

		// if (this.state.quantity !== 0) {
		// 	return <Redirect to={{
		// 		pathname: '/cart',
		// 		product: this.state
		// 	}}/>;
		// }

		return (
			<Grid id="product">
				<PageHeader>
					<Link to="/products" className="hidden-link">Products</Link>
				</PageHeader>
				<Row>
					<Col xs={8} sm={6} md={4}>
						<Image src={'../' + product.imageUrl} thumbnail/>
					</Col>
					<Col mdOffset={1} xs={12} sm={6} md={7}>
						<ProductInfo data={product}/>
						<AddToCartForm onSubmit={this.addToCart}/>
					</Col>
				</Row>
				<Row>
					<ProductTabs/>
				</Row>
			</Grid>
		);
	}
}

export default Product;