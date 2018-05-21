import React from 'react';
import { Link } from 'react-router-dom';
// import FacebookProvider, { Like } from 'react-facebook';

import { TERMS } from '../../data/constants/componentConstants';

class Footer extends React.Component {

	render () {
		if (sessionStorage.getItem('role') === 'admin') return null;

		return (
			<footer>
				<div className="wrapper">
					<div className="copy">
						<p> &copy; 2018 podredeni.com</p>
					</div>

					<div className="social">
						{/*<FacebookProvider appId="602878320047542">*/}
						{/*<Like href="http://www.facebook.com" colorScheme="dark" showFaces share />*/}
						{/*</FacebookProvider>*/}
						<Link to=""><i className="fa fa-facebook-official" aria-hidden="true"/></Link>
						<Link to=""><i className="fa fa-instagram"/></Link>
					</div>

					<Link to="/terms">{TERMS.terms}</Link>


					{/*<div className="created-by">*/}
						{/*<p> A web page by <a href="" target="_blank" className="text-accent-secondary">US</a>*/}
						{/*</p>*/}
					{/*</div>*/}
				</div>
			</footer>
		);
	}
}

export default Footer;
