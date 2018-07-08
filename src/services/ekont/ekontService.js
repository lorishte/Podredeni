import requesterService from '../requester';

const ekontEndPoint = '/externalApi/getEkontOffices';

export default {

    getOffices: () => {

        return requesterService
            .get(ekontEndPoint);
    }
};

