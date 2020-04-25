import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Well, ButtonGroup, Button} from 'react-bootstrap';
import {confirmAlert} from 'react-confirm-alert';

// Partials
import FormInputField from '../../../common/formComponents/FormInputField';
import TextEditor from "../../../common/textEditor/TextEditor";

// Services
import homeContentService from "../../../../services/homeContent/homeContentService";

// Constants
import {BUTTONS_BG, CONFIRM_DIALOGS, TOASTR_MESSAGES} from '../../../../data/constants/componentConstants';
import {teasersText, aboutText} from '../../../../data/teasers';


class AboutTeasers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            aboutText,
            teasersText: teasersText
        };
    }

    componentDidMount() {

        this.loadData();
    }

    loadData = () => {
        homeContentService
            .modifyArticle(this.state)
            .then(res => {
                this.toastContainer.success(TOASTR_MESSAGES.successHomeContentModification, '', {
                    closeButton: false,
                });
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
        console.log(sectionName, isVisible)
        this.changeState(!isVisible, sectionName)
    }

    changeState = (value, name) => {

        let {stateProp, key, key2} = this.generateKVP(name)

        let obj = {};

        // add new value
        if (stateProp === 'teasersText') {

            // make state key copy
            obj = Object.assign([], this.state[stateProp]);

            obj.forEach(teaser => {
                if (teaser._id === Number(key)) {
                    teaser[key2] = value;
                }
            })

        }

        if (stateProp === 'aboutText') {
            // make state key copy
            obj = Object.assign({}, this.state[stateProp]);

            // assign new value
            obj[key] = value;
        }

        this.setState({[stateProp]: obj});
    }

    generateKVP = (inputName) => {

        let info = inputName.split('-');

        let stateProp = info[0];
        let key = info[1];
        let key2 = info[2];

        return {stateProp, key, key2};
    }

    addSection = () => {

        let sequenceNumber = this.state.teasersText.length + 1;

        let newElement = {
            _id: sequenceNumber,
            imageUrl: '',
            heading: '',
            text: '',
            buttonLink: '',
            isVisible: false
        }

        this.setState({teasersText: [...this.state.teasersText, newElement]})
    }

    moveSection = (direction, id) => {

        let arr = Object.assign([], this.state.teasersText);

        let oldIndex = arr.findIndex(t => t._id === id);

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

        this.setState({teasersText: arr})
    }

    deleteSection = (id) => {

        confirmAlert({
            title: '',
            message: CONFIRM_DIALOGS.deleteCarouselItem,
            buttons: [{
                label: BUTTONS_BG.yes,
                onClick: () => this.setState({teasersText: this.state.teasersText.filter(e => e._id !== id)})
            },
                {label: BUTTONS_BG.no}]
        });
    }

    saveChanges = () => {

        alert('Saving')

        const data = JSON.stringify(this.state);

        homeContentService
            .saveTeasersChanges(data)
            .then(res => {
                this.toastContainer.success(TOASTR_MESSAGES.successHomeContentModification, '', {
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


        let sections = this.state.teasersText.map(teaser => {

            let id = teaser._id;

            let inputName = 'teasersText-' + id + '-';

            let style = teaser.isVisible ? 'success' : 'default';

            return (
                <Well key={'teaser_' + id}>

                    <ButtonGroup>
                        <Button bsStyle={style}
                                onClick={() => this.changeIsVisible(inputName + 'isVisible', teaser.isVisible)}>
                            {teaser.isVisible && <i className="fa fa-eye" aria-hidden="true"/>}
                            {!teaser.isVisible && <i className="fa fa-eye-slash" aria-hidden="true"/>}

                        </Button>
                        <Button bsStyle="primary"
                                onClick={() => this.moveSection('down', id)}>
                            <i className="fa fa-arrow-down" aria-hidden="true"/>
                        </Button>
                        <Button bsStyle="primary"
                                onClick={() => this.moveSection('up', id)}>
                            <i className="fa fa-arrow-up" aria-hidden="true"/>
                        </Button>
                        <Button bsStyle="danger"
                                onClick={() => this.deleteSection(id)}>
                            <i className="fa fa-trash" aria-hidden="true"/>
                        </Button>
                    </ButtonGroup>


                    <Row>


                        <Col xs={8}>
                            <FormInputField
                                type='text'
                                name={inputName + 'heading'}
                                label='Заглавие на секция'
                                value={teaser.heading}
                                required={true}
                                disabled={false}
                                onChange={this.handleInputsChange}
                            />

                            <FormInputField
                                type='text'
                                name={inputName + 'imageUrl'}
                                label='Снимка'
                                value={teaser.imageUrl}
                                required={true}
                                disabled={false}
                                onChange={this.handleInputsChange}
                            />

                            <FormInputField
                                type='text'
                                name={inputName + 'buttonLink'}
                                label='Линк за бутона'
                                value={teaser.buttonLink}
                                required={false}
                                disabled={false}
                                onChange={this.handleInputsChange}
                            />

                            <TextEditor
                                name={inputName + 'text'}
                                value={teaser.text}
                                onChange={this.changeState}
                            />
                        </Col>

                        <Col xs={4}>
                            <img src={teaser.imageUrl}/>
                        </Col>

                    </Row>
                </Well>


            )
        })

        return (

            <div>
                <Well>
                    <FormInputField
                        type='text'
                        name='aboutText-heading'
                        label='Заглавие на секция'
                        value={this.state.aboutText.heading}
                        required={true}
                        disabled={false}
                        onChange={this.handleInputsChange}
                    />

                    <TextEditor
                        name={'aboutText-text'}
                        value={this.state.aboutText.text}
                        onChange={this.changeState}
                    />
                </Well>

                {sections}

                <div className="text-center buttons-container">
                    <button className="btn btn-primary"
                            onClick={this.addSection}>{BUTTONS_BG.addSection}</button>
                    <button className="btn btn-success"
                            onClick={this.saveChanges}>{BUTTONS_BG.saveChanges}</button>
                </div>

            </div>

        );
    }

}


export default AboutTeasers;

AboutTeasers.propTypes = {
    saveChanges: PropTypes.func
}