import React from 'react';

import { Table, Button, Row, Col } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

// Partials
import CartTableHeader from './partials/CartTableHeader';
import CartProductRow from './partials/CartProductRow';
import CartTableFooter from './partials/CartTableFooter'

import { RESOLUTIONS, CONFIRM_DIALOGS, BUTTONS_BG } from '../../../../data/constants/componentConstants';

// Helpers
import utils from '../../../../utils/utils'


class CartProductsTable extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
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

	confirmDeletion = (id) => {

		if (this.props.products.length === 1 && sessionStorage.getItem('role') === 'admin') {
			confirmAlert({
				title: '',
				message: CONFIRM_DIALOGS.cancelOrder,
				buttons: [{
					label: BUTTONS_BG.yes,
					onClick: () => this.props.cancelOrder()
				},
					{label: BUTTONS_BG.no}]
			});

			return;
		}

		confirmAlert({
			title: '',
			message: CONFIRM_DIALOGS.deleteProduct,
			buttons: [{
				label: BUTTONS_BG.yes,
				onClick: () => this.deleteItem(id)
			},
				{label: BUTTONS_BG.no}]
		});
	};

	deleteItem = (id) => {
		let correctedProducts = this.props.products.filter(e => e.id !== id);
		this.updateParent(correctedProducts);
	};

	editItemQuantity = (id, newQuantity) => {
		let products = this.props.products;
		products.forEach(e => {
			if (e.id === id) {
				e.quantity = newQuantity;
			}
		});

		this.updateParent(products);
	};

	updateParent = (correctedProducts) => {
		this.props.onChange('products', correctedProducts);
		this.calculateTotalSum();
	};

	calculateTotalSum = () => {
		let sum = 0;

		this.props.products.forEach(e => {
			let price = utils.calculatePriceAfterDiscount(e.price, e.discount ).toFixed(2);
			sum += price * e.quantity;
		});

		this.setState({totalSum: sum.toFixed(2)});
	};

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth});
	};

	render () {
		let resolution = this.state.resolution < RESOLUTIONS.xs;

		let isAdmin = sessionStorage.getItem('role') === 'admin';

		let products;
		if (this.props.products.length > 0) {
			products = this.props.products.map((p, i) => {
				return <CartProductRow
					key={p.id}
					index={i + 1}
					editable={true}
					data={p}
					delete={this.confirmDeletion}
					edit={this.editItemQuantity}/>;
			});
		}

		return (
			<div>
				<Table condensed id="cart-products-table">

					<CartTableHeader editable={true}/>

					<tbody>
					{products}
					</tbody>

					<CartTableFooter resolution={resolution} totalSum={this.state.totalSum} colSpan={4}/>
				</Table>

				<Row className="buttons-container">
					<Col xs={12} className="text-center">
						<button className={isAdmin ? "btn btn-primary" : "btn-custom primary md"}
						        onClick={this.props.continue}>{BUTTONS_BG.next}</button>
					</Col>
				</Row>

			</div>
		);

	}
}

export default CartProductsTable ;
