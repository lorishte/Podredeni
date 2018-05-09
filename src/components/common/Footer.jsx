import React from 'react';

import {  } from 'react-bootstrap';

class Footer extends React.Component {

	render () {
		return (
			<footer>
				<div className="wrapper">
					<div className="copy">
						<p> &copy; 2018 podredeni.com</p>
					</div>

					<div className="social">
						<a href="#"><i className="fa fa-facebook-official" aria-hidden="true"/></a>
						<a href="#"><i className="fa fa-twitter-square"/></a>
						<a href="#"><i className="fa fa-linkedin-square"/></a>
						<a href="#"><i className="fa fa-instagram"/></a>
					</div>


					<div className="created-by">
						<p> A web page by <a href="" target="_blank" className="text-accent-secondary">US</a>
						</p>
					</div>
				</div>
			</footer>

		);
	}
}

export default Footer;
