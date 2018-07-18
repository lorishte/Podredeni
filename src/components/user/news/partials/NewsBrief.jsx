import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';

import EditButton from './EditButton';
import ReadMoreButton from './ReadMoreButton';

import Utils from '../../../../utils/utils';


class NewsBrief extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        let isAdmin = sessionStorage.getItem('role') === 'admin';
        let news = this.props.data;

        return (
            <Grid id="newsBrief">
                <Row>
                    <Col>
                        <Image src={news.imageUrl}/>
                        <h2>{news.title}</h2><p>Публикуван на {Utils.formatDateAndTime(news.creationDate)}</p>

                        {isAdmin &&
                        <EditButton
                            newsId={news.id}/>
                        }

                        {!isAdmin &&
                        <ReadMoreButton
                            newsId={news.id}/>
                        }

                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default NewsBrief;