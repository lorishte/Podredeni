import requesterService from '../requester';
const endPoint = '/promotions';
const auth = 'admin';

export default {

	loadAll: () => {

		return requesterService
			.get(endPoint, auth);
	},

	load: (promoId) => {

		let url = endPoint + '/' + promoId;

		return requesterService.get(url, auth);
	},

	create: (state) => {

		let data = generateProductDetails(state);

		return requesterService.post(endPoint, auth, data);
	},

	edit: (promoId, state) => {

		let url = endPoint + '/' + promoId;

		let data = generateProductDetails(state);

		return requesterService.update(url, auth, data);
	},

	delete: (promoId) => {

		let url = endPoint + '/' + promoId;

		return requesterService.remove(url, auth);
	},

	remove: (promoId, removedProducts) => {

		let url = endPoint + '/remove/' + promoId;

		return requesterService.update(url, auth, removedProducts);
	},

	checkPromotion: (promoCode, state) => {

		let endPointPromos = endPoint + '/check';

		let products = generatePromoDetails(promoCode, state);

		return requesterService
			.post(endPointPromos, null, products)
	}

};


function generateProductDetails(state) {

	if (state.newDiscountedProducts.length === 0) {
		state.newDiscountedProducts = state.newProducts;
	}

	return {
		Name: state.name,
		PromoCode: state.promoCode,

		Description: state.description,

		StartDate: state.startDate,
		EndDate: state.endDate,

		Discount: state.discount,

		Products: state.newProducts,
		ProductsCount: state.productsCount,

		DiscountedProducts: state.newDiscountedProducts,
		DiscountedProductsCount: state.discountedProductsCount,

		Quota: state.quota,

		IsInclusive: !state.isInclusive,
		IsAccumulative: state.isAccumulative,
		IncludePriceDiscounts: state.includePriceDiscounts,

	};
}

function generatePromoDetails (promoCode, state) {

	let products = state.products;

	let requestProducts = [];

	for (let i = 0; i < products.length; i++) {

		requestProducts[i] = {
			Id: products[i].id,
			Quantity: products[i].quantity,
			Discount: products[i].discount,
			Price: products[i].price
		};
	}

	return {
		PromoCode:promoCode,
		Products: requestProducts
	};
}
