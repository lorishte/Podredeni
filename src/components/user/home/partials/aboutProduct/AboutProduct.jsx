import React from 'react';

import { Grid, Col } from 'react-bootstrap';

class AboutProduct extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		return (
			<Grid className="bg-white">
				<Col xs={12}>
					<h2 className="section-heading">Винаги под ръка!</h2>
					<div className="home-text">
						<p>Никога не откривате очилата си?</p>
						<p>Търсите ги в чантата си, но там е пълен хаос?</p>
						<p>Поставяте ги на деколтето на дрехата си, но се навеждате и те падат?</p>
						<p>КРАЙ НА ТОВА!</p>
					</div>
				</Col>

				<Col xs={12}>
				<div className="wrapper">
					<article className="article-box">
						<div className="article-image">
							<img src="/images/show/image_01.jpg"/>
						</div>

						<div className="article-content">
							<h4>Oчилата ви са винаги на ТОЧНОТО МЯСТО.</h4>
							<p>
								Практични и елегантни, в различен стил и цветове, те са неотменим аксесоар към вашия
								тоалет и най-големият ви помощник.
							</p>
						</div>
					</article>

					<article className="article-box">
						<div className="article-content">
							<h4>Стилно и удобно!</h4>
							<p>
								На ризата, на сакото, на блузата, роклята или чантата, винаги стилно и удобно. Когато
								спортувате и/или слушате музика - фиксирайте слушалките си, когато сте на плажа –
								спокойно “закачете” слънчевите си очила… на банските. За бизнеса или свободно време,
								магнитните клипсове са вашия задължителен аксесоар.
							</p>
						</div>
						<div className="article-image">
							<img src="/images/show/image_02.jpg"/>
						</div>
					</article>

					<article className="article-box">
						<div className="article-image">
							<img src="/images/show/image_03.jpg"/>
						</div>

						<div className="article-content">
							<h4>Гаранция за качество</h4>
							<p>
								ReadeREST е продукт, изработен от висококачествени магнити, неръждаема стомана и с
								елегантен дизайн. 100% произведени в САЩ, те са вашия многофункционален и незаменим
								аксесоар.
							</p>
						</div>
					</article>

				</div>
				</Col>


			</Grid>

		);
	}
}

export default AboutProduct;