import React from 'react';

import { Grid } from 'react-bootstrap';

class HomeBannerTwo extends React.Component {
	constructor (props) {
		super(props);

		this.state = {}
	}


	render () {

		return (
			<Grid fluid id="home-banner-2">
				<div className="wrapper">
					<article className="article-box">
						<div className="article-image">
							<img src="/images/banners/podredeni_banner_04.jpg"/>
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
		);
	}
}

export default HomeBannerTwo;