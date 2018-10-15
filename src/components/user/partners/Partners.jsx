import React from 'react';

import { Grid, Col, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastr';

import partnersService from '../../../services/partners/partnersService';

import PartnerCard from './partials/PartnerCard';

class Partners extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			partners: []
		};
	}

	componentDidMount () {
		this.loadPartners();
		//this.sortPartners();
	}

	loadPartners = () => {
		partnersService.loadGroupedByCity()
			.then(res => {

                let sorted = res.sort((a, b) => b.key === "София" );

				this.setState({partners: sorted});
			})
			.catch(err => {
				this.props.history.push('/error');
			});

	};

	render () {

		let partners;

		if (this.state.partners.length > 0) {
			partners = this.state.partners.map((el, i) => {

				let partnerCards = el.value.map((p, i) => {
					return (<Col key={i} md={3} sm={4} xs={12}>
						<PartnerCard partner={p}/>
					</Col>)
				});

				return (
					<Row key={i}>
						<Col xs={12}>
							<h3 className="city-name">{el.key==='n/a'?'Онлайн':el.key}</h3>
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