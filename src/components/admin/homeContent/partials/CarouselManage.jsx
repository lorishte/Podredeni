import React from 'react';
import {ToastContainer} from 'react-toastr';

// Helpers
import {Grid, Row, Col, Button, Table} from 'react-bootstrap';

import CarouselItem from "./CarouselItem";

class CarouselManage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        const {carouselItems} = this.props.data;


        let items;

        if(carouselItems.length > 0) {
            items = carouselItems.map(i => {
                return <CarouselItem

                    item={i}

                />
            });
        }

        return (
            <Grid id="article-modify">

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

                <Row>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Картинка</th>
                            <th>Заглавие</th>
                            <th>Редакция</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items}
                        </tbody>
                    </Table>
                </Row>
            </Grid>
        );
    }
}

export default CarouselManage;
