import React from 'react';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Routes from './components/routes/Routes';

import './styles/colors.css';
import './styles/mixins.css';
import './styles/main.css';
import './styles/admin-styles.css';
import './styles/queries.css';

import 'react-confirm-alert/src/react-confirm-alert.css';

// require('dotenv').config()

function App () {

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

export default App;