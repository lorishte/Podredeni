import requesterService from '../requester';
const endPoint = '/promoDiscounts';
const auth = 'admin';

export default {

    loadPromos: () => {

        return requesterService
            .get(endPoint, auth);
    },

};

