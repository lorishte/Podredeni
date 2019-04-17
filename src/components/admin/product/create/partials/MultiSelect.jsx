import React from 'react';
import Select from 'react-select';

class MultiSelect extends React.Component {

    render() {
        
        let {selectedOption, handleChange, options} = this.props;

        return (
            <Select
                isMulti={true}
                value={selectedOption}
                onChange={handleChange}
                options={options}
            />
        );
    }
}

export default MultiSelect;