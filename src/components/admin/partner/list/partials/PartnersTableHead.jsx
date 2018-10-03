import React from 'react';

class PartnersTableHead extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <thead>
            <tr>
                <th className="text-center">Име</th>
                <th className="text-center">Лого (Url)</th>
                <th className="text-center">Уебсайт (Url)</th>
                <th className="text-center">Детайли</th>
                <th className="text-center"></th>
            </tr>
            </thead>
        );
    }
}

export default PartnersTableHead;
