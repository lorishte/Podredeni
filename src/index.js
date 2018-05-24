import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
	<BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

registerServiceWorker();