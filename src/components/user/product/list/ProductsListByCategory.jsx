import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Grid, Breadcrumb, Accordion, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastr';

// Partials
import ProductCard from './partials/ProductCard';

// Services
import productsService from '../../../../services/products/productsService';
import categoryService from '../../../../services/categories/categoryService';

// Constants
import { RESOLUTIONS, PRODUCT } from '../../../../data/constants/componentConstants';

class ProductsListByCategory extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			categoryId: '',
			categoryName: '',
			allProducts: [],
			filteredProducts: [],
			subcategories: [],

			selectedSubcategoryIds: [],

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

		this.loadNestedCategories();
	}

	componentWillUnmount () {
		window.removeEventListener('orientationchange', this.handleResolutionChange);
		window.removeEventListener('resize', this.handleResolutionChange);

		sessionStorage.setItem('selectedSubcategoryIds', JSON.stringify(this.state.selectedSubcategoryIds));
	}

	checkFilters = () => {

		let subCategories = JSON.parse(sessionStorage.getItem('selectedSubcategoryIds'));

		if (subCategories) {
			this.setState({selectedSubcategoryIds: subCategories}, () => {
				this.setState({
					filteredProducts: this.filterProducts()
				});
			});
		}

	};

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth});
	};

	loadNestedCategories = () => {
		categoryService
			.loadNestedCategories(null, 1000)
			.then(res => {

				let catId = this.props.match.params.id;

				let selectedCategory = res.filter(c => c.id === catId)[0];

				// Reverse images to get the first
				selectedCategory.products.forEach(p => p.images.reverse());

				// Sort subcategories by alphabetical order
				selectedCategory.subcategories.sort((a, b) => a.name.localeCompare(b.name));

				this.setState({
					categoryName: selectedCategory.name,
					categoryId: selectedCategory.id,
					allProducts: selectedCategory.products,
					filteredProducts: selectedCategory.products,
					subcategories: selectedCategory.subcategories,
					loading: false
				}, () => this.checkFilters());
			})
			.catch(err => console.log(err));
	};

	selectFilterCategory = (e) => {

		this.setState({filtering: true});

		let id = e.target.getAttribute('id');

		let subCats = this.state.selectedSubcategoryIds;

		if (subCats.includes(id)) {

			this.setState({
				selectedSubcategoryIds: subCats.filter(scId => scId !== id),
			}, () => {
				this.setState({
					filteredProducts: this.filterProducts(),
					filtering: false
				});
			});
		} else {
			this.setState({
				selectedSubcategoryIds: [...this.state.selectedSubcategoryIds, id],
			}, () => {
				this.setState({
					filteredProducts: this.filterProducts(),
					filtering: false
				});
			});
		}

	};

	filterProducts = () => {

		let filteredProducts = [];

		if (this.state.selectedSubcategoryIds.length > 0) {
			this.state.allProducts.forEach(p => {
				p.subcategories.forEach(sc => {
					if (this.state.selectedSubcategoryIds.includes(sc.id)) {
						filteredProducts.push(p);
					}
				});
			});
		} else {
			filteredProducts = this.state.allProducts;
		}

		return filteredProducts;
	};

	showMessage = (type, header, message) => {
		this.toastContainer[type](header, message);
	};

	render () {

		if (this.state.loading) return <div className='loader'/>;

		let resolution = this.state.resolution < RESOLUTIONS.xs;

		let productsList = this.state.filteredProducts.map(e => {

			return <ProductCard key={e.id}
			                    product={e}
			                    showMessage={this.showMessage}
			                    xsRes={resolution ? 12 : 6}/>;

		});

		let subcategories = this.state.subcategories.map(sc => {

			let catStyle = this.state.selectedSubcategoryIds.map(e => e.id).includes(sc.id) ? 'sub-category' : 'sub-category disabled';

			let checked = this.state.selectedSubcategoryIds.includes(sc.id) ? 'check-box selected' : 'check-box';

			return (

				<div key={sc.id} className={catStyle}>
					<span className={checked}>
						<i className="fa fa-check" aria-hidden="true"/>
					</span>
					<span className='name'>{sc.name} <span className='label'>{sc.count}</span></span>
					<span className="over"
					      id={sc.id}
					      onClick={this.selectFilterCategory}/>
				</div>
			);
		});

		return (

			<Grid id="products" bsClass={'container-fluid'}>

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"/>


				<Col xs={12}>

					<Breadcrumb>
						<Breadcrumb.Item href="/">Начало</Breadcrumb.Item>
						<Breadcrumb.Item href="/products">
							Продукти
						</Breadcrumb.Item>
						<Breadcrumb.Item active>{this.state.categoryName}</Breadcrumb.Item>
					</Breadcrumb>

					<Col xs={12} sm={4} md={3}>

						<Col xs={12} className="filters-container">
							<h4 className='category'>{this.state.categoryName}</h4>
							{subcategories}
						</Col>
					</Col>

					<Col xs={12} sm={8} md={9}>

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

export default ProductsListByCategory;