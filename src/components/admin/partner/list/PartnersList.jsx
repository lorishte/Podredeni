import React from 'react';
import {Link} from 'react-router-dom';

import {ToastContainer} from 'react-toastr';

import { confirmAlert } from 'react-confirm-alert';

import {Grid, Row, Col, Table} from 'react-bootstrap';

import PartnersTableHead from './partials/PartnersTableHead';
import PartnersTableRow from './partials/PartnersTableRow';

import partnersService from '../../../../services/partners/partnersService';

import {
    TOASTR_MESSAGES
} from '../../../../data/constants/componentConstants';

import { BUTTONS_BG, CONFIRM_DIALOGS } from '../../../../data/constants/componentConstants';

class PartnersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            partners: ''
        };
    }

    componentDidMount() {

        this.loadAll();
    }

    loadAll = () => {

        partnersService
            .load()
            .then(res => {

                this.setState({
                    partners: res
                });

            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    deletePartner = (partnerId) => {

        partnersService.delete(partnerId).then(res => {

            window.location.reload();

        }).catch(err => {
            this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                closeButton: false,
            });
        })

    };

    confirmDeletePartner = (partnerId) => {
        confirmAlert({
            title: '',
            message: CONFIRM_DIALOGS.deletePartner,
            buttons: [{
                label: BUTTONS_BG.yes,
                onClick: () => this.deletePartner(partnerId)
            },
                {label: BUTTONS_BG.no}]
        });

    };

    render() {

        let partnersList;

        if(this.state.partners){

            partnersList = this.state.partners.map(e => {
                return <PartnersTableRow key={e.id} data={e} confirmDelete={this.confirmDeletePartner}/>;
            });
        }



        return (
            <Grid id="admin-partners">

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />


                <Row>
                    <Col xs={12} className="buttons-container">
                        <Link to="/partners/create" className="btn btn-sm btn-primary">Нов Партньор</Link>
                    </Col>
                </Row>

                <Table striped bordered condensed hover id="admin-partners-table">
                    <PartnersTableHead/>
                    <tbody>
                    {partnersList}
                    </tbody>
                </Table>

            </Grid>
        );
    }
}

export default PartnersList;
