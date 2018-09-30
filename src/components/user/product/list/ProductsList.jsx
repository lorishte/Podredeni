import React from 'react';

import { Row, Grid } from 'react-bootstrap';
import { ToastContainer } from 'react-toastr';

import ProductCard from './partials/ProductCard';

import productsService from '../../../../services/products/productsService';

import { RESOLUTIONS } from '../../../../data/constants/componentConstants';

class ProductsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: [],
			size: 50,
			page: 1,
			sortProperty: 'number',
			descending: true,
			filterProperty: 'name',
			filterValue: '',
			resolution: window.innerWidth
		};
	}

	componentDidMount () {
		window.scrollTo(0, 0);
		window.addEventListener('orientationchange', this.handleResolutionChange);
		window.addEventListener('resize', this.handleResolutionChange);

		this.loadProducts();
	}

	componentWillUnmount () {
		window.removeEventListener('orientationchange', this.handleResolutionChange);
		window.removeEventListener('resize', this.handleResolutionChange);
	}

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth});
	};

	loadProducts = () => {
		productsService
			.loadProducts(this.state)
			.then(res => {

				console.log(res.products);

				res.products.forEach(e => e.images.reverse());
				this.setState({products: res.products});
			})
			.catch(err => {
				this.props.history.push('/error');
			});
	};



	render () {
		let resolution = this.state.resolution < RESOLUTIONS.xs;

		let productsList;
		productsList = this.state.products.map(e => {
			return <ProductCard key={e.id}
			                    data={e}
			                    toastContainer={this.toastContainer}
								xsRes={resolution ? 12 : 6}/>;
		});

		return (
			<Grid>
				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				{this.state.products.length === 0 && <div className="loader"/> }

				<Row className="show-grid top-sellers">
					{productsList}
				</Row>
			</Grid>
		);
	}
}

export default ProductsList;