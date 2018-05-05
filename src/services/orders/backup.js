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
			'&sortelEment=' + state.sortProperty +
			'&sortDesc=' + state.descending;

		return requesterService
			.get(orderEndPoint, null, query);
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
			City: addressDetails.city,
			PostCode: addressDetails.postalCode,
			Street: addressDetails.street,
			StreetNumber: addressDetails.streetNo,
			District: addressDetails.district,
			Block: addressDetails.block,
			Floor: addressDetails.floor,
			Apartment: addressDetails.apartment,
			Comments: comment,
			DeliveredToAnOffice: !toAddress,
			OfficeCode: ekontDetails.officeCode,
			OfficeName: ekontDetails.officeName,
			OfficeCountry: ekontDetails.country,
			OfficeCity: ekontDetails.city,
			OfficeAddress: ekontDetails.address
		};

		return requesterService
			.post(deliveryDataEndPoint, null, details);
	},

	addOrder: (deliveryId, products, quantities) => {
		let order = {
			ProductIds: products,
			Quantities: quantities,
			DeliveryDataId: deliveryId
		};

		return requesterService
			.post(orderEndPoint, null, order)

	}
};
