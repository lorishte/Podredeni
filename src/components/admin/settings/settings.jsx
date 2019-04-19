import React from 'react';
import { ToastContainer } from 'react-toastr';

import { Grid, Row, Form, Button, Label, FormGroup, Col, Checkbox} from 'react-bootstrap';

import {TOASTR_MESSAGES, REDIRECT_DELAY} from '../../../data/constants/componentConstants';

import settingsService from '../../../services/settings/settingsService'


class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
             showOutOfStock: false
        };
    }

    componentDidMount() {

       this.loadSettings()
       
    }

    loadSettings = () => {
        settingsService.load()
        .then(res => {
            
            // to be deleted when API func implemented!!!
            console.log(res);
            //

            for(var propertyName in res) {

                this.setState({[`${propertyName}`]: res[propertyName]})
             }

        })
        .catch(err => {
            this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                closeButton: false,
            });
        })
    }

    submitInfo = (e) => {
        e.preventDefault();

        settingsService.edit(this.state)
        .then(res => {

        })
        .catch(err => {
            this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                closeButton: false,
            });
        })
    }

    onChange = (e) => {

        this.setState({ [e.target.name]: e.target.value} );
    }

    handleCheckBox = (e) => {

        this.setState({[e.target.name]: !this.state[e.target.name]});
    };
   
    cancel = () => {
        //redirect back
        this.props.history.go(-1);
    };

    render() {

    
        return (
            <Grid>

            <ToastContainer
                ref={ref => this.toastContainer = ref}
                className="toast-bottom-right"
            />
            <form onSubmit={(e) => this.submitInfo(e)}>
            <Row>
                <Col>
                    <Checkbox readOnly
                            name="showOutOfStock"
                            checked={this.state.showOutOfStock}
                            onChange={this.handleCheckBox}>
                    Покажи "Изчерпан"
                    </Checkbox>
                </Col>
            </Row>
            <Row className="buttons-container">
                <Col xs={12}>
                    <Button onClick={this.cancel}>Отказ</Button>
                    <Button bsStyle='primary' type="submit">Потвърди</Button>
                </Col>
            </Row>
            </form>

        </Grid>
        )
    }
}

export default Settings;
