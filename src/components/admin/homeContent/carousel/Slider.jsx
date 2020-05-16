import React from 'react';
import {Row, Col, Well, ButtonGroup, Button, Grid} from 'react-bootstrap';
import {confirmAlert} from 'react-confirm-alert';
import {ToastContainer} from 'react-toastr';

// Partials
import FormInputField from '../../../common/formComponents/FormInputField';
import TextEditor from "../../../common/textEditor/TextEditor";

// Services
import miscDataService from "../../../../services/miscData/miscDataService";

// Constants
import {BUTTONS_BG, CONFIRM_DIALOGS, TOASTR_MESSAGES} from '../../../../data/constants/componentConstants';


class Slider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sliders: [],

            loading: true
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {

        miscDataService
            .loadMiscData('homeSliders')
            .then(res => {

                let data = JSON.parse(res);

                this.setState({
                    sliders: data,
                    loading: false
                })
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    }


    handleInputsChange = (e) => {
        this.changeState(e.target.value, e.target.name)
    };

    changeIsVisible = (sectionName, isVisible) => {
        this.changeState(!isVisible, sectionName)
    }

    changeState = (value, name) => {


        let { sliderId, property} = this.generateKVP(name)

        let obj = {};

        // add new value
        // make state key copy
        obj = Object.assign([], this.state.sliders);

        obj.forEach(slider => {
            if (slider._id === Number(sliderId)) {
                slider[property] = value;
            }
        })

        this.setState({sliders: obj});
    }

    generateKVP = (inputName) => {

        let info = inputName.split('-');

        let sliderId = info[0];
        let property = info[1];

        return { sliderId: sliderId, property: property};
    }

    addSlide = () => {

        let id = new Date().valueOf();

        let newElement = {
            _id: id,
            imageUrl: '',
            heading: '',
            text: '',
            buttonLink: '',
            buttonText: BUTTONS_BG.seeMore,
            isVisible: false
        }

        this.setState({sliders: [...this.state.sliders, newElement]})
    }

    moveSlide = (direction, id) => {

        let arr = Object.assign([], this.state.sliders);

        let oldIndex = arr.findIndex(e => e._id === id);

        let element = arr[oldIndex];

        arr.splice(oldIndex, 1);

        let newIndex;

        if (direction === 'down') {
            newIndex = oldIndex + 1;
        } else {
            newIndex = oldIndex - 1;
        }

        if (newIndex > arr.length || newIndex < 0) return

        arr.splice(newIndex, 0, element);

        this.setState({sliders: arr})
    }

    deleteSlide = (id) => {

        confirmAlert({
            title: '',
            message: CONFIRM_DIALOGS.deleteSection,
            buttons: [{
                label: BUTTONS_BG.yes,
                onClick: () => this.setState({sliders: this.state.sliders.filter(e => e._id !== id)})
            },
                {label: BUTTONS_BG.no}]
        });
    }

    saveChanges = () => {

        const data = JSON.stringify(this.state.sliders);

        console.log(data)

        miscDataService
            .updateMiscData('homeSliders', data)
            .then(res => {

                this.toastContainer.success(TOASTR_MESSAGES.successEdit, '', {
                    closeButton: false,
                });

            })
            .catch(err => {

                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });

            });
    }

    render() {

        if (this.state.loading) return <div className={'admin-loader'}/>

        let sliders = [];

        sliders = this.state.sliders.map(slider => {

            let id = slider._id;

            let inputName = id + '-';

            let style = slider.isVisible ? 'success' : 'default';

            return (
                <Well key={'slider_' + id}>

                    <ButtonGroup>
                        <Button bsStyle={style}
                                onClick={() => this.changeIsVisible(inputName + 'isVisible', slider.isVisible)}>
                            {slider.isVisible && <i className="fa fa-eye" aria-hidden="true"/>}
                            {!slider.isVisible && <i className="fa fa-eye-slash" aria-hidden="true"/>}

                        </Button>
                        <Button bsStyle="primary"
                                onClick={() => this.moveSlide('down', id)}>
                            <i className="fa fa-arrow-down" aria-hidden="true"/>
                        </Button>
                        <Button bsStyle="primary"
                                onClick={() => this.moveSlide('up', id)}>
                            <i className="fa fa-arrow-up" aria-hidden="true"/>
                        </Button>
                        <Button bsStyle="danger"
                                onClick={() => this.deleteSlide(id)}>
                            <i className="fa fa-trash" aria-hidden="true"/>
                        </Button>
                    </ButtonGroup>


                    <Row>
                        <Col xs={12} md={6} mdPush={6}>
                            <img src={'/images/slider/' + slider.imageUrl}/>
                        </Col>

                        <Col xs={12} md={6} mdPull={6}>
                            <FormInputField
                                type='text'
                                name={inputName + 'heading'}
                                label='Заглавие'
                                value={slider.heading}
                                required={true}
                                disabled={false}
                                onChange={this.handleInputsChange}
                            />

                            <FormInputField
                                type='text'
                                name={inputName + 'text'}
                                label='Текст'
                                value={slider.text}
                                required={false}
                                disabled={false}
                                onChange={this.handleInputsChange}
                            />

                            <FormInputField
                                type='text'
                                name={inputName + 'imageUrl'}
                                label='Снимка'
                                value={slider.imageUrl}
                                required={true}
                                disabled={false}
                                onChange={this.handleInputsChange}
                            />

                            <FormInputField
                                type='text'
                                name={inputName + 'buttonLink'}
                                label='Линк към страница'
                                value={slider.buttonLink}
                                required={false}
                                disabled={false}
                                onChange={this.handleInputsChange}
                            />

                            <FormInputField
                                type='text'
                                name={inputName + 'buttonText'}
                                label='Текст на бутона'
                                value={slider.buttonText}
                                required={false}
                                disabled={false}
                                onChange={this.handleInputsChange}
                            />

                        </Col>

                    </Row>
                </Well>
            )
        })


        return (

            <div>

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />


                {sliders}

                <div className="text-center buttons-container">
                    <button className="btn btn-primary"
                            onClick={this.addSlide}>{BUTTONS_BG.addSlide}</button>
                    <button className="btn btn-success"
                            onClick={this.saveChanges}>{BUTTONS_BG.saveChanges}</button>
                </div>

            </div>

        );
    }

}


export default Slider;

