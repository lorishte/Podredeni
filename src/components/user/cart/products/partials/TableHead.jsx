import React from 'react';

class TableHead extends React.Component {
	constructor (props) {
		super(props);
	}
	render() {
		return (
			<thead>
			<tr>
				{this.props.editable &&
				<th/>
				}
				<th colSpan={2}>Продукт</th>
				<th>Брой</th>
				<th className="text-right">Цена</th>
				<th className="text-right">Сума</th>
			</tr>
			</thead>
		);
	}
}

export default TableHead;
