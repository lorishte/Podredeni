import React from 'react';

import { Col, Clearfix } from 'react-bootstrap';

class AboutProduct extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		return (
			<div className="bg-white">
				<Col xs={12}>
					<h2 className="section-heading">Винаги под ръка!</h2>
					<div className="home-text">
						<p>Никога не откривате очилата си?</p>
						<p>Търсите ги в чантата си, но там е пълен хаос?</p>
						<p>Поставяте ги на деколтето на дрехата си, но се навеждате и те падат?</p>
						<p>КРАЙ НА ТОВА!</p>
					</div>
				</Col>

				<Clearfix>
				</Clearfix>


				<div id="home-banner-1">
					<div className="wrapper">
						<article className="article-box">
							<div className="article-image">
								<img src="/images/show/image_02.jpg"/>
							</div>

							<div className="article-content bg-white">
								<h4>Oчилата ви са винаги на ТОЧНОТО МЯСТО. Стилно и удобно!</h4>
								<p>
									Практични и елегантни, в различен стил и цветове, те са неотменим аксесоар към вашия
									тоалет и най-големият ви помощник.
									На ризата, на сакото, на блузата, роклята или чантата, винаги стилно и удобно.
									Когато спортувате и/или слушате музика - фиксирайте слушалките си, когато сте на
									плажа –
									спокойно “закачете” слънчевите си очила… на банските. За бизнеса или свободно време,
									магнитните клипсове са вашия задължителен аксесоар.
								</p>
							</div>
						</article>
					</div>
				</div>
			</div>
		);
	}
}

export default AboutProduct;