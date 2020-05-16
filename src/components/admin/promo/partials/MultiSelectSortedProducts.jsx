import React from 'react';

import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {Col} from 'react-bootstrap';


class MultiSelectSortedProducts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // the checkboxes can be arbitrarily deep. They will always be fetched and
        // attached the `name` attribute correctly. `value` is optional

        const {name, allProducts, onChange, selectedProductsIds} = this.props;

        let options = [];

        if (Object.keys(allProducts).length > 0) {

            Object.keys(allProducts).forEach(catId => {

                let products = allProducts[catId].products;

                products.map(p => {

                    let imageIndex = p.images.length - 1;

                    let url = p.images[imageIndex];

                    if (!url.includes('http')) url = '/images/products/' + url;

                    let style = 'product-tab';

                    if (selectedProductsIds.includes(p.id)) {
                        style += ' selected';
                    }

                    if (products.indexOf(p) === 0) {
                        options.push(
                            <Col xs={12} key={catId}>
                                <h4>{allProducts[catId].name}</h4>
                                {/*<hr/>*/}
                            </Col>

                        )
                    }


                    options.push(
                        <label key={p.id} className='col-xs-12 col-sm-4 col-md-3 '>
                            <p className={style}>
                                <Checkbox value={p.id} hidden/>
                                <img className="image-thumbnail" src={url}/>
                                {p.name}
                            </p>
                        </label>
                    )
                })
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

export default MultiSelectSortedProducts;