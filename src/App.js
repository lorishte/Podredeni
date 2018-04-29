import React from 'react';
import {Route} from 'react-router-dom'

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Routes from './components/routes/Routes';

import './main.css';
import 'react-confirm-alert/src/react-confirm-alert.css';


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