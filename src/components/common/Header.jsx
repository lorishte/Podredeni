import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import products from '../../data/products';
import productsService from '../../services/products/productsService';

class Header extends React.Component {

	constructor (props) {
		super(props);
	}

	componentDidMount () {
	}

	seedProducts = () => {
		for (let i = 0; i < products.length; i++) {
			setTimeout(function () {
				productsService
					.seedProducts(products[i])
					.then(response => {
						console.log(response);
					})
					.catch(err => {
						console.log(err.responseText);
					});
			}, i * 1000);
		}
	};

	logout = () => {
		sessionStorage.clear();
		// this.props.history.push('/');
	};

	render () {

		let isLoggedIn = sessionStorage.getItem('p_token');
		let productsCount = 0;

		if (sessionStorage.getItem('products') !== null) {
			productsCount = JSON.parse(sessionStorage.getItem('products')).length;
		}

		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container">

					<div className="navbar-brand">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
						        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"/>
							<span className="icon-bar"/>
							<span className="icon-bar"/>
						</button>
						<Link to="/">Podredeni</Link>
					</div>


					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav navbar-right">
							{isLoggedIn &&
								<NavLink to="/product/list" activeClassName="active" className='nav-link'>
									AdminProductsList
								</NavLink>
							}

							{isLoggedIn &&
								<NavLink to="/order/list" activeClassName="active" className='nav-link'>
									AdminOrdersList
								</NavLink>
							}

							{isLoggedIn &&
								<NavLink to="/product/create" activeClassName="active" className='nav-link'>
									CreateProduct
								</NavLink>
							}

							{!isLoggedIn &&
							<NavLink to="/products" activeClassName="active" className='nav-link'>
								Продукти
							</NavLink>
							}
							{!isLoggedIn &&
							<NavLink to="/about" activeClassName="active" className='nav-link'>
								За нас
							</NavLink>
							}
							{!isLoggedIn &&
							<NavLink to="/contact" activeClassName="active" className='nav-link'>
								Контакт
							</NavLink>
							}

							{!isLoggedIn &&
							<NavLink to="/cart" activeClassName="active" className='nav-link cart'>
								{productsCount}
								<i className="fa fa-cart-arrow-down" aria-hidden="true"/>
							</NavLink>
							}

							{isLoggedIn &&
								<NavLink to="/" className="btn btn-default"
								        onClick={this.logout}>Logout
								</NavLink>
							}
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Header;
