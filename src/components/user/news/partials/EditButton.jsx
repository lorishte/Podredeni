import React from 'react';

import { Grid, Row} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import {BUTTONS_BG} from '../../../../data/constants/componentConstants';

class EditButton extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        return (
            <Grid>
                <Row>
                    <Link className={"btn-custom default md"} to={'/news/edit/' + this.props.newsId} >{BUTTONS_BG.edit}</Link>
                </Row>
            </Grid>
        );
    }
}

export default EditButton;