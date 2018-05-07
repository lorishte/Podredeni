import React from 'react';

import { Row , Col } from 'react-bootstrap';

import ProductCard from '../../../product/list/partials/ProductCard';

import productsService from '../../../../../services/products/productsService';

class TopSellers extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: '',
			size: 12,
			page: 1,
			filterProperty: 'IsTopSeller',
			filterValue: true,
			index: 0,
		};
	}

	numberOfProductsToShow = this.props.productsToShow;

	componentDidMount () {
		productsService
			.loadProducts(this.state)
			.then(res => {
				this.setState({products: res.products})
			})
			.catch(err => {
				console.log(err.responseText)
			});
	}

	loadPrevious = () => {
		if (this.state.index === 0) {
			return;
		}
		this.setState((prevState) => ({
			index: prevState.index - 1
		}));
	};

	loadNext = () => {
		if (this.state.index === this.state.products.length - this.numberOfProductsToShow) {
			return;
		}
		this.setState((prevState) => ({
			index: prevState.index + 1
		}));
	};

	render () {
		const start = this.state.index;
		const end = start + this.numberOfProductsToShow;

		let cards;
		if (this.state.products !== '') {
			cards = this.state.products.slice(start, end).map(product => {
				return <ProductCard key={product.id} data={product}/>;
			});
		}

		return (
			<Row className="top-sellers">
				<Col xs={12}>

					<h1 className="section-heading">Top sellers</h1>
					<div
						className="carousel-control left"
						onClick={this.loadPrevious}>
						<span className="glyphicon glyphicon-chevron-left"/>
						<span className="sr-only">Prev</span>
					</div>
					<div
						className="carousel-control right"
						onClick={this.loadNext}>
						<span className="glyphicon glyphicon-chevron-right"/>
						<span className="sr-only">Next</span>
					</div>

					{cards}
				</Col>

			</Row>
		);
	}
}

export default TopSellers;