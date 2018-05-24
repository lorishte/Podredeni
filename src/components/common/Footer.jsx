import React from 'react';
import { Link } from 'react-router-dom';

import { TERMS_AND_CONDITIONS } from '../../data/constants/componentConstants';

class Footer extends React.Component {

	render () {
		if (sessionStorage.getItem('role') === 'admin') return null;

		return (
			<footer>


				<div className="wrapper">
					<div className="copy">
						<p> &copy; 2018 podredeni.eu</p>
					</div>

					<div className="">
						<div className="fb-like" data-href="https://podredeni.eu" data-layout="button" data-action="like" data-size="small" data-show-faces="false" data-share="false"></div>
					</div>
					<Link to="/terms">{TERMS_AND_CONDITIONS.terms}</Link>


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
