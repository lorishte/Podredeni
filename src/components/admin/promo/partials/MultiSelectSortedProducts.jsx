import React from 'react';

import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {Col, ButtonGroup, Button} from 'react-bootstrap';


class MultiSelectSortedProducts extends React.Component {
    constructor(props) {
        super(props);
    }

    selectCategory = (e) => {
        e.preventDefault()

        let catId = e.target.name;

        let products = this.props.allProducts[catId].products;

        let selectedProducts = this.props.selectedProductsIds;

        products.map(e => {
            if (!selectedProducts.includes(e.id)) {
                selectedProducts.push(e.id)
            }
        })

        this.props.onChange(selectedProducts)
    }

    deselectCategory = (e) => {
        e.preventDefault()
        let catId = e.target.name;

        let products = this.props.allProducts[catId].products;

        let selectedProducts = this.props.selectedProductsIds;

        products.map(e => {
            if (selectedProducts.includes(e.id)) {

                let eIndex = selectedProducts.indexOf(e.id)
                selectedProducts.splice(eIndex, 1)
            }
        })

        this.props.onChange(selectedProducts)
    }

    checkProductGroup = (categoryId) => {
        let products = this.props.allProducts[categoryId].products;
        let selectedProducts = this.props.selectedProductsIds;
        let allSelected = true;

        products.forEach(p => {
            if (!selectedProducts.includes(p.id)) {
                allSelected = false;
            }
        })

        return allSelected
    }

    render() {
        // the checkboxes can be arbitrarily deep. They will always be fetched and
        // attached the `name` attribute correctly. `value` is optional

        const {name, allProducts, onChange, selectedProductsIds} = this.props;

        let options = [];

        if (Object.keys(allProducts).length > 0) {

            Object.keys(allProducts).forEach(catId => {

                let products = allProducts[catId].products;

                let allProductsSelected = this.checkProductGroup(catId)

                let style = allProductsSelected ? 'default' : 'info'
                let btnText = allProductsSelected ? 'Deselect All' : 'Select All'

                options.push(
                    <Col xs={12} key={catId} className={'header'}>

                        <h4>{allProducts[catId].name}</h4>
                        <ButtonGroup bsSize="xsmall">
                            <Button bsStyle={style}
                                    name={catId}
                                    onClick={allProductsSelected ? this.deselectCategory : this.selectCategory}>{btnText}
                            </Button>
                        </ButtonGroup>
                    </Col>
                )


                products.map(p => {

                    let imageIndex = p.images.length - 1;

                    let url = p.images[imageIndex];

                    if (!url.includes('http')) url = '/images/products/' + url;

                    let style = 'product-tab';

                    if (selectedProductsIds.includes(p.id)) {
                        style += ' selected';
                    }

                    options.push(
                        <label key={p.id} className='col-xs-12 col-sm-4 col-md-3 '>
                            <p className={style}>
                                <Checkbox value={p.id} hidden/>
                                <img className="image-thumbnail" src={url}/>
                                <span className={''}>{p.name}</span>
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