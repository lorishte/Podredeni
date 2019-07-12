import React from 'react';

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';



const SortableItem = SortableElement(({itemIndex, value}) =>

	<tr className="text-center">
		<td className="padding">
			{itemIndex}
		</td>

		<td>
			<img src={value.images[0]}  className='image-thumbnail' />
		</td>

		<td className="text-left">
			{value.name}
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

		this.props.handleOrderChange(this.state.items);
	};


	render () {

		return <SortableList
			getContainer={() => document.getElementById('admin-sortable')}
			items={this.state.items}
			distance={10}
			onSortEnd={this.onSortEnd}/>;
	}
}

export default SortableProducts;
