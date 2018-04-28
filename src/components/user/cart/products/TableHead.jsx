import React from 'react';

const TableHead = () => {
	return (
		<thead>
		<tr>
			<th className="col-xs-1"/>
			<th className="col-xs-1">No</th>
			<th className="col-xs-4" colSpan={2}>Product</th>
			<th className="col-xs-2">Quantity</th>
			<th className="col-xs-2 text-right">Price</th>
			<th className="col-xs-2 text-right">Sum</th>
		</tr>
		</thead>
	);
};

export default TableHead;
