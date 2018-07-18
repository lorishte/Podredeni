import React from 'react';

import { Grid, Row} from 'react-bootstrap';

import { Link } from 'react-router-dom';

class EditButton extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        return (
            <Grid>
                <Row>
                    <Link className={"btn-custom default md"} to={'/news/edit/' + this.props.newsId} > Редактиране </Link>
                </Row>
            </Grid>
        );
    }
}

export default EditButton;