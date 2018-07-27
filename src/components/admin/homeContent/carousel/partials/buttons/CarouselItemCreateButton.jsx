import React from 'react';

import { Grid, Row} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import {BUTTONS_BG} from '../../../../../../data/constants/componentConstants';

class CarouselItemCreateButton extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        return (
            <Grid id="carouselItem-createButton">
                <Row>
                    <Link className={"btn-custom default md"} to={'/carousel-item/create/'}>{BUTTONS_BG.create}</Link>
                </Row>
            </Grid>
        );
    }
}

export default CarouselItemCreateButton;