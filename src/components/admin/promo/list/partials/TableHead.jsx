import React from 'react';

class TableHead extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <thead>
            <tr>
                <th className="text-center">Име</th>
                <th className="text-center">Отстъпка</th>
                <th className="text-center">Започва на</th>
                <th className="text-center">Приключва на</th>
                <th className="text-center"></th>
            </tr>
            </thead>
        );
    }
}

export default TableHead;
