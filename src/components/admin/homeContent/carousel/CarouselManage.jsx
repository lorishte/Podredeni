import React from 'react';
import {ToastContainer} from 'react-toastr';

// Helpers
import {Grid, Row, Col, Button, Table} from 'react-bootstrap';

// Partials
import CarouselItem from './partials/CarouselItem';
import CarouselItemCreateButton from './partials/buttons/CarouselItemCreateButton'

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

                    <CarouselItemCreateButton/>
                </Row>
                <Row>

                    <Col>
                        <Table bordered hover style={{marginTop: 20 + 'px'}}>
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
                    </Col>

                </Row>
            </Grid>
        );
    }
}

export default CarouselManage;
