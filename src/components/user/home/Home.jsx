import React from 'react';

import { Grid } from 'react-bootstrap';

import ControlledCarousel from './partials/carousel/ControlledCarousel';
import AboutProduct from './partials/aboutProduct/AboutProduct';
import TopSellers from './partials/topSellers/TopSellers';
import Testimonials from './partials/testimonials/Testimonials';
import NewsCarousel from './partials/news/NewsCarousel';

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

                {/*<NewsCarousel/>*/}

				<AboutProduct/>

				<Testimonials/>


				{/*<Grid fluid id="home-banner-2">*/}
				{/*<div className="wrapper">*/}
				{/*<article className="article-box">*/}
				{/*<div className="article-image">*/}
				{/*<img src="/images/banners/podredeni_banner_04.jpg"/>*/}
				{/*</div>*/}

				{/*<div className="article-content bg-white">*/}
				{/*<h4>Гаранция за качество</h4>*/}
				{/*<p>*/}
				{/*ReadeREST е продукт, изработен от висококачествени магнити, неръждаема стомана и с*/}
				{/*елегантен дизайн. 100% произведени в САЩ, те са вашия многофункционален и незаменим*/}
				{/*аксесоар.*/}
				{/*</p>*/}
				{/*</div>*/}
				{/*</article>*/}
				{/*</div>*/}
				{/*</Grid>*/}
			</div>
		);
	}
}

export default Home;