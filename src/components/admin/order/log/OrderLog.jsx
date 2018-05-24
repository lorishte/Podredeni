import React from 'react';
import { ToastContainer } from 'react-toastr';

import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

import ordersService from '../../../../services/orders/ordersService';
import LogTableRow from './partials/LogTableRow';

import { BUTTONS_BG, TOASTR_MESSAGES } from '../../../../data/constants/componentConstants';


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
		        this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
			        closeButton: false,
		        });
	        });
    }

	goBack = () => {
		//redirect back
		this.props.history.go(-1);
	};

    render () {
        let logList;

        if (this.state.logs !== '') {

            let index = 0;

            logList = this.state.logs.map(e => {
                return <LogTableRow key={index++} data={e}/>;
            });
        }

        return (
            <Grid>

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

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
                        <Button onClick={this.goBack}>{BUTTONS_BG.back}</Button>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default OrderLog;
