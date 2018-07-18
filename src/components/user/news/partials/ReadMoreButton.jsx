import React from 'react';

import { Grid, Row} from 'react-bootstrap';

import { Link } from 'react-router-dom';

class ReadMoreButton extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        return (
            <Grid>
                <Row>
                    <Link className={"btn-custom default md"} to={'/news/' + this.props.newsId} > Повече </Link>
                </Row>
            </Grid>
        );
    }
}

export default ReadMoreButton;