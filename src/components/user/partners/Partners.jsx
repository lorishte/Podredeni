import React from 'react';

import { Grid, Col, Row, Clearfix } from 'react-bootstrap';

import { ToastContainer } from 'react-toastr';

import partnersService from '../../../services/partners/partnersService';

import PartnerCard from './partials/PartnerCard';

import { RESOLUTIONS } from '../../../data/constants/componentConstants';

class Partners extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			partners: [],
			cardsToDisplayOnRow: 0,
		};
	}

	componentDidMount () {
		this.loadPartners();
		this.calculateCardsOnRow();
		window.addEventListener('resize', this.calculateCardsOnRow);
		window.addEventListener('orientationchange', this.calculateCardsOnRow);
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this.calculateCardsOnRow);
		window.removeEventListener('orientationchange', this.calculateCardsOnRow);
	}

	calculateCardsOnRow = () => {
		if (window.innerWidth < RESOLUTIONS.bootstrapXS) {
			this.setState({cardsToDisplayOnRow: 2});
		} else if (window.innerWidth < RESOLUTIONS.bootstrapSM) {
			this.setState({cardsToDisplayOnRow: 3});
		} else {
			this.setState({cardsToDisplayOnRow: 4});
		}
	};

	loadPartners = () => {
		partnersService.loadGroupedByCity()
			.then(res => {

				let sorted = res.sort((a, b) => b.key === 'София');

				this.setState({partners: sorted});
			})
			.catch(err => {
				this.props.history.push('/error');
			});
	};

	render () {

		let partners;
		let cartsOnRow = this.state.cardsToDisplayOnRow;

		if (this.state.partners.length > 0) {
			partners = this.state.partners.map((el, i) => {

				let resultsRender = [];

				let partnerCards = el.value.map(p => {
					return (
						<Col key={p.id} md={3} sm={4} xs={6}>
							<PartnerCard partner={p}/>
						</Col>);
				});

				for (let j = 1; j <= partnerCards.length; j++) {
					resultsRender.push(partnerCards[j - 1]);

					if (j % cartsOnRow === 0) {
						resultsRender.push(<Clearfix key={j}/>);
					}
				}

				return (

					<Col key={i} xs={12}>
						<h3 className="city-name">{el.key === 'n/a' ? 'Онлайн' : el.key}</h3>
						<hr/>

						{resultsRender}
					</Col>

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