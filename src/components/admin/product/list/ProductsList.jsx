import React from 'react';

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
import FormSelectField from '../../../common/formComponents/FormSelectField';
import FormInputWithDropdown from '../../../common/formComponents/FormInputWithDropdown'

import productsService from '../../../../services/products/productsService';

const WAIT_INTERVAL = 2000;
const PAGES_ON_PAGE = {10: 10, 20: 20, 30: 30, 40: 40, 50: 50};
const FILTER_OPTIONS = { 'name': 'име', 'number': 'номер' };

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
		if (e.target.value === '') return;
		this.setState({size: e.target.value}, () => this.goToPage(1));
	};

	handleFilterProperty = (е) => {
		this.setState({filterValue: '', filterProperty: е});
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

		return (
			<Grid>
				<Row>
					<Col xs={3} sm={2}>
						<FormSelectField
							label="Покажи"
							name="size"
							value={this.state.size}
							optionsList={PAGES_ON_PAGE}
							required={false}
							onChange={this.handleSizeChange}/>
					</Col>

					<Col xs={9} sm={6}>
						<FormInputWithDropdown
							label="Филтър по"
							// input
							inputName="filterValue"
							filterValue={this.state.filterValue}
							onChange={this.handleFilterValue}
							onKeyDown={this.handleKeyDown}
							// dropdown
							filterProperty={this.state.filterProperty}
							dropdownName="filterProperty"
							onSelect={this.handleFilterProperty}
							// dropdown options
							optionsList={FILTER_OPTIONS} />
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
