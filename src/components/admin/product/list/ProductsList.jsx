import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Row, Col, Table } from 'react-bootstrap';

import ProductTableRow from './partials/ProductTableRow';

import productsService from '../../../../services/products/productsService';

class ProductsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: '',
			size: 16,
			page: 1,
			sortProperty: 'number',
			descending: true,
			filterProperty: 'name',
			filterValue: ''
		};
	}

	componentDidMount () {
		productsService
			.loadProducts(this.state)
			.then(res => {
				console.log(res);
				this.setState({products: res.products})
			})
			.catch(err => {
				console.log(err.responseText)
			});
	}

	render () {
		let productsList;

		if (this.state.products !== '') {
			productsList = this.state.products.map(e => {
				return <ProductTableRow key={e.id} data={e}/>;
			});
		}

		return (
			<Grid>
				<Row>
					<Col sm={12}>
						<Table striped bordered condensed hover>
							<thead>
							<tr>
								<th>#</th>
								<th>Наименование</th>
								<th>Цена</th>
								<th>TopSeller</th>
								<th>Blocked</th>
								<th>Редакция</th>
							</tr>
							</thead>
							<tbody>
							{productsList}
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row className="bg-light">

				</Row>
			</Grid>
		);
	}
}

export default ProductsList;
