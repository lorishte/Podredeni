import requesterService from '../requester';
const deliveryDataEndPoint = '/deliveryData';
const orderEndPoint = '/orders';

export default {

	loadOrders: (state) => {

		let query =
			'?page=' + state.page +
			'&size=' + state.size +
			'&filterElement=' + state.filterProperty +
			'&filterValue=' + state.filterValue +
			'&sortElement=' + state.sortProperty +
			'&sortDesc=' + state.descending;

		return requesterService
			.get(orderEndPoint, null, query);
	},

	loadOrder: (orderId) => {

		let endPoint = orderEndPoint + '/' + orderId;

		return requesterService.get(endPoint, null);

	},

	loadOrderLog: (orderId) => {

		let endPoint = orderEndPoint + '/logs/' + orderId;

		return requesterService
			.get(endPoint, null, '');
	},

	loadDeliveryData: (deliveryDataId) => {

		let endPoint = deliveryDataEndPoint + '/' + deliveryDataId;

        return requesterService
			.get(endPoint, null)
	},

	editDeliveryData: (deliveryDataId, data) => {

        let recipientInfo = data.recipientInfo;
        let ekontDetails = data.ekontDetails;
        let addressDetails = data.addressDetails;
        let comment = data.comment;
        let toAddress = data.toAddress;

        let details = {
            CustomerName: recipientInfo.firstName+ ' ' + recipientInfo.lastName,
            PhoneNumber: recipientInfo.phone,
            Email: recipientInfo.email,
			Country: addressDetails.country,
            City: addressDetails.city,
            PostCode: addressDetails.postalCode,
            Street: addressDetails.street,
            StreetNumber: addressDetails.streetNo,
            District: addressDetails.district,
            Block: addressDetails.block,
            Entrance: addressDetails.entrance,
            Floor: addressDetails.floor,
            Apartment: addressDetails.apartment,
            Comments: comment,
            DeliveredToAnOffice: !toAddress,
            OfficeAddress: ekontDetails.address,
            OfficeCode: ekontDetails.officeCode,
            OfficeName: ekontDetails.officeName,
            OfficeCountry: ekontDetails.country,
            OfficeCity: ekontDetails.city
        };

        let endPoint = deliveryDataEndPoint + '/' + deliveryDataId;

        return requesterService
            .update(endPoint, null, details);
	},

	addDeliveryData: (data) => {

        let recipientInfo = data.recipientInfo;
		let ekontDetails = data.ekontDetails;
		let addressDetails = data.addressDetails;
		let comment = data.comment;
		let toAddress = data.toAddress;

		let details = {
			CustomerName: recipientInfo.firstName+ ' ' + recipientInfo.lastName,
			PhoneNumber: recipientInfo.phone,
			Email: recipientInfo.email,
			Country: addressDetails.country,
			City: addressDetails.city,
			PostCode: addressDetails.postalCode,
			Street: addressDetails.street,
			StreetNumber: addressDetails.streetNo,
			District: addressDetails.district,
			Block: addressDetails.block,
			Entrance: addressDetails.entrance,
			Floor: addressDetails.floor,
			Apartment: addressDetails.apartment,
			Comments: comment,
			DeliveredToAnOffice: !toAddress,
			OfficeAddress: ekontDetails.address,
			OfficeCode: ekontDetails.officeCode,
			OfficeName: ekontDetails.officeName,
			OfficeCountry: ekontDetails.country,
			OfficeCity: ekontDetails.city
		};

		return requesterService
			.post(deliveryDataEndPoint, null, details);
	},

	addOrder: (deliveryId, products) => {
		let order = {
			Products: products,
			DeliveryDataId: deliveryId
		};

		return requesterService
			.post(orderEndPoint, null, order)

	},

	editOrder: (orderId, products) => {

		let order = {
            Products: products
		};

		let endPoint = orderEndPoint + '/' + orderId;

		return requesterService.update(endPoint, null, order);
	}


};

function generateEkontData (ekontDetails) {
	let ekontOffice = 'офис No: ' + ekontDetails.officeCode + ',' + ekontDetails.officeName + '\n';
	let ekontAddress = 'адрес: ' + ekontDetails.country + ',' + ekontDetails.address;

	return ekontOffice + ekontAddress;
}
