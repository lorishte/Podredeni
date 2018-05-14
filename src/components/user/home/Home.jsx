import React from 'react';

import { Grid } from 'react-bootstrap';

import ControlledCarousel from './partials/carousel/ControlledCarousel';
import AboutProduct from './partials/aboutProduct/AboutProduct';
import TopSellers from './partials/topSellers/TopSellers';
import Testimonials from './partials/testimonials/Testimonials';

class Home extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		return (
			<div>
				<Grid fluid id="home-main-carousel">
					<ControlledCarousel/>
				</Grid>
				<Grid fluid id="home-about">
					<AboutProduct/>
				</Grid>
				<Grid fluid id="top-sellers" className="bg-white">
					<TopSellers productsToShow={3}/>
				</Grid>
				<Grid fluid id="testimonials">
					<Testimonials/>
				</Grid>
			</div>
		);
	}
}

export default Home;