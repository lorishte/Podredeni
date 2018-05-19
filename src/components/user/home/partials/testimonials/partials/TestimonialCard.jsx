import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Image } from 'react-bootstrap';

class TestimonialCard extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		const data = this.props.data;

		return (
			<Col xs={12} className="testimonial text-center">
				{/*<Col xs={12}>*/}
					{/*<Image circle src={data.imageUrl} className='avatar' alt="user picture"/>*/}
				{/*</Col>*/}
				<Col xs={12} sm={8} md={6} smOffset={2} mdOffset={3} className='testimonial-body'>
					<p className="testimonial-text">{data.testimonial}</p>
					<p className="testimonial-author"><small >{data.name + ' ' + data.lastName} - {data.city}</small></p>
				</Col>
			</Col>


		);
	}
}

export default TestimonialCard;