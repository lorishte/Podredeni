import $ from 'jquery';

//const host = 'http://localhost:30336/api';
const host = 'http://api.podredeni.eu/api';

let token = () => {
	return localStorage.getItem('token');
};

export default {

	post: (endPoint, auth, data) => {
		let url = host + endPoint;

        return $.ajax(
			{
				url: url,
				type: 'POST',
				headers: {
					// 'Authorization': 'bearer ' + token(),
					'Content-Type': 'application/json'
				},
				data: JSON.stringify(data)
			});
	},

    update: (endPoint, auth, data) => {
        let url = host + endPoint;

        return $.ajax(
            {
                url: url,
                type: 'PUT',
                headers: {
                    // 'Authorization': 'bearer ' + token(),
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            });
    },

	get: (endPoint, auth, query) => {
		let url = query !== undefined ? host + endPoint + query : host + endPoint;

		return $.ajax(
			{
				url: url,
				type: 'GET',
				headers: {
					// 'Authorization': 'bearer ' + token(),
					'Content-Type': 'application/json'
				}
			});
	},

	remove: (endPoint, auth) => {
		let url = host + endPoint;

		return $.ajax(
			{
				url: url,
				type: 'DELETE',
				headers: {
					// 'Authorization': 'bearer ' + token(),
					'Content-Type': 'application/json'
				}
			});
	}
};