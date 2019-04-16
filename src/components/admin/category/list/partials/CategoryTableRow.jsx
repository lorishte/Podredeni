import React from 'react';
import {Button} from 'react-bootstrap';

class CategoryTableRow extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        const {data, onEditButtonClick, onDeleteButtonClick} = this.props;

        return (
            <tr className="text-center">

                <td className="text-left">
                    {data.name}
                </td>

                <td className="text-center">
                    <Button onClick={() => onEditButtonClick(data.id, data.name)} className="btn btn-success btn-xs">
                        <i className="fa fa-pencil" aria-hidden="true"/>
                    </Button>
                    <Button onClick={() => onDeleteButtonClick(data.id)} className="btn btn-danger btn-xs">
                        <i className="fa fa-eraser" aria-hidden="true"/>
                    </Button>
                </td>
            </tr>

        );
    }
}

export default CategoryTableRow;
