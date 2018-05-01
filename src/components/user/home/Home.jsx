import React from 'react';

import { Grid } from 'react-bootstrap';

import ControlledCarousel from './partials/carousel/ControlledCarousel';
import AboutProduct from './partials/AboutProduct';
import TopSellers from './partials/topSellers/TopSellers';
import Testimonials from './partials/testimonials/Testimonials';

class Home extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
	};

	render () {
		const headline = 'Keep Your Eyeglasses Secure';
		const text = 'ReadeREST® keeps your readers and sunglasses off the ground and securely attached to your shirt. No more losing, breaking, or scratching your eyeglasses! As the #1 sold magnetic eyeglass holder in the U.S. we offer a lifetime warranty and 100% satisfaction guarantee. ReadeREST is also multi-functional. You can use it as an ID badge holder and to manage your earbud wires.';

		return (
			<div>
				<ControlledCarousel/>
				<Grid>
					<AboutProduct headline={headline} text={text}/>
					<TopSellers
						productsToShow={2}/>
				</Grid>
				<Testimonials/>
			</div>
		);
	}
}

export default Home;