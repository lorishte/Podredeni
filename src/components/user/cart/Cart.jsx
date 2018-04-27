import React from 'react';

import { Grid, Col, Row, PageHeader } from 'react-bootstrap';

class Cart extends React.Component {
	constructor (props, context) {
		super(props, context);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			products: '',
		};
	}

	componentDidMount () {
		let addedProducts = JSON.parse(sessionStorage.getItem('products'));

		if (addedProducts === null) return;

		this.setState({products: addedProducts}, () => {
			this.state.products.map(e => console.log(e.product, Number(e.quantity)));
		})
	}

	handleChange (e) {
		this.setState({value: e.target.value});
	}

	render() {

		return (
			<Grid id="cart">
				<PageHeader>
					My Cart
				</PageHeader>
				<Row>
					<Col xs={8} sm={6} md={4}>

					</Col>
				</Row>
			</Grid>
		);
	}
}

export default Cart;
