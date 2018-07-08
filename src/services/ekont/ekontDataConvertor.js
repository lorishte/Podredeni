import $ from 'jquery';

let countries = {
	BEL: 'Белгия',
	BGR: 'България',
	CYP: 'Кипър',
	CZE: 'Чехия',
	GBR: 'Великобритания',
	GRC: 'Гърция',
	HUN: 'Унгария',
	ROU: 'Румъния',
	SVN: 'Словения'
};

export default {
	transformXml: (xml, lang='') => {

		let xmlDoc = $.parseXML(xml);

		let offices = $(xmlDoc).find('response').find('offices').children();

		let result = {};

		offices.each((i, e) => {
			let current = $(e);

			let countryCode = current.find('country_code').html();
			countryCode = countries[countryCode];
			let city = current.find('city_name' + lang).html();
			let address = current.find('address' + lang).html();
			let officeCode = current.find('office_code').html();
			let officeName = current.find('name' + lang).html();


			if (!result.hasOwnProperty(countryCode)) {
				result[countryCode] = {};
			}

			if (!result[countryCode].hasOwnProperty(city)) {
				result[countryCode][city] = {};
			}

			if (!result[countryCode][city].hasOwnProperty(officeName)) {
				result[countryCode][city][officeName] = {};
			}

			result[countryCode][city][officeName] = {
				officeCode,
				address
			}
		});

		return result;
	}
}

