import React from 'react';

import { Grid, Col, Clearfix } from 'react-bootstrap';

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
			resolution: window.innerWidth
		};
	}

	componentDidMount () {
		this.loadPartners();
		this.calculateCardsOnRow();
		window.addEventListener('resize', this.handleResolutionChange);
		window.addEventListener('orientationchange', this.handleResolutionChange);
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this.handleResolutionChange);
		window.removeEventListener('orientationchange', this.handleResolutionChange);
	}

	calculateCardsOnRow = () => {

		let resolution = this.state.resolution;

		if (resolution < RESOLUTIONS.bootstrapXS) {
			if (resolution < RESOLUTIONS.xs) {
				this.setState({cardsToDisplayOnRow: 1});
			} else {
				this.setState({cardsToDisplayOnRow: 2});
			}

		} else if (resolution < RESOLUTIONS.bootstrapSM) {
			this.setState({cardsToDisplayOnRow: 2});
		} else if (resolution < RESOLUTIONS.bootstrapMD) {
			this.setState({cardsToDisplayOnRow: 3});
		} else {
			this.setState({cardsToDisplayOnRow: 4});
		}
	};

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth}, () => {
			this.calculateCardsOnRow();
		});
	};

	loadPartners = () => {
		partnersService.loadGroupedByCity()
			.then(res => {

				let sofiaCity = res.filter((a) => a.key === 'София');
				let otherCities = res.filter((a) => a.key !== 'София');
				let ordered = [];

				ordered.push(sofiaCity[0]);

				otherCities.forEach(e => {
					ordered.push(e);
				});

				this.setState({partners: ordered});
			})
			.catch(err => {
				this.props.history.push('/error');
			});
	};

	render () {

		let partners;
		let cardsOnRow = this.state.cardsToDisplayOnRow;

		let resolution = this.state.resolution < RESOLUTIONS.xs;

		if (this.state.partners.length > 0) {
			partners = this.state.partners.map((el, i) => {

				let resultsRender = [];

				let partnerCards = el.value.map(p => {
					return (
						<Col key={p.id} lg={3} md={4} sm={6} xs={resolution ? 12 : 6}>
							<PartnerCard partner={p}/>
						</Col>);
				});

				for (let j = 1; j <= partnerCards.length; j++) {
					resultsRender.push(partnerCards[j - 1]);

					if (j % cardsOnRow === 0) {
						resultsRender.push(<Clearfix key={j}/>);
					}
				}

				return (

					<Col key={i} xs={12}>
						<h4 className="city-name">{el.key === 'n/a' ? 'Онлайн' : el.key}</h4>
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