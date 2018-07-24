import React from 'react';

import { Grid, Row} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import {BUTTONS_BG} from '../../../../data/constants/componentConstants';

class ReadMoreButton extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        return (
            <Grid>
                <Row>
                    <Link className={"btn-custom default md"} to={'/news/' + this.props.newsId} >{BUTTONS_BG.more}</Link>
                </Row>
            </Grid>
        );
    }
}

export default ReadMoreButton;