import React from 'react';

import { Grid } from 'react-bootstrap';

import ControlledCarousel from './partials/carousel/ControlledCarousel';
import AboutProduct from './partials/aboutProduct/AboutProduct';
import TopSellers from './partials/topSellers/TopSellers';
import Testimonials from './partials/testimonials/Testimonials';
import News from './partials/news/News';
//import HomeBannerTwo from './partials/homeBannerTwo/HomeBannerTwo';

import settingsService from "../../../services/settings/settingsService";

class Home extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		window.scrollTo(0, 0);

		
	}

	render () {

		let showTestiomonials = settingsService.getCurrentSetting('showTestimonials');

		let showNewsOnFrontPage = settingsService.getCurrentSetting('showNewsOnFrontPage');

		return (
			<div id="home">

				<ControlledCarousel />

				<TopSellers/>

				<AboutProduct/>

				{showTestiomonials && 
					<Testimonials/>
				}

				{showNewsOnFrontPage &&
					<News/>
				}
				
				{/*<HomeBannerTwo/>*/}
			</div>
		);
	}
}

export default Home;