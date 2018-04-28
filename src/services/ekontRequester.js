import $ from 'jquery'

const host = 'http://demo.econt.com/e-econt/xml_service_tool.php';

const body = `<request>
					<client>
						<username>demo</username>
						<password>demo</password>
						</client>
					<request_type>cities</request_type>
				</request>`;


export default {
	getOffices: () => {
		return $.ajax({
			type: 'POST',
			url: host,
			headers: {
				'Content-Type': 'text/xml'
			},
			data: body
		})
		;
	},
};
