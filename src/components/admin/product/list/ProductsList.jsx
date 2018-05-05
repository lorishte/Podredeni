import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Row, Col, Table } from 'react-bootstrap';

import ProductTableRow from './partials/ProductTableRow';
import SortButtons from './partials/SortButtons';
import Paging from '../../../common/pagination/Paging';

import productsService from '../../../../services/products/productsService';

class ProductsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: '',
			size: 3,
			page: 3,
			sortProperty: 'number',
			descending: true,
			filterProperty: 'name',
			filterValue: '',
			productsCount: '',
			pagesCount: ''
		};
	}

	componentDidMount () {
		this.loadProducts();
	}

	loadProducts = () => {
		productsService
			.loadProducts(this.state)
			.then(res => {
				let productsCount = Number(res.productsCount);
				let size = Number(this.state.size);

				this.setState({
					products: res.products,
					productsCount: productsCount,
					pagesCount: Math.ceil(productsCount / size)
				});
			})
			.catch(err => {
				console.log(err.responseText);
			});
	};

	sort = (sortProperty, descending) => {
		console.log(sortProperty, descending);
		this.setState({
			sortProperty: sortProperty,
			descending: descending
		}, () => {
			this.loadProducts();
		});
	};

	changeClass = (sortProp, descending) => {
		if (this.state.sortProperty === sortProp &&
			this.state.descending === descending) {
			return 'btn btn-sort active';
		}

		return 'btn btn-sort';
	};

	goToPage = (page) => {
		this.setState({ page: page }, () => this.loadProducts())
	};

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
								<th>#
									<SortButtons
										sortProperty="number"
										changeClass={this.changeClass}
										sort={this.sort}/></th>
								<th>Наименование
									<SortButtons
										sortProperty="name"
										changeClass={this.changeClass}
										sort={this.sort}/></th>
								<th>Цена
									<SortButtons
										sortProperty="price"
										changeClass={this.changeClass}
										sort={this.sort}/>
								</th>
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

				{this.state.productsCount !== '' &&
				<Paging
					active={Number(this.state.page)}
					pagesCount={Number(this.state.pagesCount)}
					goToPage={this.goToPage}/>}
			</Grid>
		);
	}
}

export default ProductsList;
