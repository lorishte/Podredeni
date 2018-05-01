import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Navbar, Nav, Badge } from 'react-bootstrap';

class Header extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {

		return (
			<Navbar collapseOnSelect className="navbar navbar-default navbar-fixed-top">
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">Podredeni</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse >
					<Nav pullRight>
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
