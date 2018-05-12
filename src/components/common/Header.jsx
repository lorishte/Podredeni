import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Navbar, Nav, Badge, Button } from 'react-bootstrap';
import products from '../../data/products';
import productsService from '../../services/products/productsService';

class Header extends React.Component {

	constructor (props) {
		super(props);
	}

	seedProducts = () => {
		for (let i = 0; i < products.length; i++) {
			setTimeout(function () {
				productsService
					.seedProducts(products[i])
					.then(response => {
						console.log(response)
					})
					.catch(err => {
						console.log(err.responseText)
					})
			}, i * 1000)
		}
	};

	render () {

		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container">

					<div className="navbar-brand">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"/>
							<span className="icon-bar"/>
							<span className="icon-bar"/>
						</button>
						<Link to="/">Podredeni</Link>
					</div>


					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav navbar-right">
							<NavLink to="/product/list" activeClassName="active" className='nav-link'>
								AdminProductsList
							</NavLink>

							<NavLink to="/order/list" activeClassName="active" className='nav-link'>
								AdminOrdersList
							</NavLink>

							<NavLink to="/product/create" activeClassName="active" className='nav-link'>
								CreateProduct
							</NavLink>

							<NavLink to="/products" activeClassName="active" className='nav-link'>
								Продукти
							</NavLink>

							<NavLink to="/about" activeClassName="active" className='nav-link'>
								За нас
							</NavLink>

							<NavLink to="/contact" activeClassName="active" className='nav-link'>
								Контакт
							</NavLink>

							<NavLink to="/cart" activeClassName="active" className='nav-link cart'>
								<i className="fa fa-cart-arrow-down" aria-hidden="true"/>
							</NavLink>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Header;
