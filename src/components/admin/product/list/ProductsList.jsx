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
	InputGroup,
	Checkbox
} from 'react-bootstrap';

import TableHead from './partials/TableHead';
import ProductTableRow from './partials/ProductTableRow';
import Paging from '../../../common/pagination/Paging';

import productsService from '../../../../services/products/productsService';

const WAIT_INTERVAL = 2000;

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

	timer = null;

	componentDidMount () {
		this.loadProducts();
	}

	loadProducts = () => {
		console.log('from load');
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
		this.setState({page: page}, () => this.loadProducts());
	};

	handleSizeChange = (e) => {
		this.setState({size: e.target.value}, () => this.goToPage(1));
	};

	handleFilterProperty = (evt) => {
		this.setState({filterProperty: evt});
	};

	handleFilterValue = (e) => {
		this.setState({filterValue: e.target.value});
	};

	handleKeyDown = (e) => {
		clearTimeout(this.timer);
		this.timer = setTimeout(() => this.goToPage(1), WAIT_INTERVAL);
	};

	render () {

		let productsList = this.state.products.map(e => {
			return <ProductTableRow key={e.id} data={e}/>;
		});

		let pagesOnPage = {2: 2, 10: 10, 15: 15, 20: 20, 25: 25, all: 0};
		let pagesOnPageKeys = Object.keys(pagesOnPage);
		let options = pagesOnPageKeys.map(e => {
			return <option key={e} value={pagesOnPage[e]}>{e}</option>;
		});

		let filterOptions = {
			'name': 'име',
			'number': 'номер'
		};
		let filterOptionsKeys = Object.keys(filterOptions);
		let filterOptionsList = filterOptionsKeys.map((e, i) => {
			return <MenuItem eventKey={e}>{filterOptions[e]}</MenuItem>;
		});

		return (
			<Grid>
				<Row>
					<Col xs={3} sm={2}>
						<FormGroup controlId="formControlsSelect">
							<ControlLabel>Покажи</ControlLabel>
							<FormControl
								componentClass="select"
								placeholder="select"
								label="Покажи"
								name="size"
								value={this.state.size}
								defaultValue={this.state.size}
								onChange={this.handleSizeChange}>
								{options}
							</FormControl>
						</FormGroup>
					</Col>

					<Col xs={9} sm={6}>
						<FormGroup>
							<ControlLabel>Филтър по</ControlLabel>
							<InputGroup>
								<FormControl type="text"
								             placeholder=""
								             name="filterValue"
								             defaultValue={this.state.filterValue}
								             value={this.state.filterValue}
								             onChange={this.handleFilterValue}
								             onKeyDown={this.handleKeyDown}/>
								<DropdownButton
									componentClass={InputGroup.Button}
									bsStyle="primary"
									id='filter-options-dropdown'
									title={filterOptions[this.state.filterProperty]}
									value={this.state.filterProperty}
									name="filterProperty"
									onSelect={this.handleFilterProperty}>
									{filterOptionsList}
								</DropdownButton>
							</InputGroup>
						</FormGroup>
					</Col>
				</Row>

				<Table striped bordered condensed hover>
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
			</Grid>
		);
	}
}

export default ProductsList;
