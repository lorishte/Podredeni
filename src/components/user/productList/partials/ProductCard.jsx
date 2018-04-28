import React from 'react';
import { Link } from 'react-router-dom';

import { Col } from 'react-bootstrap';

class ProductCard extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		const data = this.props.data;

		return (
			<Col xs={12} sm={6} md={3} data={this.data}>
				<Link to={'/products/' + data.id}>
					<div className="card">
						<div className="product-image">
							<img className="card-img-top" src={data.imageUrl} alt="Card image cap"/>
						</div>
						<div className="card-body">
							<h4 className="card-title">{data.name}</h4>
							<p className="card-text">{data.description.substring(0, 80) + ' ...'}</p>
							<p className="price">{data.price}</p>
						</div>
					</div>
				</Link>
			</Col>
		);
	}
}

export default ProductCard;