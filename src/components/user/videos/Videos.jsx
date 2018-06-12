import React from 'react';

import { Grid, Col } from 'react-bootstrap';

import Video from './partials/Video';

import { FACEBOOK_VIDEOS } from '../../../data/constants/componentConstants';

class Videos extends React.Component {

	constructor (props) {
		super(props);

	}

	handleSelect = (selectedIndex, e) => {
		this.setState({
			index: selectedIndex,
			direction: e.direction
		});
	};

	render () {

		let videos = FACEBOOK_VIDEOS.map((v, i) => {
			return (
				<Col key={i} xs={6}>
					<Video src={v} className="video"/>
				</Col>);
		});


		return (
			<Grid id="videos">
				{videos}
			</Grid>
		);
	}
}

export default Videos;