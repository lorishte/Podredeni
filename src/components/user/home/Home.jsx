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

				<Grid fluid id="home-banner-2">
					<div className="wrapper">
						<article className="article-box">
							<div className="article-image">
								<img src="/images/show/image_03.jpg"/>
							</div>

							<div className="article-content bg-white">
								<h4>Гаранция за качество</h4>
								<p>
									ReadeREST е продукт, изработен от висококачествени магнити, неръждаема стомана и с
									елегантен дизайн. 100% произведени в САЩ, те са вашия многофункционален и незаменим
									аксесоар.
								</p>
							</div>
						</article>
					</div>
				</Grid>

			</div>
		);
	}
}

export default Home;