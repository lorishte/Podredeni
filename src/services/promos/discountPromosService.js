import requesterService from '../requester';
const endPoint = '/promoDiscounts';
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

	return {
		Name: state.name,
		Discount: state.discount,
		StartDate: state.startDate,
		EndDate: state.endDate
	};
}

