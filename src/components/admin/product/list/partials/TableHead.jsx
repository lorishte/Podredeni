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
				<th className="text-center">
					<SortButtons
						sortProperty="number"
						changeClass={this.props.changeClass}
						sort={this.props.sort}/></th>
				<th>
					<SortButtons
						sortProperty="name"
						changeClass={this.props.changeClass}
						sort={this.props.sort}/></th>
				<th className="text-center">
					<SortButtons
						sortProperty="price"
						changeClass={this.props.changeClass}
						sort={this.props.sort}/>
				</th>
				<th className="text-center">
					<i className="fa fa-diamond" aria-hidden="true" />
				</th>
				<th className="text-center">
					<i className="fa fa-ban" aria-hidden="true"/>
				</th>
				<th className="text-center"/>
			</tr>
			</thead>
		);
	}
}

export default TableHead;
