import React from 'react';
import { NavLink } from 'react-router-dom';

import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Glyphicon } from 'react-bootstrap';

class Header extends React.Component {

	constructor (props) {
		super(props);
	}


	render () {

		return (
			<Navbar collapseOnSelect className="navbar navbar-default navbar-fixed-top">
				<Navbar.Header>
					<Navbar.Brand>
						<a href="/">Podredeni</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						<NavLink to="/products" style={this.active} activeClassName="active" className='nav-link'>
							Products
						</NavLink>

						<NavLink to="/about" activeClassName="active" className='nav-link'>
							About
						</NavLink>

						<NavLink to="/contact" activeClassName="active" className='nav-link'>
							Contact
						</NavLink>

						<NavLink to="/cart" className='nav-link accent'>
							<i className="fa fa-cart-arrow-down" aria-hidden="true"/>
							&nbsp; My Cart
						</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Header;
