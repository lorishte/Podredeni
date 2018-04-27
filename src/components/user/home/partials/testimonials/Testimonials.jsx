import React from 'react';

import { Row, Col, Grid } from 'react-bootstrap';

import TestimonialCard from './partials/TestimonialCard';
import testimonials from '../../../../../data/testimonials';

class Testimonials extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			active: 0
		};
	}

	render () {
		this.testimonials = testimonials.map(testimonial => {
			return <TestimonialCard key={testimonial.id} data={testimonial}/>;
		});

		return (
			<Grid fluid>
				<Row id="testimonials">
					<Col xs={12}>
						{/*<h1 className="section-heading">Testimonials</h1>*/}
						{this.testimonials[this.state.active]}
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default Testimonials;