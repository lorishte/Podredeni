import React from 'react';

import { Grid, Col } from 'react-bootstrap';

import Video from './partials/Video';

import { FACEBOOK_VIDEOS } from '../../../data/constants/componentConstants';

class Videos extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {

		let videos = FACEBOOK_VIDEOS.map((v, i) => {
			console.log(v);
			return (
				<Col key={i} xs={6}>
					<Video src={v}/>
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