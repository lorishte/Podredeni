import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Navbar, Nav, Badge, Button } from 'react-bootstrap';
import products from '../../data/products';
import requesterService from '../../services/requester';

class Header extends React.Component {

	constructor (props) {
		super(props);
	}

	seedProducts = () => {
		for (let i = 0; i < products.length; i++) {
			setTimeout(function () {
				requesterService
					.addProduct(products[i])
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
			<Navbar collapseOnSelect className="navbar navbar-default navbar-fixed-top">
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">Podredeni</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>

				<Button onClick={this.seedProducts}>Seed products</Button>

				<Navbar.Collapse >
					<Nav pullRight>

						<NavLink to="/product/list" activeClassName="active" className='nav-link'>
							AdminProductsList
						</NavLink>

						<NavLink to="/product/create" activeClassName="active" className='nav-link'>
							CreateProduct
						</NavLink>

						<NavLink to="/products" activeClassName="active" className='nav-link'>
							Products
						</NavLink>

						<NavLink to="/about" activeClassName="active" className='nav-link'>
							About
						</NavLink>

						<NavLink to="/contact" activeClassName="active" className='nav-link'>
							Contact
						</NavLink>

						<NavLink to="/cart" activeClassName="active" className='nav-link cart'>
							<i className="fa fa-cart-arrow-down" aria-hidden="true"/>
							&nbsp; My Cart &nbsp;
						</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Header;
