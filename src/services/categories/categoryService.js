import requesterService from '../requester';

const categoryEndPoint = '/category';
const subcategoryEndPoint = '/subcategory';
const auth = 'admin';

export default {

	loadCategories: (state, isSubcategory) => {

		let endPoint = GetEndPoint(isSubcategory);

		if (state === null) {

			endPoint += '/all';

			return requesterService
				.get(endPoint);
		}

		let query =
			'?page=' + state.page +
			'&size=' + state.size +
			'&filterElement=' + state.filterProperty +
			'&filterValue=' + state.filterValue +
			'&sortElement=' + state.sortProperty +
			'&sortDesc=' + state.descending;

		return requesterService
			.get(endPoint, null, query);
	},

	saveUpdatedProductsOrder: (productsIds, categoryId) => {
		let endPoint = categoryEndPoint + '/reorder/' + categoryId;

		let data = {
			IdList: productsIds
		};
		return requesterService
			.update(endPoint, auth, data);
	},

	saveUpdatedCategoryOrder: (categoryIds) => {
		let endPoint = categoryEndPoint + '/reorder';

		let data = {IdList: categoryIds};

		return requesterService
			.update(endPoint, auth, data);
	},

	loadNestedCategories: (state, numberofproducts) => {

		let endPoint = categoryEndPoint + '/all?arenested=true&numberofproducts=' + numberofproducts;

		if (state === null) {

			return requesterService
				.get(endPoint);
		}

		let query =
			'?page=' + state.page +
			'&size=' + state.size +
			'&filterElement=' + state.filterProperty +
			'&filterValue=' + state.filterValue +
			'&sortElement=' + state.sortProperty +
			'&sortDesc=' + state.descending;

		return requesterService
			.get(endPoint, null, query);
	},

	updateCategory: (isSubcategory, categoryId, categoryName) => {

		let endPoint = GetEndPoint(isSubcategory) + '/' + categoryId;

		let categoryDetails = {
			Name: categoryName
		};

		return requesterService
			.update(endPoint, auth, categoryDetails);
	},

	createCategory: (isSubcategory, categoryName) => {

		let endPoint = GetEndPoint(isSubcategory);

		let categoryDetails = {
			Name: categoryName
		};

		return requesterService
			.post(endPoint, auth, categoryDetails);
	},

	deleteCategory: (isSubcategory, categoryId) => {
		let endPointId = GetEndPoint(isSubcategory) + '/' + categoryId;

		return requesterService
			.remove(endPointId);
	}
};

/**
 * @returns {string}
 */
function GetEndPoint (isSubcategory) {

	return isSubcategory ? subcategoryEndPoint : categoryEndPoint;
}


