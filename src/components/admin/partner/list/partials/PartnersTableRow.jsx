import React from 'react';

import {Link} from 'react-router-dom';

class PartnersTableRow extends React.Component {
    constructor (props) {
        super(props);
    }

    confirmDelete = this.props.confirmDelete;

    render () {

        let p = this.props.data;

        return (
            <tr className="text-center">
                <td>
                    {p.name}
                </td>
                <td>
                    <img className="image-thumbnail" src={p.logoUrl}  />
                </td>
                <td>
                    <a href={p.webUrl} target="blank">
                        {p.webUrl}
                    </a>
                </td>
                <td>
                    <div dangerouslySetInnerHTML={{ __html: p.category }} />
                </td>
                <td className="text-center">
                    <Link to={'/partners/edit/' + p.id} className="btn btn-success btn-xs">
                        <i className="fa fa-pencil" aria-hidden="true"/>
                    </Link>

                    <button className={'btn btn-danger btn-xs'}
                            onClick={() => this.confirmDelete(p.id)}><i className="fa fa-trash" aria-hidden="true"/></button>
                </td>
            </tr>

        );
    }
}

export default PartnersTableRow;
