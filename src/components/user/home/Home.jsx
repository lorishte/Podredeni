import React from 'react';

// Partials
import ControlledCarousel from './partials/carousel/ControlledCarousel';
import TopSellers from './partials/topSellers/TopSellers';
import Testimonials from './partials/testimonials/Testimonials';
import News from './partials/news/News';
import About from './partials/about/About'


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

				<About/>

				<Testimonials/>

				<News/>

			</div>
		);
	}
}

export default Home;