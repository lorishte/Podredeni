import React from 'react';

import { Link } from 'react-router-dom';

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import { PARTNER_CATEGORIES } from '../../../../../data/constants/componentConstants';
import { Label } from 'react-bootstrap';

const SortableItem = SortableElement(({itemIndex, value}) =>

	<tr className="text-center">
		<td className="padding">
			{itemIndex}
		</td>
		<td>
			{value.number}
		</td>
		<td className="text-left">
			{value.name}
		</td>
		<td className="text-right">
			<p className="price"> {value.price.toFixed(2)}</p>
		</td>
		<td>
			{value.isTopSeller &&
			<Label bsStyle="info">
				<i className="fa fa-diamond" aria-hidden="true" />
			</Label>
			}
		</td>
		<td>
			{value.isBlocked &&
			<Label bsStyle="danger">
				<i className="fa fa-ban" aria-hidden="true"/>
			</Label>}
		</td>
		<td className="text-center">
			<Link to={'/product/edit/' + value.id} className="btn btn-success btn-xs">
				<i className="fa fa-pencil" aria-hidden="true"/>
			</Link>
		</td>
	</tr>);

const SortableList = SortableContainer(({items}) => {
	let itemIndex = 1;

	return (
		<tbody>
		{items.map((value, index ) => (
			<SortableItem key={`item-${index}`}
			              itemIndex={itemIndex++}
			              index={index}
			              value={value}/>
		))}
		</tbody>
	);
});

class SortableProducts extends React.Component {
	state = {
		items: this.props.sortableItems
	};

	onSortEnd = ({oldIndex, newIndex}) => {
		this.setState({
			items: arrayMove(this.state.items, oldIndex, newIndex),
		});

		this.handleOrderChange(this.state.items);
	};

	handleOrderChange;

	render () {

		this.handleOrderChange = this.props.handleOrderChange;


		return <SortableList
			getContainer={() => document.getElementById('admin-sortable')}
			items={this.state.items}
			distance={10}
			onSortEnd={this.onSortEnd}/>;
	}
}

export default SortableProducts;
