import requesterService from '../requester';
const endPoint = '/products';

export default {

	loadProducts: (state) => {

		let query =
			'?page=' + state.page +
			'&size=' + state.size +
			'&filterElement=' + state.filterProperty +
			'&filterValue=' + state.filterValue +
			'&sortelEment=' + state.sortProperty +
			'&sortDesc=' + state.descending;

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
			.post(endPoint, null, product);
	},

	getProduct: (id) => {
		console.log(id);
		let endPointId = endPoint + `/${id}`;

		console.log(endPointId);

		return requesterService
			.get(endPointId, null);
	},

	updateProduct: (state) => {
		let endPointId = endPoint + `/${state.id}`;

		let product = {
			Name: state.name,
			Description: state.description,
			Price: state.price,
			ImageUrls: state.imageUrls,
			IsTopSeller: state.isTopSeller
		};

		return requesterService
			.put(endPointId, null, product);
	},

	blockProduct: (id) => {
		let endPointId = endPoint + `/${id}`;

		return requesterService
			.remove(endPointId, null);
	},
};