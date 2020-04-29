import requesterService from '../requester';

const miscDataEndPoint = '/miscData';
const auth = 'admin';

export default {

    loadMiscData: (key) => {

        let endPoint = miscDataEndPoint + '?key=' + key;

        return requesterService.get(endPoint);

    },

    updateMiscData: (key, value) => {

        let endPointKey = miscDataEndPoint + '/' + key;

        return requesterService
            .update(endPointKey, auth, value);
    },

    createMiscData: (key, value) => {

        let miscData = generateMiscData(key, value);

        return requesterService
            .post(miscDataEndPoint, auth, miscData);
    },
};

function generateMiscData (key, value) {

    return {
        Key: key,
        Value: value
    }
}

