import React from 'react';
import {Link} from 'react-router-dom';

class ProductTableRow extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		let p = this.props.data;
		return (
			<tr className="text-center">
				<td>
					{p.number}
				</td>
				<td className="text-left">
					{p.name}
				</td>
				<td className="text-right">
					<p className="price"> {p.price.toFixed(2)}</p>
				</td>
				<td>
					{!p.isTopSeller && <i className="fa fa-check" aria-hidden="true"/>
					}
				</td>
				<td>
					{!p.isBlocked && <i className="fa fa-check" aria-hidden="true"/>}
				</td>
				<td>
					<Link to={'/product/edit/' + p.id}>Edit</Link>
				</td>
			</tr>

		);
	}
}

export default ProductTableRow;
