import requesterService from '../requester';

import utils from '../../utils/utils';

const deliveryDataEndPoint = '/deliveryData';
const orderEndPoint = '/orders';
const auth = 'admin';

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
			.get(orderEndPoint, auth, query);
	},

	loadOrder: (orderId) => {

		let endPoint = orderEndPoint + '/' + orderId;

		return requesterService.get(endPoint, auth);

	},

	loadOrderLog: (orderId) => {

		let endPoint = orderEndPoint + '/logs/' + orderId;

		return requesterService
			.get(endPoint, auth, '');
	},

	loadDeliveryData: (deliveryDataId) => {

		let endPoint = deliveryDataEndPoint + '/' + deliveryDataId;

		return requesterService
			.get(endPoint, auth);
	},

	editDeliveryData: (deliveryDataId, data) => {

		let details = generateDeliveryDetailsData(data);

		let endPoint = deliveryDataEndPoint + '/' + deliveryDataId;

		return requesterService
			.update(endPoint, auth, details);
	},

	addDeliveryData: (data) => {

		let details = generateDeliveryDetailsData(data);

		return requesterService
			.post(deliveryDataEndPoint, null, details);
	},

	addOrder: (deliveryId, products, promoCode) => {

		let productsForSubmit = generateProductsData(products);

		let order = {
			Products: productsForSubmit,
			DeliveryDataId: deliveryId,
			PromoCode: promoCode
		};

		return requesterService.post(orderEndPoint, null, order);

	},

	editOrder: (orderId, products) => {

		let order = {
			Products: products
		};

		let endPoint = orderEndPoint + '/' + orderId;

		return requesterService.update(endPoint, auth, order);
	},

	changeStatus: (orderId, status) => {

		let endpoint = orderEndPoint + '/' + status + '/' + orderId;

		return requesterService.post(endpoint, auth);
	}
};

function generateProductsData (products) {
	return products.map(e => {
			return {
				Id: e.id,
				Quantity: e.quantity,
				Price: e.price,
				Discount: e.discount
			};
		}
	);
}

function generateDeliveryDetailsData (data) {

	let recipientInfo = data.recipientInfo;
	let ekontDetails = data.ekontDetails;
	let addressDetails = data.addressDetails;
	let comment = data.comment;
	let toAddress = data.toAddress;

	for (let el in recipientInfo) {
		recipientInfo[el] = recipientInfo[el].trim();
	}

	return {
		CustomerName: recipientInfo.firstName,
		CustomerLastName: recipientInfo.lastName,
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
}
