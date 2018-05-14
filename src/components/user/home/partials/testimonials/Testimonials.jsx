import React from 'react';

import { Row, Col, Image } from 'react-bootstrap';

import data from '../../../../../data/testimonials';

import { Carousel } from 'react-bootstrap';

const TIMER_INTERVAL = 8000;

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
		this.timer = setInterval(this.changeSlide, TIMER_INTERVAL);

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

		this.timer = setInterval(this.changeSlide, TIMER_INTERVAL);
	};

	render () {

		let testimonialCards = data.map(t => {
			return (
				<Carousel.Item key={t.authorId}>
					<Col xs={12} data={this.data} className="testimonial text-center">
						<Col xs={12}>
							<Image circle src={t.imageUrl} className="avatar" alt="author"/>
						</Col>
						<Col xs={6} xsOffset={3} className='testimonial-body'>
							<h4 className="">{t.name + ' ' + t.lastName}</h4>
							<p className="">{t.testimonial}</p>
						</Col>
					</Col>
				</Carousel.Item>
			);
		});

		const {index, direction} = this.state;

		return (

			<Col xs={12}>
				<Carousel
					ref={this.testimonial}
					activeIndex={index}
					direction={direction}
					onSelect={this.handleSelect}>

					{testimonialCards}
				</Carousel>
			</Col>
		);
	}
}

export default Testimonials;