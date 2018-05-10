import React from 'react';

import utils from '../../../../../utils/utils';

class LogTableRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {

        let log = this.props.data;

        return (
            <tr>
                <td>
                    {utils.formatDateAndTime(log.dateTime)}
                </td>
                <td>
                    {log.username}
                </td>
                <td>
                    {log.action}
                </td>
            </tr>
        );
    }
}

export default LogTableRow;
