import React from 'react';

import { PageHeader, Grid, Row, Col } from 'react-bootstrap';

class About extends React.Component {

	render () {
		return (
			<Grid >
				<PageHeader>
					About Page
				</PageHeader>

				<Row>
					<Col xs={8} sm={6} md={4}>
					</Col>
				</Row>
			</Grid>

		);
	}
}

export default About;
