import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Well} from 'react-bootstrap'


// Partials
import FormInputField from '../../../common/formComponents/FormInputField';
import TextEditor from "../../../common/textEditor/TextEditor";


// Constants
import {BUTTONS_BG} from '../../../../data/constants/componentConstants';
import {teasersText, aboutText} from '../../../../data/teasers';


class ArticleManageNew extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            aboutText,
            teasersText
        };
    }


    handleInputsChange = (e) => {

        this.changeState(e.target.value, e.target.name)

    };

    addSection = () => {

        let newElement = {
            imageUrl: '',
            heading: '',
            text: '',
            buttonLink: ''
        }

        let sequenceNumber = Object.keys(this.state.teasersText).length + 1;

        this.changeState(newElement, 'teasersText-' + sequenceNumber)
    }


    changeState = (value, name) => {

        let {stateProp, key, id} = this.generateKVP(name)

        console.log(value, name)

        // make state key copy
        let obj = Object.assign({}, this.state[stateProp]);

        // add new value
        if (id) {
            obj[key][id] = value;
        } else {
            obj[key] = value;
        }

        this.setState({[stateProp]: obj});
    }

    generateKVP = (inputName) => {

        let info = inputName.split('-');

        let stateProp = info[0];
        let key = info[1];
        let id = info[2];

        return {stateProp, key, id};
    }

    sortSections = () => {
        let sorted = [];

        for (const key in this.state.teasersText) {

        }
    }

    render() {


        let sorted = Object.assign([], this.state.teasersText).sort((a, b) => a.orderNumber - b.orderNumber);

        let teasers = Object.assign({}, sorted);

        console.log(teasers)

        let sections = Object.keys(teasers).map(index => {

            let teaser = teasers[index];

            let inputName = 'teasersText-' + index;

            return (
                <Well>
                    <Row key={'teaser_' + index}>


                        <Col xs={8}>
                            <FormInputField
                                type='text'
                                name={inputName}
                                label='Заглавие на секция'
                                value={teaser.heading}
                                required={true}
                                disabled={false}
                                onChange={this.handleInputsChange}
                            />

                            <FormInputField
                                type='text'
                                name={inputName}
                                label='Номер'
                                value={teaser.orderNumber}
                                required={true}
                                disabled={false}
                                onChange={this.handleInputsChange}
                            />

                            <FormInputField
                                type='text'
                                name={inputName}
                                label='Снимка'
                                value={teaser.imageUrl}
                                required={true}
                                disabled={false}
                                onChange={this.handleInputsChange}
                            />

                            <FormInputField
                                type='text'
                                name={inputName}
                                label='Линк за бутона'
                                value={teaser.buttonLink}
                                required={true}
                                disabled={false}
                                onChange={this.handleInputsChange}
                            />

                            <TextEditor
                                name={inputName}
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
                    <button className="btn btn-success"
                            onClick={this.props.saveChanges}>{BUTTONS_BG.saveChanges}</button>
                    <button className="btn btn-default"
                            onClick={this.addSection}>{BUTTONS_BG.addSection}</button>
                </div>

            </div>

        );
    }

}


export default ArticleManageNew;

ArticleManageNew.propTypes = {
    saveChanges: PropTypes.func
}