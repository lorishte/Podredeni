import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Row, Col, Table } from 'react-bootstrap';

import TableHead from './partials/TableHead';
import ProductTableRow from './partials/ProductTableRow';
import Paging from '../../../common/pagination/Paging';
import FormSelectField from '../../../common/formComponents/FormSelectField';

import productsService from '../../../../services/products/productsService';

class ProductsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: '',
			size: 10,
			page: 1,
			sortProperty: 'number',
			descending: false,
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
				console.log(res)
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
		this.setState({page: page}, () => this.loadProducts());
	};

	handleChange = (e) => {
		if(e.target.value === 'all') e.target.value = 10000000;
		this.setState({[e.target.name] : e.target.value}, () => {
			this.loadProducts();
		})
	};


	render () {
		let productsList;
		let pagesOnPage = {10: 10, 15: 15, 20: 20, 25: 25, all: 'all'};

		if (this.state.products !== '') {
			productsList = this.state.products.map(e => {
				return <ProductTableRow key={e.id} data={e}/>;
			});
		}

		return (
			<Grid>
				<Row>
					<Col xs={3} sm={1}>
						<FormSelectField
							label="Покажи"
							name="size"
							value={this.state.size}
							defaultValue={this.state.size}
							optionsList={pagesOnPage}
							required={false}
							onChange={this.handleChange}/>
					</Col>
				</Row>

				<Table striped bordered condensed hover>
					<TableHead
						changeClass={this.changeClass}
						sort={this.sort}/>
					<tbody>
					{productsList}
					</tbody>
				</Table>

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
