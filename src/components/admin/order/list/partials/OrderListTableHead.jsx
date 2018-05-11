import React from 'react';

import OrderListSortButtons from './OrderListSortButtons';

import constants from '../../../../../data/constants/componentConstants'

class OrderListTableHead extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <thead>
            <tr>
                <th className="text-center">{constants.LABELS_BG.number}
                    <OrderListSortButtons
                        sortProperty="number"
                        changeClass={this.props.changeClass}
                        sort={this.props.sort}/></th>

                <th className="text-center">{constants.LABELS_BG.status}</th>

                <th className="text-center">{constants.LABELS_BG.lastModification}
                    <OrderListSortButtons
                        sortProperty="lastModificationDate"
                        changeClass={this.props.changeClass}
                        sort={this.props.sort}/></th>

                <th className="text-center">{constants.LABELS_BG.customer}</th>

                <th className="text-center">{constants.LABELS_BG.phone}</th>

                <th className="text-center">{constants.LABELS_BG.amount}</th>

                <th className="text-center" colSpan={3}>{constants.LABELS_BG.edit}</th>
            </tr>
            </thead>
        );
    }
}

export default OrderListTableHead;
