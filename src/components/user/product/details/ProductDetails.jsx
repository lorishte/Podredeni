import React from 'react';

import { Grid, Row, Col, Image, PageHeader } from 'react-bootstrap';
import { ToastContainer } from 'react-toastr';

import ImageGallery from './partials/ImageGallery';
import ProductInfo from './partials/ProductInfo';
import AddToCartForm from './partials/AddToCartForm';
import ProductTabs from './partials/ProductTabs';

import productsService from '../../../../services/products/productsService';

import { RESOLUTIONS } from '../../../../data/constants/componentConstants';

class Product extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			product: '',
			quantity: 0,
			resolution: window.innerWidth
		};
	}

	componentDidMount () {
		this.loadProductData();
		window.addEventListener('orientationchange',  this.handleResolutionChange );
		window.addEventListener('resize', this.handleResolutionChange);
	}

	componentWillUnmount () {
		window.removeEventListener('orientationchange', this.handleResolutionChange );
		window.removeEventListener('resize', this.handleResolutionChange);
	}

	loadProductData = () => {
		let id = this.props.match.params.id;
		productsService
			.getProduct(id)
			.then(res => {
				res.product.images.reverse();
				this.setState({product: res.product});
			})
			.catch(err => {
				this.props.history.push('/error');
			});
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

			let p = this.state.product;
			let product = {
				id: p.id,
				name: p.name,
				image: p.images[0],
				price: p.price,
				quantity: this.state.quantity
			};

			addedProducts.push(product);
			sessionStorage.products = JSON.stringify(addedProducts);

			this.toastContainer.success('', 'Product added to your cart.', {
				closeButton: true,
			});

			this.props.history.push('/products/' + this.state.product.id); // to refresh products count in header
			this.props.history.go(-1); // step back to fix history logic
		});
	};

	checkIfProductIsInCart = (array) => {
		return (array.filter(e => e.id === this.state.product.id).length > 0);
	};

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth})
	};

	render () {
		let product = this.state.product;
		let resolution = this.state.resolution < RESOLUTIONS.xs;

		return (
			<Grid id="product">
				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				{this.state.product !== '' &&
				<Row>
					<Col xs={resolution ? 12 : 6} sm={6} md={5}>
						<ImageGallery images={product.images}/>
					</Col>
					<Col xs={resolution ? 12 : 6} sm={6} md={7}>
						<ProductInfo data={product}/>
						<AddToCartForm onSubmit={this.addToCart}/>
					</Col>
				</Row>
				}
				{/*<Row>*/}
					{/*<ProductTabs/>*/}
				{/*</Row>*/}
			</Grid>
		);
	}
}

export default Product;