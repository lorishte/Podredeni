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

	loadDeliveryData: (deliveryDataId) => {

		let endPoint = deliveryDataEndPoint + '/' + deliveryDataId;

        console.log(endPoint);

        return requesterService
			.get(endPoint, null)
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
			OfficeAddress: generateEkontData(ekontDetails)
		};

		return requesterService
			.post(deliveryDataEndPoint, null, details);
	},

	addOrder: (deliveryId, products) => {
		let order = {
			Products: products,
			DeliveryDataId: deliveryId
		};

		console.log(order)
		return requesterService
			.post(orderEndPoint, null, order)

	}
};

function generateEkontData (ekontDetails) {
	let ekontOffice = 'офис No: ' + ekontDetails.officeCode + ',' + ekontDetails.officeName + '\n';
	let ekontAddress = 'адрес: ' + ekontDetails.country + ',' + ekontDetails.address;

	return ekontOffice + ekontAddress;
}
