import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { Col } from 'react-bootstrap';

class ProductCard extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			xsRes: this.props.xsRes
		};
	}

	componentWillReceiveProps (nextProps) {
		console.log(nextProps.xsRes);
		this.setState({xsRes: nextProps.xsRes});
	}

	addToCart = () => {
		if (sessionStorage.getItem('products') === null) {
			sessionStorage.setItem('products', '[]');
		}

		let addedProducts = JSON.parse(sessionStorage.getItem('products'));

		if (this.checkIfProductIsInCart(addedProducts)) {
			this.props.toastContainer.warning('Please go to your cart to update quantity!', 'This product is already added in your cart!', {
				closeButton: true,
			});
			return;
		}

		let p = this.props.data;
		let product = {
			id: p.id,
			name: p.name,
			image: p.images[0],
			price: p.price,
			quantity: 1
		};

		addedProducts.push(product);
		sessionStorage.products = JSON.stringify(addedProducts);

		this.props.toastContainer.success('', 'Product added to your cart.', {
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

		return (
			<Col xs={this.state.xsRes} sm={6} md={4} lg={3}>

				<div className="card">

					<div className="product-image">
						<img className="card-img-top" src={p.images[0]} alt="Card image cap"/>
					</div>


					<div className="card-body">
						<h4 className="card-title">{p.name}</h4>
						<p className="card-text">{p.description.substring(0, 80) + ' ...'}</p>
						<p className="price">{p.price.toFixed(2)} лв.</p>
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

export default withRouter(ProductCard) ;