import React from 'react';
import { ToastContainer } from 'react-toastr';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//Partials
import FormTextareaField from '../../../../common/formComponents/FormTextareaField';
import FormInputField from '../../../../common/formComponents/FormInputField';

import homeContentService from '../../../../../services/homeContent/homeContentService';

import {
	TOASTR_MESSAGES,
	BUTTONS_BG,
	CREATE_INPUTS,
	RESOLUTIONS
} from '../../../../../data/constants/componentConstants';

class CarouselItemEdit extends React.Component {

	carouselItemId = this.props.match.params.id;

	constructor (props) {
		super(props);

		this.state = {
			heading: '',
			imageUrl: '',
			content: '',
			resolution: window.innerWidth
		};
	}

	componentDidMount () {
		window.scrollTo(0, 0);
		window.addEventListener('orientationchange', this.handleResolutionChange);
		window.addEventListener('resize', this.handleResolutionChange);

		this.loadCarouselItem();
	};

	componentWillUnmount () {
		window.removeEventListener('orientationchange', this.handleResolutionChange);
		window.removeEventListener('resize', this.handleResolutionChange);
	};

	loadCarouselItem = () => {
		homeContentService.loadCarouselItem(this.carouselItemId)
			.then(res => {
				this.setState({
					heading: res.carouselItem.heading,
					imageUrl: res.carouselItem.imageUrl,
					content: res.carouselItem.content
				});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});

	};

	submit = () => {

		homeContentService.editCarouselItem(this.carouselItemId, this.state)
			.then(res => {

				this.toastContainer.success(TOASTR_MESSAGES.successCarouselItemEdit, '', {
					closeButton: false,
				});

				setTimeout(() => this.props.history.goBack(), 3000);
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});

	};

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth});
	};

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	render () {
		let resolution = this.state.resolution < RESOLUTIONS.xs;

		return (
			<Grid id="carouselItem-edit">

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				<Col xs={resolution ? 12 : 6} sm={6} md={5}>
					<Image className="carousel-image" src={this.state.imageUrl}/>

					<FormTextareaField
						label={CREATE_INPUTS.imageUrl}
						name="imageUrl"
						rows={2}
						value={this.state.imageUrl}
						required={true}
						onChange={this.handleChange}
					/>
				</Col>


				<Col xs={resolution ? 12 : 6} sm={6} md={7}>
					<FormInputField
						type="text"
						label={CREATE_INPUTS.title}
						name="heading"
						value={this.state.heading}
						required={true}
						onChange={this.handleChange}
						disabled={false}/>

					<FormTextareaField
						label={CREATE_INPUTS.content}
						name="content"
						value={this.state.content}
						required={true}
						rows={10}
						onChange={this.handleChange}/>
				</Col>

				<Col xs={12} className="text-center buttons-container">
					<Link className='btn btn-default' to='/home-content'>{BUTTONS_BG.back}</Link>

					<button className='btn btn-success' onClick={this.submit}>{BUTTONS_BG.edit}</button>
				</Col>

			</Grid>
		);
	}
}

export default CarouselItemEdit;