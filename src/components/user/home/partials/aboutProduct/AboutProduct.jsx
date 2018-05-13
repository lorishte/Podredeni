import React from 'react';

import { Jumbotron, Button } from 'react-bootstrap';

class AboutProduct extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (

			<div id="home-about">
				<h1>{this.props.headline}</h1>
				<p>{this.props.text} </p>
			</div>

		);
	}
}

export default AboutProduct;