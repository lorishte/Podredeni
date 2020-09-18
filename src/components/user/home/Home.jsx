import React from 'react';

// SEO
import SEO_MetaTags from '../../common/SEO/SEO_MetaTags'

// Partials
import ControlledCarousel from './partials/carousel/ControlledCarousel';
import TopSellers from './partials/topSellers/TopSellers';
import Testimonials from './partials/testimonials/Testimonials';
import News from './partials/news/News';
import About from './partials/about/About'
import Promotions from "./partials/promotions/Promotions";


class Home extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		window.scrollTo(0, 0);
	}

	render () {

		let urlPath = this.props.location.pathname;

		return (
			<div id="home">

				<SEO_MetaTags activeLanguage={'bg'} pageName={'home'} url={urlPath}/>

				<ControlledCarousel />

				<TopSellers/>

				{/*<Promotions/>*/}

				<About/>

				<Testimonials/>

				<News/>

			</div>
		);
	}
}

export default Home;