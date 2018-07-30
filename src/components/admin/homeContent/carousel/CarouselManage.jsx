import React from 'react';
import {ToastContainer} from 'react-toastr';

// Helpers
import {Grid, Row, Col, Button, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';

// Partials
import CarouselItem from './partials/CarouselItem';

import {BUTTONS_BG} from '../../../../data/constants/componentConstants';

class CarouselManage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        const {carouselItems} = this.props.data;

        let items;

        if (carouselItems.length > 0) {
            items = carouselItems.map(i => {

                return <CarouselItem

                    key={i.id}
                    item={i}

                />
            });
        }

        return (
            <Grid id="article-manage">

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

                <Row style={{paddingTop: 20 + 'px'}}>

                    <Link className={"btn-custom default md"} to={'/carousel-item/create/'}>{BUTTONS_BG.create}</Link>
                </Row>
                <Row>

                    <Col>
                        <Table responsive hover style={{marginTop: 20 + 'px'}}>
                            <tbody>
                            {items}
                            </tbody>
                        </Table>
                    </Col>

                </Row>
            </Grid>
        );
    }
}

export default CarouselManage;
