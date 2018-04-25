const host = 'http://localhost:5000/'

let token = () => {
    return localStorage.getItem('token')
}

export default {
    register: (data) => {
        return fetch(host + 'auth/signup',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                return response.json()
            })
    },

    login: (data) => {
        return fetch(host + 'auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                return response.json()
            })
    },

    loadAllHotels: (page) => {
        return fetch(host + 'hotels/all?page=' + page,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                return response.json()
            })
    },

    createHotel: (data) => {
        return fetch(host + 'hotels/create/',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'bearer ' + token(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                return response.json()
            })
    },

    getHotelDetails: (hotelId) => {
        return fetch(host + 'hotels/details/' + hotelId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + token(),
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                return response.json()
            })
    },

    getHotelComments: (hotelId) => {
        return fetch(host + 'hotels/details/' + hotelId + '/reviews',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + token(),
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                return response.json()
            })
    },

    addComment: (data) => {
        return fetch(host + 'hotels/details/' + data.hotelId + '/reviews/create',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'bearer ' + token(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                return response.json()
            })
    },

    deleteHotel: (hotelId) => {
        return fetch(host + `hotels/${hotelId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'bearer ' + token(),
                    'Content-Type': 'application/json'
                }
            })
    }
}