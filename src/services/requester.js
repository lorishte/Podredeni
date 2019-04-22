import $ from 'jquery';
// const host = 'http://localhost:55516/api';
// const host = 'http://localhost:30337/api';
// const host = 'https://rest.podredeni.eu/api';
// const host = 'https://podredeni.eu/api/api';
const host = 'https://plantit-bg.com/api/api';

let token = () => {
    return sessionStorage.getItem('p_token');
};

export default {

    post: (endPoint, auth, data) => {
        let url = host + endPoint;

        return $.ajax(
            {
                url: url,
                type: 'POST',
                headers: createHeader(auth),
                data: JSON.stringify(data)
            });
    },

    update: (endPoint, auth, data) => {
        let url = host + endPoint;

        return $.ajax(
            {
                url: url,
                type: 'PUT',
                headers: createHeader(auth),
                data: JSON.stringify(data)
            });
    },

    get: (endPoint, auth, query) => {
        let url = query !== undefined ? host + endPoint + query : host + endPoint;

        return $.ajax(
            {
                url: url,
                type: 'GET',
                headers: createHeader(auth)
            });
    },

    remove: (endPoint, auth) => {
        let url = host + endPoint;

        return $.ajax(
            {
                url: url,
                type: 'DELETE',
                headers: createHeader(auth)
            });
    }
};

let createHeader = (auth) => {
    if (auth === null) {
        return {'Content-Type': 'application/json; charset=UTF-8'}
    }

    return {
        'Authorization': 'bearer ' + token(),
        'Content-Type': 'application/json; charset=UTF-8'
    }
};