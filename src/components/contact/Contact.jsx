import React from 'react';

import { PageHeader, Grid, Row, Col } from 'react-bootstrap';

class Contact extends React.Component {

	render () {
		return (
			<Grid >
				<PageHeader>
					Contact
				</PageHeader>

				<Row>
					<Col xs={8} sm={6} md={4}>
					</Col>
				</Row>
			</Grid>

		);
	}
}

export default Contact;
