import React from 'react';

import { CART } from '../../../../../data/constants/componentConstants';

class CartTableHeader extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		let resolutionBig = this.props.resolution;
		return (
			<div className="table-header">

				<div className="product">{CART.product}</div>

				{resolutionBig &&
				<div className="quantity">{CART.quantity}</div>
				}

				{resolutionBig &&
				<div className="price">{CART.price}</div>
				}


				<div className="sum">{CART.sum}</div>

			</div>
		);
	}
}

export default CartTableHeader;
