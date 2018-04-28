import $ from 'jquery';

export default {
	transformXml: (xml, lang='') => {

		let offices = $(xml).find('response').find('offices').children();

		let result = {};

		offices.each((i, e) => {
			let current = $(e);

			let countryCode = current.find('country_code').html();
			let city = current.find('city_name' + lang).html();
			let address = current.find('address' + lang).html();
			let officeCode = current.find('office_code').html();
			let officeName = current.find('name' + lang).html();


			if (!result.hasOwnProperty(countryCode)) {
				result[countryCode] = {};
			}

			if (!result[countryCode].hasOwnProperty(city)) {
				result[countryCode][city] = [];
			}

			result[countryCode][city].push({
				officeCode,
				officeName,
				address
			})
		});

		return result;
	}
}