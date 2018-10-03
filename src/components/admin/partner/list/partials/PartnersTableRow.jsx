import React from 'react';
import {Image, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import utils from '../../../../../utils/utils';

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
                    <Image src={p.logoUrl} thumbnail />
                </td>
                <td>
                    <a href={p.webUrl} target="blank">
                        Уеб сайт
                    </a>
                </td>
                <td>
                    <div dangerouslySetInnerHTML={{ __html: p.details }} />
                </td>
                <td className="text-center">
                    <Link to={'/partners/edit/' + p.id} className="btn btn-success btn-xs">
                        <i className="fa fa-pencil" aria-hidden="true"/>
                    </Link>

                    <button className={'btn btn-danger btn-xs'}
                            onClick={() => this.confirmDelete(p.id)}><i className="fa fa-eraser" aria-hidden="true"/></button>
                </td>
            </tr>

        );
    }
}

export default PartnersTableRow;
