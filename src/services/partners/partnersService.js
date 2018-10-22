import requesterService from '../requester';
const endPoint = '/partners';
const auth = 'admin';

export default {

    load: (partnerId) => {

        let url = partnerId ? endPoint + '/' + partnerId : endPoint;

        return requesterService.get(url, null);
    },

    loadGroupedByCity: () => {

        let url = endPoint + '/groupedbycity';

        return requesterService.get(url, null);
    },

    create: (state) => {

        let data = generatePartnerData(state);

        return requesterService.post(endPoint, auth, data);

    },

    edit: (partnerId, state) => {

        let url = endPoint + '/' + partnerId;

        let data = generatePartnerData(state);

        return requesterService.update(url, auth, data);
    },

    delete: (partnerId) => {

        let url = endPoint + '/' + partnerId;

        return requesterService.remove(url, auth);
    },


    saveNewOrder: (orderedIds) => {

        let url = endPoint + '/reorder';

        return requesterService.post(url, auth, orderedIds)
    }

};

function generatePartnerData(state) {

    return {
        Name: state.name,
        LogoUrl: state.logoUrl,
        WebUrl: state.webUrl,
        Category: state.category,
        PartnerLocations: state.addresses
    };
}
