import React from 'react';

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
					{p.isBlocked}
				</td>
			</tr>

		);
	}
}

export default ProductTableRow;
