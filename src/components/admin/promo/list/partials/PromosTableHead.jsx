import React from 'react';

class TableHead extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

	    let promoType = this.props.promoType;

        return (
            <thead>
            <tr>
                <th className="text-center">Име</th>

	            {promoType === 'discount' &&
                <th className="text-center"> Отстъпка </th>
	            }

	            {promoType === 'product' &&
                <th className="text-center"> Квота </th>
	            }

                <th className="text-center">Започва на</th>
                <th className="text-center">Приключва на</th>
                <th className="text-center"></th>
            </tr>
            </thead>
        );
    }
}

export default TableHead;
