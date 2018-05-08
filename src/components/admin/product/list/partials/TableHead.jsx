import React from 'react';

import { Checkbox } from 'react-bootstrap';

import SortButtons from './SortButtons';


class TableHead extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<thead>
			<tr>
				<th className="text-center">No
					<SortButtons
						sortProperty="number"
						changeClass={this.props.changeClass}
						sort={this.props.sort}/></th>
				<th>Наименование
					<SortButtons
						sortProperty="name"
						changeClass={this.props.changeClass}
						sort={this.props.sort}/></th>
				<th className="text-center">Цена
					<SortButtons
						sortProperty="price"
						changeClass={this.props.changeClass}
						sort={this.props.sort}/>
				</th>
				<th className="text-center">TopSeller
				</th>
				<th className="text-center">Blocked</th>
				<th className="text-center">Редакция</th>
			</tr>
			</thead>
		);
	}
}

export default TableHead;
