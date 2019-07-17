import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Grid } from 'react-bootstrap';
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
	}

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth});
	};

	loadNestedCategories = () => {
		categoryService
			.loadNestedCategories(null)
			.then(res => {

				let catId = this.props.match.params.id;

				let selectedCategory = res.filter(c => c.id === catId)[0];

				selectedCategory.products.forEach(p => p.images.reverse());

				console.log(selectedCategory);

				this.setState({
					categoryName: selectedCategory.name,
					categoryId: selectedCategory.id,
					allProducts: selectedCategory.products,
					filteredProducts: selectedCategory.products,
					subcategories: selectedCategory.subcategories,
					loading: false
				});
			})
			.catch(err => console.log(err));
	};

	selectFilterCategory = (e) => {

		this.setState({filtering: true});

		let id = e.target.getAttribute('id');

		let subCats = this.state.selectedSubcategoryIds;

		setTimeout(() => {
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

				let added = subCats.push(id);

				this.setState({
					selectedSubcategoryIds: [...this.state.selectedSubcategoryIds, id],
				}, () => {
					this.setState({
						filteredProducts: this.filterProducts(),
						filtering: false
					});
				});
			}
		}, 500);
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

	render () {

		if (this.state.loading) return <div className='loader'/>;

		let resolution = this.state.resolution < RESOLUTIONS.xs;

		let productsList = this.state.filteredProducts.map(e => {

			return <ProductCard key={e.id}
			                    data={e}
			                    toastContainer={this.toastContainer}
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
					<Col xs={12} sm={3} className="filters-container">

						<h4 className='category'>{this.state.categoryName}</h4>
						{subcategories}
					</Col>

					<Col xs={12} sm={9}>

						<Row>
							{this.state.filtering && <div className="loader"/>}

							{!this.state.filtering && productsList}
						</Row>
					</Col>
				</Col>

			</Grid>
		)
			;
	}
}

export default ProductsListByCategory;