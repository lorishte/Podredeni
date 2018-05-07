import React from 'react';
import { Link } from 'react-router-dom';

import {
	Grid,
	Row,
	Col,
	Table,
	FormControl,
	ControlLabel,
	FormGroup,
	MenuItem,
	DropdownButton,
	InputGroup
} from 'react-bootstrap';

import TableHead from './partials/TableHead';
import ProductTableRow from './partials/ProductTableRow';
import Paging from '../../../common/pagination/Paging';
import FormSelectField from '../../../common/formComponents/FormSelectField';

import productsService from '../../../../services/products/productsService';

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
		console.log(e);
		this.setState({[e.target.name]: e.target.value}, () => {
			console.log(this.state);
			this.loadProducts();
		});
	};

	handleSelect = (evt, evtKey) => {
		// what am I suppose to write in there to get the value?
		console.log(evtKey);
		console.log(evt)
	};

	render () {

		let productsList = this.state.products.map(e => {
			return <ProductTableRow key={e.id} data={e}/>;
		});

		let pagesOnPage = {10: 10, 15: 15, 20: 20, 25: 25, all: 0};
		let pagesOnPageKeys = Object.keys(pagesOnPage);
		let options = pagesOnPageKeys.map(e => {
			return <option key={e} value={pagesOnPage[e]}>{e}</option>;
		});

		let filterOptions = {
			'име': 'name',
			'номер': 'number',
			'блокирани': 'isBlocked',
			'най-продавани': 'isTopSeller'
		};
		let filterOptionsKeys = Object.keys(filterOptions);
		let filterOptionsList = filterOptionsKeys.map((e, i) => {
			return <MenuItem eventKey={i + 1} value={filterOptions[e]} >{e}</MenuItem>;
		});

		return (
			<Grid>
				<Row>
					<Col xs={6} sm={2}>
						<FormGroup controlId="formControlsSelect">
							<ControlLabel>Покажи</ControlLabel>
							<FormControl
								componentClass="select"
								placeholder="select"
								label="Покажи"
								name="size"
								value={this.state.size}
								defaultValue={this.state.size}
								onChange={this.handleChange}>
								{options}
							</FormControl>
						</FormGroup>
					</Col>

					<Col xs={12} sm={12}>
						<FormGroup controlId="formControlsSelect">
							<ControlLabel>Филтър по</ControlLabel>
							<FormControl
								componentClass="select"
								placeholder="select"
								label="Покажи"
								name="filterProperty"
								defaultValue={this.state.filterProperty}
								value={this.state.filterProperty}
								onChange={this.handleChange}>

							</FormControl>
						</FormGroup>

						<FormGroup>
							<InputGroup>
								<FormControl type="text"
								             placeholder=""
								             name="filterValue"
								             defaultValue={this.state.filterValue}
								             value={this.state.filterValue}
								             onChange={this.handleChange}/>
								<DropdownButton
									componentClass={InputGroup.Button}
									id="input-dropdown-addon"
									title={this.state.filterProperty}
									value={this.state.filterProperty}
									name="filterProperty"
									onSelect={(e) => this.handleSelect(e)}
								>
									{filterOptionsList}
								</DropdownButton>
							</InputGroup>
						</FormGroup>
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

				{this.state.size !== '0' &&
				<Paging
					active={Number(this.state.page)}
					pagesCount={Number(this.state.pagesCount)}
					goToPage={this.goToPage}/>}
			</Grid>
		);
	}
}

export default ProductsList;
