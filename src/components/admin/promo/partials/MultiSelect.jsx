import React from 'react';

import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

class MultiSelect extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		// the checkboxes can be arbitrarily deep. They will always be fetched and
		// attached the `name` attribute correctly. `value` is optional

		const {name, allProducts, onChange, selectedProductsIds} = this.props;

		let options = [];

		if (allProducts) {

			options = allProducts.map(e => {
				let imageIndex = e.images.length - 1;

				let style = 'product-tab';

				if (selectedProductsIds.includes(e.id)) {
					style += ' selected';
				}

				return (
					<label key={e.id} className='col-xs-12 col-sm-4 col-md-3 '>
						<p className={style}>
							<Checkbox value={e.id} hidden/>
							<img className="image-thumbnail" src={e.images[imageIndex]}/>
							{e.name}
						</p>
					</label>);

			});
		}

		return (
			<CheckboxGroup
				checkboxDepth={3} // This is needed to optimize the checkbox group
				name={name}
				value={selectedProductsIds}
				onChange={onChange}>

				{options}

			</CheckboxGroup>
		);
	}
}

export default MultiSelect;