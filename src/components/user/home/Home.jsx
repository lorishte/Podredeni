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

	componentDidMount () {
		window.scrollTo(0, 0);

        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = "(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.0&appId=602878320047542&autoLogAppEvents=1';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));";
        document.body.appendChild(s);
	}

	render () {

		return (
			<div id="home">
				<Grid fluid id="home-main-carousel">
					<ControlledCarousel />
				</Grid>

				<Grid fluid id="top-sellers" className="bg-white" style={{"marginBottom": "60px"}}>
					<TopSellers/>
				</Grid>

				<Grid fluid id="home-about">
					<AboutProduct/>
				</Grid>

				<Grid fluid id="testimonials">
					<Testimonials/>
				</Grid>

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