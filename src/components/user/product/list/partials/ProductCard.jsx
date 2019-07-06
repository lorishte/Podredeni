import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { Col } from 'react-bootstrap';

import utils from '../../../../../utils/utils';

import { TOASTR_MESSAGES, CURRENCY } from '../../../../../data/constants/componentConstants';

class ProductCard extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			xsRes: this.props.xsRes
		};
	}

	componentWillReceiveProps (nextProps) {
		this.setState({xsRes: nextProps.xsRes});
	}

	addToCart = () => {
		if (sessionStorage.getItem('products') === null) {
			sessionStorage.setItem('products', '[]');
		}

		let addedProducts = JSON.parse(sessionStorage.getItem('products'));

		if (this.checkIfProductIsInCart(addedProducts)) {
			this.props.toastContainer.warning(TOASTR_MESSAGES.editQuantityFromCart, TOASTR_MESSAGES.productAlreadyInCart, {
				closeButton: false,
			});
			return;
		}

		let p = this.props.data;
		let product = {
			id: p.id,
			name: p.name,
			image: p.images[0],
			price: p.price,
			quantity: 1,
			discount: p.discount
		};

		addedProducts.push(product);
		sessionStorage.products = JSON.stringify(addedProducts);

		this.props.toastContainer.success(TOASTR_MESSAGES.productAddedToCart, '', {
			closeButton: true,
		});

		this.props.history.push('/products');// to refresh products count in header
		this.props.history.go(-1); // step back to fix history logic
	};

	checkIfProductIsInCart = (array) => {
		return (array.filter(e => e.id === this.props.data.id).length > 0);
	};

	render () {
		const p = this.props.data;

		p.categories.forEach(e => {
			if (e.id === '92e8f56e-1a18-46bb-be40-633559284cdc') {
				p.new = true;
			} else {
				p.new = false;
			}
		});

		return (
			<Col xs={this.state.xsRes} sm={6} lg={4}>

				<div className="card">

					{p.discount > 0 &&
					<span className="promo-label">-{p.discount}%</span>
					}

					{p.new && <span className={'new-label'}>НОВО!</span>}

					<div className="product-image">
						<img className="card-img-top" src={p.images[0]} alt="Card image cap"/>
					</div>


					<div className="card-body">
						<h4 className="card-title">{p.name}</h4>
						<p className="card-text">{p.description.substring(0, 80) + ' ...'}</p>

						{p.discount === 0 &&
						<p className="price">{p.price.toFixed(2)} {CURRENCY}</p>}

						{p.discount > 0 &&
						<p className="price">
							<span className="old-price">{p.price.toFixed(2)} {CURRENCY}</span>
							<span>{(utils.calculatePriceAfterDiscount(p.price, p.discount)).toFixed(2)} {CURRENCY}</span>
						</p>
						}

						<button className="add-to-cart-btn" onClick={this.addToCart}>
							<i className="fa fa-shopping-cart" aria-hidden="true"/>
						</button>

						<Link to={'/products/' + p.id} className="add-to-cart-btn">
							<i className="fa fa-search" aria-hidden="true"/>
						</Link>

					</div>
				</div>


			</Col>
		);
	}
}

export default withRouter(ProductCard);