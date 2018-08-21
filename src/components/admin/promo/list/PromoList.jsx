import React from 'react';
import {Link} from 'react-router-dom';

import {ToastContainer} from 'react-toastr';

import {Grid, Row, Col, Table} from 'react-bootstrap';

import TableHead from './partials/TableHead';
import PromoTableRow from './partials/PromoTableRow';

import promosService from '../../../../services/promos/promosService';

import {
    TOASTR_MESSAGES
} from '../../../../data/constants/componentConstants';

class PromoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            promos: ''
        };
    }

    componentDidMount() {

        this.loadPromos();
    }

    loadPromos = () => {
        promosService
            .loadPromos()
            .then(res => {

                this.setState({
                    promos: res
                });

            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    render() {

        let promosList;

        if(this.state.promos){

            promosList = this.state.promos.map(e => {
                return <PromoTableRow key={e.id} data={e}/>;
            });
        }



        return (
            <Grid>

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />


                <Row>
                    <Col xs={12} className="buttons-container">
                        <Link to="/promos/create" className="btn btn-sm btn-primary">Нова Промоция</Link>
                    </Col>
                </Row>

                <Table striped bordered condensed hover id="admin-promos-table">
                    <TableHead/>
                    <tbody>
                    {promosList}
                    </tbody>
                </Table>

            </Grid>
        );
    }
}

export default PromoList;
