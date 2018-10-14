import React from 'react';

import { Grid, Col } from 'react-bootstrap';
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
	}

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
			partners = this.state.partners.map((p, i) => {
				console.log(p)
				return (
					<Col key={i} sm={3} xs={6}>
						<PartnerCard partner={p}/>
					</Col>);
			});
		}

		return (
			<Grid id="partners">
				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				{this.state.partners.length === 0 && <div className="loader"/> }

				{partners}
			</Grid>
		);
	}
}

export default Partners;