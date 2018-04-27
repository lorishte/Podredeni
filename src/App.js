import React, { Component } from 'react';

import Header from './components/user/common/Header';
import Footer from './components/user/common/Footer';
import Routes from './components/user/routes/Routes';

import './main.css';

class App extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (

			<div>
				<Header/>

				<main>
					<Routes />
				</main>

				<Footer/>
			</div>

		);
	}
}

export default App;