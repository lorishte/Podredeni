import React from 'react';

class Error extends React.Component {

	render () {
		return (
			<div className="container">
				<h1>Error 500. Something went wrong.</h1>
				<p>Please try again later.</p>
			</div>
		);
	}
}

export default Error;
