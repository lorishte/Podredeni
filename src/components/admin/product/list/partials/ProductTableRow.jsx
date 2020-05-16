import React from 'react';
import {Link} from 'react-router-dom';

import { Label } from 'react-bootstrap';

class ProductTableRow extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		let p = this.props.data;

		console.log(p)

		let url = p.images[p.images.length - 1]
		if (!url.includes('http')) url = '/images/products/' + url;

		return (
			<tr className="text-center">
				<td>
					{p.number}
				</td>
				<td className="text-left">
					<img src={url} className={'image-thumbnail-small'}/>
					<span className={'hidden-xs'}>{p.name}</span>
				</td>
				<td className="text-right">
					<p className="price"> {p.price.toFixed(2)}</p>
				</td>
				<td>
					{p.isTopSeller &&
					<Label bsStyle="info">
						<i className="fa fa-diamond" aria-hidden="true" />
					</Label>
					}
				</td>
				<td>
					{p.isBlocked &&
					<Label bsStyle="danger">
						<i className="fa fa-ban" aria-hidden="true"/>
					</Label>}
				</td>
				<td className="text-center">
					<Link to={'/product/edit/' + p.id} className="btn btn-success btn-xs">
						<i className="fa fa-pencil" aria-hidden="true"/>
					</Link>
				</td>
			</tr>

		);
	}
}

export default ProductTableRow;
