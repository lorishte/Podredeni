import React from 'react';

//external components
import { ToastContainer } from 'react-toastr';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//internal components
import FormTextareaField from '../../common/formComponents/FormTextareaField';
import FormInputField from '../../common/formComponents/FormInputField';
import TextEditor from '../../common/textEditor/TextEditor'

//services
import newsService from '../../../services/news/newsService';

//constants
import {
	TOASTR_MESSAGES,
	BUTTONS_BG,
	CREATE_INPUTS,
	RESOLUTIONS
} from '../../../data/constants/componentConstants';

class NewsCreate extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			title: '',
			imageUrl: '',
			content: '',
			resolution: window.innerWidth
		};
	}

	componentDidMount () {
		window.scrollTo(0, 0);
		window.addEventListener('orientationchange', this.handleResolutionChange);
		window.addEventListener('resize', this.handleResolutionChange);
	}

	componentWillUnmount () {
		window.removeEventListener('orientationchange', this.handleResolutionChange);
		window.removeEventListener('resize', this.handleResolutionChange);
	}

	submit = () => {
		newsService.createNews(this.state)
			.then(res => {

				this.toastContainer.success(TOASTR_MESSAGES.successNewsCreate, '', {
					closeButton: false,
				});

				this.setState({
					title: '',
					imageUrl: '',
					content: ''
				});
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

	handleChangeContent = (e) => {
		this.setState({content: e});

		const content = JSON.stringify(e);
		localStorage.setItem('content', content);
	};

	render () {
		let resolution = this.state.resolution < RESOLUTIONS.xs;
		let isAdmin = sessionStorage.getItem('role') === 'admin';

		return (
			<Grid id="news-create">

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				<Row>

					<Col xs={resolution ? 12 : 6} sm={6} md={4}>
						<Image src={this.state.imageUrl}/>
					</Col>

					<Col xs={12} sm={6} md={8}>
						<FormInputField
							type="text"
							label={CREATE_INPUTS.title}
							name="title"
							value={this.state.title}
							required={true}
							onChange={this.handleChange}
							disabled={false}/>


						<TextEditor
							value={this.state.content}
							onChange={this.handleChangeContent}/>


						<FormTextareaField
							label={CREATE_INPUTS.imageUrl}
							name="imageUrl"
							value={this.state.imageUrl}
							required={true}
							onChange={this.handleChange}/>

						<div className="text-center">
							{!isAdmin &&
							<Link className={'btn-custom default md'} to={{pathname: '/news'}}>{BUTTONS_BG.back}</Link>
							}

							{isAdmin &&
							<Link className={'btn btn-default'} to={{pathname: '/news'}}>{BUTTONS_BG.back}</Link>
							}

							<button className="btn btn-primary" onClick={this.submit}>{BUTTONS_BG.create}</button>
						</div>
					</Col>


				</Row>


			</Grid>
		);
	}
}

export default NewsCreate;