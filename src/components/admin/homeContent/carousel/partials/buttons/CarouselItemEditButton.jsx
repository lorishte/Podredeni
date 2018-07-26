import React from 'react';

import { Grid, Row} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import {BUTTONS_BG} from '../../../../../../data/constants/componentConstants';

class CarouselItemEditButton extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        return (
            <Grid id="carouselItem-editButton">
                <Row>
                    <Link className={"btn-custom default md"} to={'/carousel-item/edit/' + this.props.id} >{BUTTONS_BG.edit}</Link>
                </Row>
            </Grid>
        );
    }
}

export default CarouselItemEditButton;