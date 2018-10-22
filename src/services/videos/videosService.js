import requesterService from '../requester';
const endPoint = '/videos';
const auth = 'admin';

export default {

    loadAll: () => {

        return requesterService
            .get(endPoint);
    },

    create: (url, description) => {

        let data =  {
            url: url,
            description: description
        };

        return requesterService.post(endPoint, auth, data);
    },

    delete: (id) => {

        let url = endPoint + '/' + id;

        return requesterService.remove(url, auth);
    },

    saveNewOrder: (orderedIds) => {

      let url = endPoint + '/reorder';

      return requesterService.post(url, auth, orderedIds)
    }
};
