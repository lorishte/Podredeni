import React from 'react';
import {Link} from 'react-router-dom';

class CategoryTableRow extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        let c = this.props.data;
        return (
            <tr className="text-center">

                <td className="text-left">
                    {c.name}
                </td>

                <td className="text-center">
                    <Link to={'/category/edit/' + c.id} className="btn btn-success btn-xs">
                        <i className="fa fa-pencil" aria-hidden="true"/>
                    </Link>
                </td>
            </tr>

        );
    }
}

export default CategoryTableRow;
