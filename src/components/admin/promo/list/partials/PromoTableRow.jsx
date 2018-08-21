import React from 'react';

import utils from '../../../../../utils/utils';

class PromoTableRow extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        let p = this.props.data;

        return (
            <tr className="text-center">
                <td>
                    {p.name}
                </td>
                <td>
                    {p.discount}
                </td>
                <td>
                    {utils.formatDate(p.startDate)}
                </td>
                <td>
                    {utils.formatDate(p.endDate)}
                </td>
            </tr>

        );
    }
}

export default PromoTableRow;
