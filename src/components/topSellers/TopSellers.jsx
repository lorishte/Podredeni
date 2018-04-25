import React from 'react';

import { Row , Col } from 'react-bootstrap';

import ProductCard from '../partials/ProductCard';
import products from '../../data/products';

class TopSellers extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			index: 0,
		};
	}

	topSellers = [];
	numberOfProductsToShow = 3;

	loadPrevious = () => {
		if (this.state.index === 0) {
			return;
		}
		this.setState((prevState) => ({
			index: prevState.index - 1
		}));
	};

	loadNext = () => {
		if (this.state.index === products.length - this.numberOfProductsToShow) {
			return;
		}
		this.setState((prevState) => ({
			index: prevState.index + 1
		}));
	};

	render () {
		const start = this.state.index;
		const end = start + this.numberOfProductsToShow;

		this.topSellers = products.slice(start, end).map(product => {
			return <ProductCard key={product.id} data={product}/>;
		});

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

					{this.topSellers}
				</Col>

			</Row>
		);
	}
}

export default TopSellers;