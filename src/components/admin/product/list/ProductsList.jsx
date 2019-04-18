import React from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastr';

import { Grid, Row, Col, Table } from 'react-bootstrap';

import TableHead from './partials/TableHead';
import ProductTableRow from './partials/ProductTableRow';
import Paging from '../../../common/pagination/Paging';
import FormSelectField from '../../../common/formComponents/FormSelectField';
import FormInputWithDropdown from '../../../common/formComponents/FormInputWithDropdown';

import productsService from '../../../../services/products/productsService';

import {
	ELEMENTS_ON_PAGE,
	ADMIN_PRODUCTS_FILTER_OPTIONS,
	FILTER_INPUT_WAIT_INTERVAL,
	TOASTR_MESSAGES
} from '../../../../data/constants/componentConstants';

class ProductsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: [],
			size: 10,
			page: 1,
			sortProperty: 'number',
			descending: false,
			filterProperty: 'name',
			filterValue: '',
			productsCount: '',
			pagesCount: '',
			loading: true
		};
	}

	timer = null;

	componentDidMount () {
		this.loadProducts();
	}

	loadProducts = () => {
		productsService
			.loadProducts(this.state, true)
			.then(res => {
				let productsCount = Number(res.productsCount);
				let size = Number(this.state.size);

				this.setState({
					products: res.products,
					productsCount: productsCount,
					pagesCount: Math.ceil(productsCount / size),
					loading: false
				});

			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};

	sort = (sortProperty, descending) => {
		this.setState({
			sortProperty: sortProperty,
			descending: descending,
			loading: true
		}, () => this.loadProducts());
	};

	changeClass = (sortProp, descending) => {
		if (this.state.sortProperty === sortProp &&
			this.state.descending === descending) {
			return 'btn btn-sort active';
		}

		return 'btn btn-sort';
	};

	goToPage = (page) => {
		this.setState({
			page: page,
			loading: true
		}, () => this.loadProducts());
	};

	handleSizeChange = (e) => {
		if (e.target.value === '') return;
		this.setState({size: e.target.value}, () => this.goToPage(1));
	};

	handleFilterProperty = (е) => {
		this.setState({filterValue: '', filterProperty: е}, () => this.goToPage(1));
	};

	handleFilterValue = (e) => {
		this.setState({filterValue: e.target.value});
	};

	handleKeyDown = (e) => {
		clearTimeout(this.timer);
		this.timer = setTimeout(() => this.goToPage(1), FILTER_INPUT_WAIT_INTERVAL);
	};

	render () {

		let productsList = this.state.products.map(e => {
			return <ProductTableRow key={e.id} data={e}/>;
		});

		// if (this.state.products.length === 0) {return <div className="admin-loader"/>; }

		return (
			<Grid>

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>


				<Row>
					<Col xs={12} className="buttons-container">
						<Link to="/product/create" className="btn btn-sm btn-primary">Нов Продукт</Link>

						<Link to="/category/list" className="btn btn-sm btn-primary">Мениджър категории</Link>
					</Col>

				</Row>

				<Row>
					<Col xs={4} sm={3} md={2}>
						<FormSelectField
							name="size"
							value={this.state.size}
							optionsList={ELEMENTS_ON_PAGE}
							required={false}
							onChange={this.handleSizeChange}/>
					</Col>

					<Col xs={8} sm={6}>
						<FormInputWithDropdown
							// input
							inputName="filterValue"
							filterValue={this.state.filterValue}
							placeholder="филтър по"
							onChange={this.handleFilterValue}
							onKeyDown={this.handleKeyDown}
							// dropdown
							filterProperty={this.state.filterProperty}
							dropdownName="filterProperty"
							onSelect={this.handleFilterProperty}
							// dropdown options
							optionsList={ADMIN_PRODUCTS_FILTER_OPTIONS}/>
					</Col>
				</Row>

				<Table striped bordered condensed hover id="admin-products-table">
					<TableHead
						changeClass={this.changeClass}
						sort={this.sort}
						handleChange={this.handleSizeChange}/>
					<tbody>
					{productsList}
					</tbody>
				</Table>

				{this.state.size !== '0' &&
				<Paging
					active={Number(this.state.page)}
					pagesCount={Number(this.state.pagesCount)}
					goToPage={this.goToPage}/>}

				{this.state.loading && <div className="admin-loader"/> }		
			</Grid>
		);
	}
}

export default ProductsList;
