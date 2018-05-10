import React from 'react';

import { Row, Col, Tabs, Tab } from 'react-bootstrap';


class ProductTabs extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<Row id="product-tabs">
				<Col xs={12}>
					<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
						<Tab eventKey={1} title="Details">
							Tab 1 content
						</Tab>
						<Tab eventKey={2} title="Some other info">
							Tab 2 content
						</Tab>
						<Tab eventKey={3} title="Delivery">
							<p>Tab 3 content</p>
						</Tab>
					</Tabs>
				</Col>
			</Row>

		);
	}
}

export default ProductTabs;