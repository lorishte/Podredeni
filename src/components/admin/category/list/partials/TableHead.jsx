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
				<th>
					<SortButtons
						sortProperty="name"
						changeClass={this.props.changeClass}
						sort={this.props.sort}/></th>

				<th className="text-center"/>
			</tr>
			</thead>
		);
	}
}

export default TableHead;
