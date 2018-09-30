import requesterService from '../requester';
const endPoint = '/videos';
const auth = 'admin';

export default {

    loadAll: () => {

        return requesterService
            .get(endPoint);
    }
};
