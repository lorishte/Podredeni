import React from 'react';

import { Carousel } from 'react-bootstrap';

const TIMER_INTERVAL = 5000;

class ControlledCarousel extends React.Component {
	constructor (props, context) {
		super(props, context);

		this.state = {
			index: 0,
			direction: null
		};

		this.carousel = React.createRef();
		this.timer = null;
	}

	componentDidMount () {
		this.startTimer();
	};

	componentWillUnmount () {
		clearInterval(this.timer);
	}

	startTimer = () => {
		this.timer = setInterval(this.changeSlide, TIMER_INTERVAL);
	};

	changeSlide = () => {
		let index = this.state.index + 1;
		if (this.state.index === this.carousel.current.props.children.length - 1) {
			index = 0
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

		this.startTimer();
	};


	render () {
		const {index, direction} = this.state;

		return (
			<Carousel
				ref={this.carousel}
				activeIndex={index}
				direction={direction}
				onSelect={this.handleSelect}>

				<Carousel.Item >
					<img className="carousel-img" alt="slider_01" src="./images/banners/podredeni_banner_03.jpg"/>
					{/*<Carousel.Caption>*/}
						{/*<h3>First slide label</h3>*/}
						{/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
					{/*</Carousel.Caption>*/}
				</Carousel.Item>

				<Carousel.Item>
					<img className="carousel-img" alt="slider_02" src="images/banners/podredeni_banner_01.jpg"/>
					{/*<Carousel.Caption>*/}
						{/*<h3>Second slide label</h3>*/}
						{/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
					{/*</Carousel.Caption>*/}
				</Carousel.Item>

				<Carousel.Item>
					<img className="carousel-img" alt="slider_03" src="images/banners/podredeni_banner_02.jpg"/>
					{/*<Carousel.Caption>*/}
						{/*<h3>Third slide label</h3>*/}
						{/*<p>*/}
							{/*Praesent commodo cursus magna, vel scelerisque nisl consectetur.*/}
						{/*</p>*/}
					{/*</Carousel.Caption>*/}
				</Carousel.Item>

				<Carousel.Item>
					<img className="carousel-img" alt="slider_03" src="http://www.readerest.fr/wp-content/uploads/2016/06/sac_slider1920x665px.jpg"/>
					{/*<Carousel.Caption>*/}
						{/*<h3>Third slide label</h3>*/}
						{/*<p>*/}
							{/*Praesent commodo cursus magna, vel scelerisque nisl consectetur.*/}
						{/*</p>*/}
					{/*</Carousel.Caption>*/}
				</Carousel.Item>

			</Carousel>
		);
	}
}

export default ControlledCarousel;