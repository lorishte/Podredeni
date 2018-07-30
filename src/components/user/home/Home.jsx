import React from 'react';

import { Grid } from 'react-bootstrap';

import ControlledCarousel from './partials/carousel/ControlledCarousel';
import AboutProduct from './partials/aboutProduct/AboutProduct';
import TopSellers from './partials/topSellers/TopSellers';
import Testimonials from './partials/testimonials/Testimonials';
import News from './partials/news/News';
//import HomeBannerTwo from './partials/homeBannerTwo/HomeBannerTwo';

class Home extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		window.scrollTo(0, 0);
	}

	render () {

		return (
			<div id="home">

				<ControlledCarousel />

				<TopSellers/>

				<AboutProduct/>

				<Testimonials/>

				<News/>

				{/*<HomeBannerTwo/>*/}
			</div>
		);
	}
}

export default Home;