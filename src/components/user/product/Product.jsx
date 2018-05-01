import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Grid, Row, Col, Image, PageHeader } from 'react-bootstrap';
import { ToastContainer } from 'react-toastr';

import ProductInfo from './partials/ProductInfo';
import AddToCartForm from './partials/AddToCartForm';
import ProductTabs from './partials/ProductTabs';

import products from '../../../data/products';


class Product extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			product: '',
			quantity: 0
		};
	}

	toastContainer;

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
				sessionStorage.setItem('products', '[]');
			}

			let addedProducts = JSON.parse(sessionStorage.getItem('products'));

			if (this.checkIfProductIsInCart(addedProducts)) {
				this.toastContainer.warning('Please go to your cart to update quantity!', 'This product is already added in your cart!', {
					closeButton: true,
				});
				return;
			}

			addedProducts.push(this.state);
			sessionStorage.products = JSON.stringify(addedProducts);

			this.toastContainer.success('Redirecting to all products.', 'Product added to your cart.', {
				closeButton: true,
			});
		});
	};


	checkIfProductIsInCart = (array) => {
		return (array.filter(e => e.product.name === this.state.product.name).length > 0)
	};

	render () {
		const product = this.state.product;

		return (
			<Grid id="product">

				<PageHeader>
					<Link to="/products" className="hidden-link">Products</Link>
				</PageHeader>


				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"/>

				<Row>
					<Col xs={8} sm={6} md={4}>
						<Image src={'../' + product.imageUrls[0]} thumbnail/>
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