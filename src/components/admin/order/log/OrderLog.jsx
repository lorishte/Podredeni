import React from 'react';

import { Grid, Row, Col, Table } from 'react-bootstrap';

import ordersService from '../../../../services/orders/ordersService';
import LogTableRow from './partials/LogTableRow';


class OrderLog extends React.Component {
    constructor (props) {
        super(props);

        this.state = {logs: ''}

    }

    componentDidMount () {
        ordersService
            .loadOrderLog(this.props.match.params.id)
            .then(res => {
                this.setState({logs: res.logs})
            })
            .catch(err => {
                console.log(err.responseText)
            });
    }

    render () {
        let logList;

        if (this.state.logs !== '') {
            logList = this.state.logs.map(e => {
                return <LogTableRow key={e.id} data={e}/>;
            });
        }

        return (
            <Grid>
                <Row>
                    <Col sm={12}>



                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Потребител</th>
                                <th>Промяна</th>
                            </tr>
                            </thead>
                            <tbody>
                            {logList}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default OrderLog;
