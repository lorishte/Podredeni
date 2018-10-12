import React from 'react';

import Popup from 'reactjs-popup';

import {Row, Col, Button} from 'react-bootstrap';

import {BUTTONS_BG} from '../../../../../data/constants/componentConstants';

class PopupComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    openModal = () => {
        this.setState({open: true});
    };

    closeModal = () => {
        this.setState({open: false});
    };

    render() {

        const {buttonLabel, position, content, onSubmit, triggerButtonLabel, triggerButtonClass} = this.props;

        let button = <button>{buttonLabel}</button>;

        return (
            <div>
                <button className={triggerButtonClass} onClick={this.openModal}>
                    {triggerButtonLabel}
                </button>
                <Popup
                    position={position}
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}>
                    <div>
                        <form onSubmit={(e) => onSubmit(e)}>

                            <a className="close" onClick={this.closeModal}>
                                &times;
                            </a>

                            <Row>
                                <Col sm={6} xs={12}>
                                    {content}
                                </Col>
                            </Row>

                            <Row className="buttons-container">
                                <Col xs={12}>
                                    <Button bsStyle='primary' type="submit">{BUTTONS_BG.confirm}</Button>
                                </Col>
                            </Row>

                        </form>
                    </div>
                </Popup>
            </div>
        );
    }
}

export default PopupComponent;
