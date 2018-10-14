import React from 'react';

import { Grid, Col, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastr';

import partnersService from '../../../services/partners/partnersService';

import PartnerCard from './partials/PartnerCard';

let PARTNERS = [
	{
		city: 'Варна',
		partners: [
			{
				name: 'оптики Леонардо',
				webUrl: '',
				logoUrl: 'https://optika-deizi.com/wp-content/uploads/2016/04/oie_transparent-15.png',
				category: 'optics',
				addresses: [
					{
						city: 'Варна',
						address: 'бул. Възкресение 28'
					}
				]
			},
			{
				name: 'тестваме само',
				webUrl: '',
				logoUrl: '',
				category: 'others',
				addresses: [
					{
						city: 'Варна',
						address: 'бул. Скобелев 1А'
					}
				]
			}
		]
	},

	{
		city: 'София',
		partners: [
			{
				name: 'оптики Леонардо',
				webUrl: '',
				logoUrl: '',
				category: 'optics',
				addresses: [
					{
						city: 'София',
						address: 'бул. Витоша 1А'
					},
					{
						city: 'София',
						address: 'ул. Позитано 22'
					}
				]
			},
			{
				name: 'оприки JOY',
				webUrl: '',
				logoUrl: '',
				category: 'optics',
				addresses: [
					{
						city: 'София',
						address: 'бул. Витоша 1А'
					}
				]
			},
			{
				name: 'голяма риба съм',
				webUrl: '',
				logoUrl: '',
				category: 'fishing',
				addresses: [
					{
						city: 'София',
						address: 'бул. Витоша 1А'
					}
				]
			}
		]
	},
	{
		city: 'Велико Търново',
		partners: [
			{
				name: 'тестваме само',
				webUrl: '',
				logoUrl: 'https://vox.bg/img/клиенти/07_Оптики_Leonardo.jpg',
				category: 'others',
				addresses: [
					{
						city: 'Велико Търново',
						address: 'бул. Скобелев 1А'
					}
				]
			}
		]
	},

	{
		city: 'n/a',
		partners: [
			{
				name: 'GSM магазин',
				webUrl: '',
				logoUrl: '',
				category: 'gsm',
				addresses: []
			}
		]
	}
];

class Partners extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			partners: []
		};
	}

	componentDidMount () {
		// this.loadPartners();
		this.sortPartners();
	}

	sortPartners = () => {
		let sorted = PARTNERS.sort((a, b) => b.city === "София" );
		this.setState({partners: sorted})
	};

	loadPartners = () => {
		partnersService.load()
			.then(res => {
				this.setState({partners: res});
			})
			.catch(err => {
				this.props.history.push('/error');
			});

	};

	render () {

		let partners;

		if (this.state.partners.length > 0) {
			partners = this.state.partners.map((el, i) => {

				let partnerCards = el.partners.map((p, i) => {
					return (<Col key={i} md={3} sm={4} xs={12}>
						<PartnerCard partner={p}/>
					</Col>)
				});

				return (
					<Row key={i}>
						<Col xs={12}>
							<h3 className="city-name">{el.city}</h3>
							<hr/>
						</Col>

						{partnerCards}
					</Row>
				);
			});
		}

		return (
			<Grid id="partners">
				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				{partners}
			</Grid>
		);
	}
}

export default Partners;