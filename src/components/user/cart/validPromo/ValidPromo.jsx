import React from 'react';

import { Col } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

// Partials
import CartTableHeader from './partials/CartTableHeader';
import StaticCartProductRow from './partials/StaticCartProductRow';
import CartTableFooter from './partials/CartTableFooter';


import { RESOLUTIONS, CONFIRM_DIALOGS, BUTTONS_BG , TOASTR_MESSAGES, PLACEHOLDERS, LABELS_BG } from '../../../../data/constants/componentConstants';

// Helpers
import utils from '../../../../utils/utils';

class ValidPromo extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: this.props.products,
			totalSum: 0,
			resolution: window.innerWidth
		};
	}

	componentDidMount () {
		window.scrollTo(0, 0);
		window.addEventListener('orientationchange', this.handleResolutionChange);
		window.addEventListener('resize', this.handleResolutionChange);

		this.calculateTotalSum();
	}

	componentWillUnmount () {
		window.removeEventListener('orientationchange', this.handleResolutionChange);
		window.removeEventListener('resize', this.handleResolutionChange);
	}

	componentWillReceiveProps () {
		this.calculateTotalSum();
	}

	calculateTotalSum = () => {
		let sum = 0;

		this.state.products.forEach(e => {
			let price = utils.calculatePriceAfterDiscount(e.price, e.discount).toFixed(2);
			sum += price * e.quantity;
		});

		this.setState({totalSum: sum.toFixed(2)});
	};


	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth});
	};

	render () {
		let resolution = this.state.resolution > RESOLUTIONS.bootstrapXS;

		let products;
		if (this.state.products.length > 0) {
			products = this.state.products.map((p, i) => {
				return <StaticCartProductRow
					key={p.id}
					index={i + 1}
					editable={false}
					data={p}/>;
			});
		}

		return (
			<div>
				<h1>Валидна промоция</h1>

				<Col id="cart-products-table">
					<CartTableHeader resolution={resolution}/>
					{products}
					<CartTableFooter totalSum={this.state.totalSum}/>
				</Col>


				<Col className="buttons-container text-center">
					<button className='btn-custom default md'
					        onClick={this.props.goBack}>{BUTTONS_BG.correct}
					</button>
					<button className='btn-custom primary md'
					        onClick={this.props.continue}>{BUTTONS_BG.next}
					</button>
				</Col>
			</div>
		);

	}
}

export default ValidPromo ;
