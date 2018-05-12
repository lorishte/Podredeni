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
		const headline = 'Винаги под ръка!';
		const text = 'Никога не откривате  очилата си? Търсите ги в чантата си, но там е пълен хаос? Поставяте ги на деколтето на дрехата си, но се навеждате и те падат? КРАЙ НА ТОВА! С магнитните клипсове ReadeREST, очилата ви са винаги на ТОЧНОТО МЯСТО. Практични и елегантни, в различен стил и цветове, те са неотменим аксесоар към вашия тоалет и най-големият ви помощник. На ризата, на сакото, на блузата, роклята или чантата, винаги стилно и удобно. Когато спортувате и/или слушате музика - фиксирайте слушалките си, когато сте на плажа – спокойно “закачете” слънчевите си очила… на банските. За бизнеса или свободно време, магнитните клипсове са вашия задължителен аксесоар. ReadeREST е продукт, изработен от висококачествени магнити, неръждаема стомана и с елегантен дизайн. 100% произведени в САЩ, те са вашия многофункционален и незаменим аксесоар.';

		return (
			<div>
				<ControlledCarousel/>
				<Grid>
					<AboutProduct headline={headline} text={text}/>
					<TopSellers productsToShow={3}/>
				</Grid>
				<Testimonials/>
			</div>
		);
	}
}

export default Home;