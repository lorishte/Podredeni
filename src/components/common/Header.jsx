import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Label, Badge } from 'react-bootstrap';

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

	logout = (e) => {
		sessionStorage.clear();
	};

	render () {

		let isAdmin = sessionStorage.getItem('role') === 'admin';
		let isLoggedInUser = sessionStorage.getItem('p_token');
		let productsCount = 0;

		if (sessionStorage.getItem('products') !== null) {
			productsCount = JSON.parse(sessionStorage.getItem('products')).length;
		}

		return (
			<nav className="navbar navbar-default navbar-fixed-top">

				<div className="navbar-brand">
					<Link to="/home">Podredeni</Link>
				</div>

				<button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
				        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"/>
					<span className="icon-bar"/>
					<span className="icon-bar"/>
				</button>

				{isAdmin &&
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav">

							<NavLink to="/order/list" activeClassName="active" className='nav-link'>
								Поръчки
							</NavLink>

							<NavLink to="/product/list" activeClassName="active" className='nav-link'>
								Продукти
							</NavLink>

							<NavLink to="/product/create" activeClassName="active" className='nav-link'>
								Нов продукт
							</NavLink>

							<NavLink to="/home" activeClassName="active" className='nav-link'
							         onClick={this.logout}>Изход
							</NavLink>

						</ul>
					</div>
				}

				{!isAdmin &&
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav navbar-right">

							<NavLink to="/home" activeClassName="active" className='nav-link'>
								Начало
							</NavLink>

							< NavLink to="/products" activeClassName="active" className='nav-link'>
								Продукти
							</NavLink>

							<NavLink to="/about" activeClassName="active" className='nav-link'>
								За нас
							</NavLink>

							<NavLink to="/contact" activeClassName="active" className='nav-link'>
								Контакт
							</NavLink>

							{!isLoggedInUser &&
								<NavLink to="/login" activeClassName="active" className='nav-link'>
									Вход
								</NavLink>
							}

							{isLoggedInUser &&
								<NavLink to="/" className="btn btn-default"
								         onClick={this.logout}>Изход
								</NavLink>
							}

							<NavLink to="/cart" activeClassName="active" className='nav-link cart'>
								<i className="fa fa-cart-arrow-down" aria-hidden="true"/>
								{productsCount !== 0 &&
								<Label bsStyle="danger">{' ' + productsCount}</Label>
								}
							</NavLink>
						</ul>
					</div>
				}
			</nav>
		);
	}
}

export default Header;
