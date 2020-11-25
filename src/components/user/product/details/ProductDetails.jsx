import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastr';

//SEO
import SEO_MetaTags_Dynamic from "../../../common/SEO/SEO_MetaTags_Dynamic";

// Partials
import ImageGallery from './partials/ImageGallery';
import ProductInfo from './partials/ProductInfo';
import AddToCartForm from './partials/AddToCartForm';
import ProductTabs from './partials/ProductTabs';

// Services
import productsService from '../../../../services/products/productsService';

// Constants
import { RESOLUTIONS, TOASTR_MESSAGES, BUTTONS_BG } from '../../../../data/constants/componentConstants';
import {productSefUrls} from '../../../../data/constants/sefUrls'

// Utils
import utils from '../../../../utils/utils'
import productsInStock from "../../../../data/constants/productsInStock";

class Product extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			product: '',
			quantity: 0,
			resolution: window.innerWidth
		};

		this.productId = productSefUrls[this.props.match.params.productName]

	}

	componentDidMount () {
		window.scrollTo(0, 0);
		window.addEventListener('orientationchange', this.handleResolutionChange);
		window.addEventListener('resize', this.handleResolutionChange);

		console.log(this.props)
		this.loadProductData();
	}

	componentWillUnmount () {
		window.removeEventListener('orientationchange', this.handleResolutionChange);
		window.removeEventListener('resize', this.handleResolutionChange);
	}

	loadProductData = () => {

		// let id = this.props.match.params.productId;
		productsService
			.getProduct(this.productId)
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
				this.toastContainer.warning(TOASTR_MESSAGES.editQuantityFromCart, TOASTR_MESSAGES.productAlreadyInCart, {
					closeButton: false,
				});
				return;
			}

			let p = this.state.product;
			let product = {
				id: p.id,
				name: p.name,
				image: p.images[0],
				price: p.price,
				quantity: this.state.quantity,
				discount: p.discount
			};

			addedProducts.push(product);
			sessionStorage.products = JSON.stringify(addedProducts);

			this.toastContainer.success(TOASTR_MESSAGES.productAddedToCart, '', {
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
		this.setState({resolution: window.innerWidth});
	};

	render () {
		let product = this.state.product;

		if (!product) return <div className={'loader'}/>
		let resolution = this.state.resolution < RESOLUTIONS.xs;

		let urlPath = this.props.location.pathname;

		product.inStock = productsInStock[product.id].inStock

		return (
			<Grid id="product">

				<SEO_MetaTags_Dynamic activeLanguage={'bg'} pageName={'product'} productName={product.name} url={urlPath} />

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				{product === '' && <div className="loader"/>}

				{product !== '' &&
				<Row>
					<Col xs={resolution ? 12 : 6} sm={6} md={5}>
						<ImageGallery images={product.images}/>
					</Col>
					<Col xs={resolution ? 12 : 6} sm={6} md={7}>
						<ProductInfo data={product}/>
						{product.inStock && <AddToCartForm onSubmit={this.addToCart}/>}
					</Col>
				</Row>
				}

				<div className="buttons-container text-center">
					<hr/>
					<button className='btn btn-custom default sm'
					        onClick={() => this.props.history.go(-1) }>
						<i className="fa fa-long-arrow-left" aria-hidden="true"/>
						&nbsp;&nbsp;{BUTTONS_BG.back}</button>
				</div>
				{/*<Row>*/}
				{/*<ProductTabs/>*/}
				{/*</Row>*/}
			</Grid>
		);
	}
}

export default Product;