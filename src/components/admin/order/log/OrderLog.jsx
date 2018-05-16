import React from 'react';

import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

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

	cancel = () => {
		//redirect back
		this.props.history.go(-1);
	};

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

                <Row className="buttons-container">
                    <Col xs={12} >
                        <Button onClick={this.cancel}>Назад</Button>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default OrderLog;
