import React from 'react';

import { Link } from 'react-router-dom';

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import { PARTNER_CATEGORIES } from '../../../../../data/constants/componentConstants';

const SortableItem = SortableElement(({itemIndex, value, confirmDeletePartner}) =>

	<tr className="partner-row">
		<td className="padding">
			{itemIndex}
		</td>
		<td className="padding">
			{value.name}
		</td>
		<td className="padding">
			<img className="partner-image-thumbnail" src={value.logoUrl}/>
		</td>
		<td className="padding">
			<a href={value.webUrl} target="blank" className="text-sm">
				{value.webUrl}
			</a>
		</td>
		<td className="padding text-sm">
			{PARTNER_CATEGORIES[value.category]}
		</td>
		<td className="text-center padding">
			<Link to={'/partners/edit/' + value.id} className="btn btn-success btn-xs">
				<i className="fa fa-pencil" aria-hidden="true"/>
			</Link>

			<button className='btn btn-danger btn-xs' onClick={() => confirmDeletePartner(value.id)}>
				<i className="fa fa-trash" aria-hidden="true"/>
			</button>
		</td>
	</tr>);

const SortableList = SortableContainer(({items, confirmDeletePartner}) => {
	let itemIndex = 1;

	return (
		<tbody>
		{items.map((value, index ) => (
			<SortableItem key={`item-${index}`}
			              itemIndex={itemIndex++}
			              index={index}
			              value={value}
			              confirmDeletePartner={confirmDeletePartner}/>
		))}
		</tbody>
	);
});

class SortablePartners extends React.Component {
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

		let confirmDeletePartner = this.props.confirmDeletePartner;

		return <SortableList
			getContainer={() => document.getElementById('admin-sortable')}
			items={this.state.items}
			confirmDeletePartner={confirmDeletePartner}
			distance={10}
			onSortEnd={this.onSortEnd}/>;
	}
}

export default SortablePartners;
