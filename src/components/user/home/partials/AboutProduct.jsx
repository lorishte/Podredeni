import React from 'react';

import { Jumbotron, Button } from 'react-bootstrap';

class AboutProduct extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (

			<Jumbotron>
				<h1>{this.props.headline}</h1>
				<p>{this.props.text} </p>
				<p>
					<Button bsStyle="primary">Learn more</Button>
				</p>
				<img className="jumbotron-image" src="./images/banners/image_01.jpg"/>
			</Jumbotron>

		);
	}
}

export default AboutProduct;