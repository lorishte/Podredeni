import React from 'react';
import {Link} from 'react-router-dom';

class ProductTableRow extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		let p = this.props.data;
		return (
			<tr>
				<td>
					{p.number}
				</td>
				<td>
					{p.name}
				</td>
				<td>
					{p.price}
				</td>
				<td>
					{p.isTopSeller}
				</td>
				<td>
					{p.isBlocked}
				</td>
				<td>
					<Link to={'/product/edit/' + p.id}>Edit</Link>
				</td>
			</tr>

		);
	}
}

export default ProductTableRow;
