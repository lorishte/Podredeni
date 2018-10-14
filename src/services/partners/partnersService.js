import requesterService from '../requester';
const endPoint = '/partners';
const auth = 'admin';

export default {

    load: (partnerId) => {

        let url = partnerId ? endPoint + '/' + partnerId : endPoint;

        return requesterService.get(url, null);
    },

    create: (state) => {

        let data = generatePartnerData(state);

        console.log(data)

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
};

function generatePartnerData(state) {

    return {
        Name: state.name,
        LogoUrl: state.logoUrl,
        WebUrl: state.webUrl,
        Category: state.category,
        Addresses: state.addresses
    };
}
