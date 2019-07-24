import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Grid } from 'react-bootstrap';
import { ToastContainer } from 'react-toastr';

// Partials
import ProductCard from './partials/ProductCard';

// Services
import categoryService from '../../../../services/categories/categoryService';

// Constants
import { RESOLUTIONS, BUTTONS_BG } from '../../../../data/constants/componentConstants';

class ProductsListNew extends React.Component {
	constructor (props) {
		super(props);

		this.state = {

			nestedCategories: [],

			size: 50,
			page: 1,
			sortProperty: 'number',
			descending: true,
			filterProperty: 'name',
			filterValue: '',

			resolution: window.innerWidth,

			loading: true
		};
	}

	componentDidMount () {
		window.scrollTo(0, 0);
		window.addEventListener('orientationchange', this.handleResolutionChange);
		window.addEventListener('resize', this.handleResolutionChange);

		sessionStorage.removeItem('selectedSubcategoryIds');

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
			.loadNestedCategories(null, 3)
			.then(res => {
				res.forEach(cat => {
					cat.products.forEach(p => p.images.reverse());
				});
				this.setState({nestedCategories: res, loading: false});
			})
			.catch(err => console.log(err));
	};

	showMessage = (type, header, message) => {
		this.toastContainer[type](header, message)
	};

	render () {

		if (this.state.loading) return <div className='loader'/>;

		let resolution = this.state.resolution < RESOLUTIONS.xs;

		let productsList = this.state.nestedCategories.map(cat => {

			if (cat.name !== 'Default' && cat.count > 0) {
				let products = cat.products.map(e => {

					return <ProductCard key={e.id}
					                    product={e}
					                    showMessage={this.showMessage}
					                    size={''}
					                    xsRes={resolution ? 12 : 6}/>;
				});

				return <Col xs={12} key={cat.id}>

					<div className='header'>
						<Link to={'/products-by-category/' + cat.id} className=''><h2>{cat.name}</h2></Link>
						<Link to={'/products-by-category/' + cat.id} className='btn btn-custom primary sm'>{BUTTONS_BG.goToCategory} </Link>
					</div>

					<Row>{products}</Row>
				</Col>;
			}

		});

		return (
			<Grid id="products" bsClass={'container'}>

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"/>

				<Col xs={12}>
					{productsList}
				</Col>

			</Grid>
		);
	}
}

export default ProductsListNew;