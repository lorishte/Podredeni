import requesterService from '../requester';
const endPoint = '/products';
const auth = 'admin';

export default {

	// loadProductsList: () => {
	//     return requesterService
	//         .get(endPoint, null, query);
	// },

	loadProducts: (state, includeBlocked = false) => {

		let query =
			'?page=' + state.page +
			'&size=' + state.size +
			'&filterElement=' + state.filterProperty +
			'&filterValue=' + state.filterValue +
			'&sortElement=' + state.sortProperty +
			'&sortDesc=' + state.descending +
			'&includeBlocked=' + includeBlocked;

		return requesterService
			.get(endPoint, null, query);
	},

	addProduct: (state) => {

		let product = generateProductDetails(state);

		return requesterService
			.post(endPoint, auth, product);
	},

	getProduct: (id) => {

		let endPointId = endPoint + `/${id}`;

		return requesterService
			.get(endPointId, null);
	},

	updateProduct: (state, id) => {

		let endPointId = endPoint + '/' + id;

		let product = generateProductDetails(state);

		product.IsBlocked = state.isBlocked;

		return requesterService
			.update(endPointId, auth, product);
	},

	seedProducts: (product) => {

		return requesterService
			.post(endPoint, null, product);
	}
};

function generateProductDetails (state) {

	return {
		Name: state.name,
		Description: state.description,
		Price: state.price,
		ImageUrls: state.imageUrls,
		IsTopSeller: state.isTopSeller
	};
}

