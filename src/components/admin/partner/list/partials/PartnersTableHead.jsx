import React from 'react';

import { PARTNERS } from '../../../../../data/constants/componentConstants';

class PartnersTableHead extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <thead>
            <tr>
                <th className="text-center">{PARTNERS.name}</th>
                <th className="text-center">{PARTNERS.logoUrl}</th>
                <th className="text-center">{PARTNERS.webUrl}</th>
                <th className="text-center">{PARTNERS.category}</th>
                <th className="text-center"></th>
            </tr>
            </thead>
        );
    }
}

export default PartnersTableHead;
