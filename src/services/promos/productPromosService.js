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

		console.log(data);

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

	assign: (promoId, assignedProducts) => {

		let url = endPoint + '/assign/' + promoId;

		return requesterService.update(url, auth, assignedProducts);
	},

	remove: (promoId, removedProducts) => {

		let url = endPoint + '/remove/' + promoId;

		return requesterService.update(url, auth, removedProducts);
	}

};


function generateProductDetails(state) {

	if (state.newDiscountedProducts.length === 0) {
		state.newDiscountedProducts = state.newProducts;
	}

	return {
		Name: state.name,
		PromoCode: state.promoCode,

		StartDate: state.startDate,
		EndDate: state.endDate,

		Discount: state.discount,

		Products: state.newProducts,
		ProductsCount: state.productsCount,

		DiscountedProducts: state.newDiscountedProducts,
		DiscountedProductsCount: state.discountedProductsCount,

		Quota: state.quota,

		IsInclusive: state.isInclusive,
		IsAccumulative: state.isAccumulative,
		IncludePriceDiscounts: state.includePriceDiscounts,

	};
}
