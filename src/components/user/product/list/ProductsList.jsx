import React from 'react';

import { Col, Row, Grid } from 'react-bootstrap';
import { ToastContainer } from 'react-toastr';

// Partials
import ProductCard from './partials/ProductCard';

// Services
import productsService from '../../../../services/products/productsService';
import categoryService from '../../../../services/categories/categoryService';

// Constants
import { RESOLUTIONS, PRODUCT } from '../../../../data/constants/componentConstants';

class FilterObject {
	constructor () {
		this.original = [];
		this.selected = [];
		this.matched = [];
	}
}

class ProductsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: [],

			categories: new FilterObject(),
			subcategories: new FilterObject(),

			filtersVisible: [],

			size: 50,
			page: 1,
			sortProperty: 'number',
			descending: true,
			filterProperty: 'name',
			filterValue: '',

			resolution: window.innerWidth,

			loading: true,
			filtering: false
		};
	}

	componentDidMount () {
		window.scrollTo(0, 0);
		window.addEventListener('orientationchange', this.handleResolutionChange);
		window.addEventListener('resize', this.handleResolutionChange);

		this.loadProducts();

		this.loadCategories();
	}

	componentWillUnmount () {
		window.removeEventListener('orientationchange', this.handleResolutionChange);
		window.removeEventListener('resize', this.handleResolutionChange);
	}

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth});
	};

	loadCategories = () => {
		categoryService
			.loadCategories(null, false)
			.then(res => {

					let categories = Object.assign({}, this.state.categories);      //creating copy of object
					categories.original = res;                                      //updating value
					this.setState({categories});

					categoryService
						.loadCategories(null, true)
						.then(res => {
							let subcategories = Object.assign({}, this.state.subcategories);      //creating copy of object
							subcategories.original = res;                                      //updating value
							this.setState({subcategories});
							this.loadProducts();
						});
				}
			)
			.catch(err => console.log(err));
	};

	loadProducts = () => {
		this.setState({filtering: true});

		productsService
			.loadProducts(this.state)
			.then(res => {

				let products = res.products;

				products.forEach(e => e.images.reverse());

				products.sort(function () {
					return .5 - Math.random();
				});

				this.setState({
					products: products,
					loading: false,
					filtering: false
				});

				let categories = Object.assign({}, this.state.categories);
				categories.matched = res.categories;

				let subcategories = Object.assign({}, this.state.subcategories);
				subcategories.matched = res.subcategories;

				this.setState({categories, subcategories});

			})
			.catch(err => {
				this.props.history.push('/error');
			});
	};

	selectFilterCategory = (e) => {
		this.setState({filtering: true});

		let stateProp = e.target.getAttribute('data-target-name');

		let id = e.target.getAttribute('id');

		if (this.state[stateProp].selected.includes(id)) {

			let selectedStateProp = Object.assign({}, this.state[stateProp]);
			let test = selectedStateProp.selected.filter(e => e !== id);
			selectedStateProp.selected = test;
			this.setState({[stateProp]: selectedStateProp});

		} else {

			let selectedStateProp = Object.assign({}, this.state[stateProp]);
			selectedStateProp.selected.push(id);
			this.setState({[stateProp]: selectedStateProp});
		}

		setTimeout(() => {
			this.loadProducts();
		}, 2000);
	};

	toggleSection = (e) => {

		let filterType = e.target.name;

		if (this.state.filtersVisible.includes(filterType)) {
			this.setState({
				filtersVisible: this.state.filtersVisible.filter(el => el !== filterType)
			});
		} else {
			this.setState({
				filtersVisible: [...this.state.filtersVisible, filterType]
			});
		}
	};

	render () {

		if (this.state.loading) return <div className='loader'/>;

		let resolution = this.state.resolution < RESOLUTIONS.xs;

		let productsList = this.state.products.map(e => {
			return <ProductCard key={e.id}
			                    data={e}
			                    toastContainer={this.toastContainer}
			                    xsRes={resolution ? 12 : 6}/>;
		});

		let categories = this.state.categories.original.map(c => {

			if (c.name === 'Default') return;

			let catStyle = this.state.categories.matched.map(e => e.id).includes(c.id) ? 'category' : 'category disabled';

			let style = this.state.categories.selected.includes(c.id) ? 'check-box selected' : 'check-box';

			return (
				<div key={c.id} className={catStyle}>
					<span className={style}/>
					<span className='category-name'>{c.name}</span>
					<span className="over"
					      id={c.id}
					      data-target-name="categories"
					      onClick={this.selectFilterCategory}/>
				</div>
			);
		});

		let subCategories = this.state.subcategories.original.map(sc => {

			let catStyle = this.state.subcategories.matched.map(e => e.id).includes(sc.id) ? 'category' : 'category disabled';

			let style = this.state.subcategories.selected.includes(sc.id) ? 'check-box selected' : 'check-box';

			return <div key={sc.id} className={catStyle}>
				<span className={style}/>
				<span className='category-name'>{sc.name}</span>
				<span className="over"
				      id={sc.id}
				      data-target-name="subcategories"
				      onClick={this.selectFilterCategory}/>
			</div>;
		});

		let filters = [];

		this.state.categories.selected.forEach(e => {
			let categoryName = this.state.categories.original.filter(c => c.id === e)[0].name;
			filters.push(categoryName);
		});

		this.state.subcategories.selected.forEach(e => {
			let subcategoryName = this.state.subcategories.original.filter(c => c.id === e)[0].name;
			filters.push(subcategoryName);
		});

		let results = filters.map(e => {
			return (<span className='result'>{e}</span>);
		});

		return (
			<Grid id="products" bsClass={'container-fluid'}>

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"/>


				<Col xs={12}>
					<Col xs={12} sm={3}>

						<aside>
							<div className="filters-container">
								<div className='header'>
									<h4>{PRODUCT.category}</h4>
									<div
										className={this.state.filtersVisible.includes('category') ? 'toggle-menu clicked' : 'toggle-menu'}>
										<span className="toggle"/>
										<span className="toggle"/>
										<button className="over" name='category'
										        onClick={this.toggleSection}/>
									</div>
								</div>

								<div
									className={this.state.filtersVisible.includes('category') ? 'body visible' : 'body'}>
									{categories}
								</div>
							</div>

							<div className="filters-container">

								<div className='header'>
									<h4>{PRODUCT.subCategory}</h4>
									<div
										className={this.state.filtersVisible.includes('subCategory') ? 'toggle-menu clicked' : 'toggle-menu'}>
										<span className="toggle"/>
										<span className="toggle"/>
										<button className="over" name='subCategory'
										        onClick={this.toggleSection}/>
									</div>
								</div>
								<div
									className={this.state.filtersVisible.includes('subCategory') ? 'body visible' : 'body'}>
									{subCategories}
								</div>
							</div>
						</aside>

					</Col>

					<Col xs={12} sm={9}>

						{filters.length > 0 && <p id='filter-info'> {PRODUCT.resultsFor}: {results} </p>}
						<Row>
							{this.state.filtering && <div className="loader"/>}

							{!this.state.filtering && productsList}
						</Row>
					</Col>
				</Col>

			</Grid>
		);
	}
}

export default ProductsList;