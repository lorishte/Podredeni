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
				<th className="col-xs-1"/>
				}
				<th className="col-xs-1">No</th>
				<th className="col-xs-4" colSpan={2}>Продукт</th>
				<th className="col-xs-2">Количество</th>
				<th className="col-xs-2 text-right">Единична цена</th>
				<th className="col-xs-2 text-right">Сума</th>
			</tr>
			</thead>
		);
	}
}

export default TableHead;
