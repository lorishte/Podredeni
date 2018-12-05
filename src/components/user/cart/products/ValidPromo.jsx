import React from 'react';

import { Col, } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

// Partials
import CartTableHeader from './partials/CartTableHeader';
import CartProductRow from './partials/CartProductRow';
import CartProductRowPresent from './partials/CartProductRowPresent';
import CartTableFooter from './partials/CartTableFooter';

import {
	RESOLUTIONS,
	CONFIRM_DIALOGS,
	BUTTONS_BG,
	TOASTR_MESSAGES,
	PLACEHOLDERS,
	LABELS_BG
} from '../../../../data/constants/componentConstants';

// Helpers
import utils from '../../../../utils/utils';
import FormInputField from '../../../common/formComponents/FormInputField';

class ValidPromo extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			cartProducts: this.props.products.cart,
			discountedProducts: this.props.products.discountedProducts,
			discountedProductsCount: this.props.products.discountedProductsCount,

			selectedPresentsCount: 0,

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

		this.state.cartProducts.forEach(e => {
			let price = utils.calculatePriceAfterDiscount(e.price, e.discount).toFixed(2);
			sum += price * e.quantity;
		});

		this.setState({totalSum: sum.toFixed(2)});
	};

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth});
	};

	addPresent = (product) => {

		let selectedPresentsCount = this.state.selectedPresentsCount;

		if (selectedPresentsCount >= this.state.discountedProductsCount) return;

		product.quantity = 1;
		selectedPresentsCount++;

		let selectedProducts = this.props.selectedPresents;
		selectedProducts.push(product);

		this.setState({selectedPresentsCount: selectedPresentsCount}, () => {
			this.props.onChange('selectedPresents', selectedProducts);
		});
	};

	deleteItem = (id, quantity) => {

		let correctedProducts = this.props.selectedPresents.filter(e => e.id !== id);

		let selectedPresentsCount = this.state.selectedPresentsCount;
		selectedPresentsCount -= quantity;

		this.setState({ selectedPresentsCount: selectedPresentsCount}, () => {
			this.props.onChange('selectedPresents', correctedProducts);
		});
	};

	render () {
		let resolution = this.state.resolution > RESOLUTIONS.bootstrapXS;

		let cartProducts;
		if (this.state.cartProducts.length > 0) {
			cartProducts = this.state.cartProducts.map((p, i) => {
				return <CartProductRow
					key={p.id}
					index={i + 1}
					editable={false}
					data={p}/>;
			});
		}

		let availablePresents;
		if (this.state.discountedProductsCount > 0) {

			for (let i = 0; i < this.state.discountedProducts.length; i++) {
				availablePresents = this.state.discountedProducts.map(p => {
					p.image = p.images.slice(-1)[0];
					return (
						<div key={p.id} className="present">
							<div className="image-container">
								<img src={p.image}/>
							</div>
							<p className="present-name">{p.name}</p>
							<button className="btn-custom default xs"
							        onClick={() => this.addPresent(p)}>Избери
							</button>
						</div>);
				});
			}
		}

		let selectedPresents;
		if (this.props.selectedPresents.length > 0) {
			selectedPresents = this.props.selectedPresents.map((p, i) => {
				return <CartProductRowPresent
					key={p.id}
					index={i + 1}
					editable={this.state.selectedPresentsCount <= this.state.discountedProductsCount}
					delete={this.deleteItem}
					data={p}/>;
			});
		}

		return (
			<div id="cart-products-table">
				<h1>Валидна промоция</h1>

				<Col>
					<CartTableHeader resolution={resolution}/>
					{cartProducts}
					{selectedPresents}
					<CartTableFooter totalSum={this.state.totalSum}/>
				</Col>

				<h3>Имате право на {this.state.discountedProductsCount - this.state.selectedPresentsCount} подарък</h3>

				{this.state.selectedPresentsCount < this.state.discountedProductsCount &&
				<div className="presents">
					{availablePresents}
				</div>
				}


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
