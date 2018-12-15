import React from 'react';

import { Col } from 'react-bootstrap';

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
			selectedPresentsCount: this.props.selectedPresents.length,
			totalSum: 0,
			resolution: window.innerWidth
		};
	}

	componentDidMount () {
		window.scrollTo(0, 0);
		window.addEventListener('orientationchange', this.handleResolutionChange);
		window.addEventListener('resize', this.handleResolutionChange);

		this.calculateTotalSum();
		this.calculatePresentsCount(this.props.selectedPresents);
	}

	componentWillUnmount () {
		window.removeEventListener('orientationchange', this.handleResolutionChange);
		window.removeEventListener('resize', this.handleResolutionChange);
	}



	calculateTotalSum = () => {
		let sum = 0;

		let cartProducts = this.props.products.cart;
		let selectedPresents = this.props.selectedPresents;

		cartProducts.forEach(e => {
			let price = utils.calculatePriceAfterDiscount(e.price, e.discount).toFixed(2);
			sum += price * e.quantity;
		});

		selectedPresents.forEach(e => {
			let price = utils.calculatePriceAfterDiscount(e.price, e.discount).toFixed(2);
			sum += price * e.quantity;
		});

		this.setState({totalSum: sum.toFixed(2)});
	};

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth});
	};

	addPresent = (product) => {

		let selectedPresents = this.props.selectedPresents;
		let selectedPresentsCount = this.state.selectedPresentsCount;

		if (selectedPresentsCount >= this.state.discountedProductsCount) return;

		let isIncluded = selectedPresents.find(e => e.id === product.id);

		if (isIncluded) {
			isIncluded.quantity++;
		} else {
			product.quantity = 1;
			selectedPresents.push(product);
		}

		this.calculatePresentsCount(selectedPresents);

		this.calculateTotalSum();

		this.updateParent('selectedPresents', selectedPresents);

	};

	editItemQuantity = (id, newQuantity) => {
		let presents = this.props.selectedPresents;

		presents.forEach(e => {
			if (e.id === id) {
				e.quantity = newQuantity;
			}
		});

		this.calculatePresentsCount(presents);

		this.updateParent('selectedPresents', presents);
	};

	deleteItem = (id) => {

		let correctedPresents = this.props.selectedPresents.filter(e => e.id !== id);

		this.updateParent('selectedPresents', correctedPresents);

		this.calculatePresentsCount(correctedPresents);
	};

	calculatePresentsCount = (arr) => {

		let selectedPresentsCount = 0;

		if (arr.length > 0) {
			selectedPresentsCount = arr
				.map(item => item.quantity)
				.reduce((prev, next) => prev + next);
		}

		this.setState({selectedPresentsCount});
	};

	updateParent = (stateProp, data) => {
		this.props.onChange(stateProp, data);
	};

	render () {
		let resolution = this.state.resolution > RESOLUTIONS.bootstrapXS;
		let promotion = this.props.promotion;
		let discountedProducts = this.props.products.discountedProducts;
		let discountedProductsCount = this.props.products.discountedProductsCount;
		let cartProducts = this.props.products.cart;

		let selectedPresentsCount = this.state.selectedPresentsCount;

		cartProducts = cartProducts.map((p, i) => {
			return <CartProductRow
				key={p.id + i}
				editable={false}
				data={p}/>;
		});


		let availablePresents;
		if (discountedProductsCount > 0) {
			for (let i = 0; i < discountedProducts.length; i++) {

				availablePresents = discountedProducts.map(p => {
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
					key={p.id + i}
					editable={selectedPresentsCount < discountedProductsCount}
					edit={this.editItemQuantity}
					delete={this.deleteItem}
					data={p}/>;
			});
		}

		return (
			<div id="cart-products-table">
				<h2 className="valid-promo-headline">Валидна промоция</h2>

				{promotion && <p>{promotion.description}</p>}
				{!promotion && <p>При покупка на всеки 2 броя магнитни клипса, получавате подарък по избор от серия стандартни клипсове.</p>}



				<Col>
					<CartTableHeader resolution={resolution}/>
					{cartProducts}
					{selectedPresents}
					<CartTableFooter totalSum={this.state.totalSum}/>
				</Col>



				{discountedProductsCount > 0
				&& selectedPresentsCount < discountedProductsCount
				&&
				<h4>Можете да изберете <span className="presents-number">{discountedProductsCount - selectedPresentsCount}</span>
					{discountedProductsCount - selectedPresentsCount > 1 && <span>&nbsp;продукта с отстъпка.</span>}
					{discountedProductsCount - selectedPresentsCount === 1 && <span>&nbsp;продукт с отстъпка.</span>}
				</h4>
				}

				{discountedProductsCount > 0
				&& selectedPresentsCount === discountedProductsCount
				&&
				<h4>Успешно добавихте намалените продукти, които предоставя промоцията.
				<small>За да промените избора си, моля, изтрийте от таблицата някой от добавените подаръци.</small></h4>
				}

				{selectedPresentsCount < discountedProductsCount &&
				<div className="presents">
					{availablePresents}
				</div>
				}


				<Col className="buttons-container text-center">
					<button className='btn-custom light md'
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
