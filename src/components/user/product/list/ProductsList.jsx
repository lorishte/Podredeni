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
			nestedFilters: [],

			filtersVisible: [], // For show and hide filters

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

		this.loadCategories();

		this.loadNestedCategories();
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

	loadNestedCategories = () => {
		categoryService
			.loadNestedCategories(null)
			.then(res => {

				// Make category filters visible on large devices
				if (this.state.resolution >= RESOLUTIONS.bootstrapSM) {
					let filtersVisible = [];
					res.forEach(c => {
						filtersVisible.push(c.name);
					});
					this.setState({filtersVisible});
				}

				this.setState({nestedFilters: res});
			})
			.catch(err => console.log(err));
	};

	loadProducts = () => {

        this.setState({filtering: true});

        let productsListState = sessionStorage.getItem('productsListState');

        if (productsListState === null) {

            sessionStorage.setItem('firstTimeProductsLoad', true);

        } else {

            let parsedState = JSON.parse(productsListState);

            for (let event in parsedState) {

                this.setState({[event]: parsedState[event]});

            }
        }

        productsService
            .loadProducts(this.state)
            .then(res => {

                res.products.forEach(e => e.images.reverse());
                this.setState({
                    products: res.products,
                    loading: false,
                    filtering: false
                });

                let categories = Object.assign({}, this.state.categories);
                categories.matched = res.categories;

                let subcategories = Object.assign({}, this.state.subcategories);
                subcategories.matched = res.subcategories;

                this.setState({categories, subcategories});

                if (sessionStorage.getItem('firstTimeProductsLoad')) {

                    let stringifiedState = JSON.stringify(this.state);

                    sessionStorage.setItem('productsListState', stringifiedState);

                    sessionStorage.setItem('firstTimeProductsLoad', false);
                }

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
			selectedStateProp.selected = selectedStateProp.selected.filter(e => e !== id);
			this.setState({[stateProp]: selectedStateProp});

		} else {

			let selectedStateProp = Object.assign({}, this.state[stateProp]);
			selectedStateProp.selected.push(id);
			this.setState({[stateProp]: selectedStateProp});
		}

		setTimeout(() => {

			//from here

            sessionStorage.setItem('productsListState', JSON.stringify(this.state));

			//up to here
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

		let categories = this.state.nestedFilters.map(c => {

			if (c.count === 0 || c.name === 'Default') return;

			let subCategories = c.subcategories.map(sc => {
				let catStyle = this.state.subcategories.matched.map(e => e.id).includes(sc.id) ? 'sub-category' : 'sub-category disabled';

				let checked = this.state.subcategories.selected.includes(sc.id) ? 'check-box selected' : 'check-box';

				return <div key={sc.id} className={catStyle}>
					<span className={checked}>
						<i className="fa fa-check" aria-hidden="true"/>
					</span>
					<span className='name'>{sc.name}</span>
					<span className="over"
					      id={sc.id}
					      data-target-name="subcategories"
					      onClick={this.selectFilterCategory}/>
				</div>;
			});

			let catStyle = this.state.categories.matched.map(e => e.id).includes(c.id) ? 'category' : 'category disabled';

			let checked = this.state.categories.selected.includes(c.id) ? 'check-box selected' : 'check-box';

			let isVisible = this.state.filtersVisible.includes(c.name) ? 'body visible' : 'body';

			return (

				<div key={c.id}>
					<div className={catStyle}>
						<span className={checked}>
							<i className="fa fa-check" aria-hidden="true"/>
						</span>
						<span className='name'>{c.name}</span>
						<span className="over"
						      id={c.id}
						      data-target-name="categories"
						      onClick={this.selectFilterCategory}/>

						<span
							className={this.state.filtersVisible.includes(c.name) ? 'toggle-menu clicked' : 'toggle-menu'}>
						<span className="toggle"/>
						<span className="toggle"/>
						<button className="over" name={c.name}
						        onClick={this.toggleSection}/>
					</span>
					</div>

					<div className={isVisible}>

						{subCategories}
					</div>
				</div>);
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

		let results = filters.map((e, i) => {
			return (<span key={i} className='result'>{e}</span>);
		});

		return (
			<Grid id="products" bsClass={'container-fluid'}>

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"/>


				<Col xs={12}>
					<Col xs={12} sm={3} className="filters-container">
						{categories}
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