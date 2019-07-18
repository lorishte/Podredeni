import React from 'react';
import { Table } from 'react-bootstrap';

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableItem = SortableElement(({itemIndex, value}) =>

	<tr className="text-center">
		<td className="padding">
			{itemIndex}
		</td>

		<td>
			<img src={value.images[0]}  className='image-thumbnail-small' />
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
	constructor (props) {
		super(props);

		this.state = {
			items: []
		}
	}

	componentDidMount () {
		this.setState({items: this.props.sortableItems})
	}

	onSortEnd = ({oldIndex, newIndex}) => {
		this.setState({
			items: arrayMove(this.state.items, oldIndex, newIndex),
		});

		this.props.handleOrderChange(this.state.items);
	};

	render () {

		let itemsList;

		

		if(this.state.items.length > 0){

			itemsList = (<SortableList
				getContainer={() => document.getElementById('admin-sortable')}
				items={this.state.items}
				distance={10}
				onSortEnd={this.onSortEnd}/>);
		}

		return <Table striped bordered condensed hover id="admin-products-table">{itemsList}</Table>;
	}
}

export default SortableProducts;
