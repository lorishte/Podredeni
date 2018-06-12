import React from 'react';

import { Grid, Carousel } from 'react-bootstrap';

import { MAIN_CAROUSEL_TIMER_INTERVAL } from '../../../../../data/constants/componentConstants';

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
		this.timer = setInterval(this.changeSlide, MAIN_CAROUSEL_TIMER_INTERVAL);
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
			<Grid fluid id="home-main-carousel">
			<Carousel
				ref={this.carousel}
				activeIndex={index}
				direction={direction}
				onSelect={this.handleSelect}>

				<Carousel.Item >
					<img className="carousel-img" alt="slider_01" src="images/banners/podredeni_banner_03.jpg"/>
					{/*<Carousel.Caption>*/}
						{/*<h3>First slide label</h3>*/}
						{/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
					{/*</Carousel.Caption>*/}
				</Carousel.Item>

				<Carousel.Item>
					<img className="carousel-img" alt="slider_02" src="images/banners/BM6V1596.jpg"/>
					{/*<Carousel.Caption>*/}
						{/*<h3>Second slide label</h3>*/}
						{/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
					{/*</Carousel.Caption>*/}
				</Carousel.Item>

				<Carousel.Item>
					<img className="carousel-img" alt="slider_03" src="images/banners/Reader-Rest-04051811926.jpg"/>
					{/*<Carousel.Caption>*/}
						{/*<h3>Third slide label</h3>*/}
						{/*<p>*/}
							{/*Praesent commodo cursus magna, vel scelerisque nisl consectetur.*/}
						{/*</p>*/}
					{/*</Carousel.Caption>*/}
				</Carousel.Item>

				<Carousel.Item>
					<img className="carousel-img" alt="slider_04" src="images/banners/Reader-Rest-04051811966.jpg"/>
                    {/*<Carousel.Caption>*/}
                    {/*<h3>Second slide label</h3>*/}
                    {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                    {/*</Carousel.Caption>*/}
				</Carousel.Item>

				<Carousel.Item>
					<img className="carousel-img" alt="slider_05" src="images/banners/Reader-Rest-04051812172.jpg"/>
                    {/*<Carousel.Caption>*/}
                    {/*<h3>Second slide label</h3>*/}
                    {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                    {/*</Carousel.Caption>*/}
				</Carousel.Item>

				<Carousel.Item>
					<img className="carousel-img" alt="slider_06" src="images/banners/Reader-Rest-04051812085.jpg"/>
                    {/*<Carousel.Caption>*/}
                    {/*<h3>Second slide label</h3>*/}
                    {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                    {/*</Carousel.Caption>*/}
				</Carousel.Item>

				<Carousel.Item>
					<img className="carousel-img" alt="slider_07" src="images/banners/bag.jpg"/>
					{/*<Carousel.Caption>*/}
						{/*<h3>Third slide label</h3>*/}
						{/*<p>*/}
							{/*Praesent commodo cursus magna, vel scelerisque nisl consectetur.*/}
						{/*</p>*/}
					{/*</Carousel.Caption>*/}
				</Carousel.Item>

			</Carousel>
			</Grid>
		);
	}
}

export default ControlledCarousel;