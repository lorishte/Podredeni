import React from 'react';
import { ToastContainer } from 'react-toastr';

import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import newsService from '../../../services/news/newsService';

import { RESOLUTIONS } from '../../../data/constants/componentConstants';
import FormTextareaField from "../../common/formComponents/FormTextareaField";
import FormInputField from "../../common/formComponents/FormInputField";

import { TOASTR_MESSAGES, REDIRECT_DELAY } from '../../../data/constants/componentConstants';

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
        window.addEventListener('orientationchange',  this.handleResolutionChange );
        window.addEventListener('resize', this.handleResolutionChange);
    }

    componentWillUnmount () {
        window.removeEventListener('orientationchange', this.handleResolutionChange );
        window.removeEventListener('resize', this.handleResolutionChange);
    }

    submit = () => {
        newsService.createNews(this.state)
            .then(res => {

                this.toastContainer.success(TOASTR_MESSAGES.successNewsCreate, '', {
                    closeButton: false,
                });
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });

    };

    handleResolutionChange = () => {
        this.setState({resolution: window.innerWidth})
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render () {
        let resolution = this.state.resolution < RESOLUTIONS.xs;

        return (
            <Grid id="news">

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

                <Row>
                    <Col xs={resolution ? 12 : 6} sm={6} md={5}>
                        <Image src={this.state.imageUrl}/>
                    </Col>
                    <Col xs={resolution ? 12 : 6} sm={6} md={7}>
                        <FormInputField
                            type="text"
                            label="Заглавие"
                            name="title"
                            value={this.state.title}
                            required={true}
                            onChange={this.handleChange}
                            disabled={false}/>

                        <FormTextareaField
                            label={"Съдържание"}
                            name={"content"}
                            value={this.state.content}
                            required={true}
                            onChange={this.handleChange}/>

                        <FormTextareaField
                            label={"Картинка URL"}
                            name={"imageUrl"}
                            value={this.state.imageUrl}
                            required={true}
                            onChange={this.handleChange}/>
                    </Col>
                </Row>

                <Col xs={12} className="text-center">
                    <Link className={"btn-custom default md"} to={{pathname: '/news'}} > Назад </Link>

                    <Button onClick={this.submit}>Създай</Button>
                </Col>
            </Grid>
        );
    }
}

export default NewsCreate;