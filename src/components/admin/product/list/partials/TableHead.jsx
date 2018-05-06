import React from 'react';

import SortButtons from './SortButtons';


class TableHead extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<thead>
			<tr>
				<th>#
					<SortButtons
						sortProperty="number"
						changeClass={this.props.changeClass}
						sort={this.props.sort}/></th>
				<th>Наименование
					<SortButtons
						sortProperty="name"
						changeClass={this.props.changeClass}
						sort={this.props.sort}/></th>
				<th>Цена
					<SortButtons
						sortProperty="price"
						changeClass={this.props.changeClass}
						sort={this.props.sort}/>
				</th>
				<th>TopSeller</th>
				<th>Blocked</th>
				<th>Редакция</th>
			</tr>
			</thead>
		);
	}
}

export default TableHead;
