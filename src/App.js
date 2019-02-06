import React from 'react';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Routes from './components/routes/Routes';

import './styles/main.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

// require('dotenv').config()


class App extends React.Component {
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