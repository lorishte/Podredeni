import requesterService from '../requester';
const endPoint = '/products';
const auth = 'admin';

export default {

	loadProducts: (state) => {

		let query =
			'?page=' + state.page +
			'&size=' + state.size +
			'&filterElement=' + state.filterProperty +
			'&filterValue=' + state.filterValue +
			'&sortElement=' + state.sortProperty +
			'&sortDesc=' + state.descending +
			'&includeBlocked=' + true;

		return requesterService
			.get(endPoint, null, query);
	},

	addProduct: (state) => {

		let product = {
			Name: state.name,
			Description: state.description,
			Price: state.price,
			ImageUrls: state.imageUrls,
			IsTopSeller: state.isTopSeller
		};

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

		let product = {
			Name: state.name,
			Description: state.description,
			Price: state.price,
			ImageUrls: state.imageUrls,
			IsTopSeller: state.isTopSeller,
			IsBlocked: state.isBlocked
		};

		return requesterService
			.update(endPointId, auth, product);
	},

	blockProduct: (id) => {
		let endPointId = endPoint + `/${id}`;

		return requesterService
			.remove(endPointId, auth);
	},

	seedProducts: (product) => {

		return requesterService
			.post(endPoint, null, product);
	},
};