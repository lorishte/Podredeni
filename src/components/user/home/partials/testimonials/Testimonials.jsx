import React from 'react';

import data from '../../../../../data/testimonials';

import { Grid, Carousel } from 'react-bootstrap';
import TestimonialCard from './partials/TestimonialCard';

import { TESTIMONIALS_TIMER_INTERVAL } from '../../../../../data/constants/componentConstants';

class Testimonials extends React.Component {
	constructor (props, context) {
		super(props, context);

		this.state = {
			index: 0,
			direction: null
		};

		this.testimonial = React.createRef();
		this.timer = null;
	}

	componentDidMount () {
		this.timer = setInterval(this.changeSlide, TESTIMONIALS_TIMER_INTERVAL);

	};

	componentWillUnmount () {
		clearInterval(this.timer);
	}

	changeSlide = () => {
		let index = this.state.index + 1;
		if (this.state.index === this.testimonial.current.props.children.length - 1) {
			index = 0;
		}

		this.setState({
			index: index,
			direction: 'next'
		});
	};

	handleSelect = (selectedIndex, e) => {
		clearInterval(this.timer);

		this.setState({
			index: selectedIndex,
			direction: e.direction
		});

		this.timer = setInterval(this.changeSlide, TESTIMONIALS_TIMER_INTERVAL);
	};

	render () {

		let testimonialCards = data.map(t => {
			return (
				<Carousel.Item key={t.authorId}>
					<TestimonialCard data={t}/>
				</Carousel.Item>
			);
		});

		const {index, direction} = this.state;

		return (
			<Grid fluid id="testimonials" className="bg-white">
				<Carousel
					ref={this.testimonial}
					activeIndex={index}
					direction={direction}
					onSelect={this.handleSelect}>

					{testimonialCards}
				</Carousel>
			</Grid>
		);
	}
}

export default Testimonials;