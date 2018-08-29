import React from 'react';

import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class MultiSelect extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        // the checkboxes can be arbitrarily deep. They will always be fetched and
        // attached the `name` attribute correctly. `value` is optional

        const {name, allProducts, onChange, selectedProductsIds} = this.props;

        let options = [];

        if(allProducts){

            options = allProducts.map(e => {
                return <label  key={e.id} ><Checkbox value={e.id}/> {e.name}</label>;
            });
        }

        return (
            <CheckboxGroup
                checkboxDepth={2} // This is needed to optimize the checkbox group
                name={name}
                value={selectedProductsIds}
                onChange={onChange}>
                {options}
            </CheckboxGroup>
        );
    }
};

export default MultiSelect;