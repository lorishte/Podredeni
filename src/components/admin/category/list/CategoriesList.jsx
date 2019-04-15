import React from 'react';
import {Link} from 'react-router-dom';

import {ToastContainer} from 'react-toastr';

import {Grid, Row, Col, Table} from 'react-bootstrap';

import TableHead from './partials/TableHead';
import CategoryTableRow from './partials/CategoryTableRow';
import Paging from '../../../common/pagination/Paging';
import FormSelectField from '../../../common/formComponents/FormSelectField';
import FormInputWithDropdown from '../../../common/formComponents/FormInputWithDropdown';

import categoriesService from '../../../../services/categories/categoryService';

import {
    ELEMENTS_ON_PAGE,
    ADMIN_CATEGORIES_FILTER_OPTIONS,
    FILTER_INPUT_WAIT_INTERVAL,
    TOASTR_MESSAGES,
    CATEGORY_OR_SUBCATEGORY
} from '../../../../data/constants/componentConstants';

import Header from "../../../common/Header";

class CategoriesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            size: 10,
            page: 1,
            sortProperty: 'name',
            descending: false,
            filterProperty: 'name',
            filterValue: '',
            productsCount: '',
            pagesCount: '',
            loading: true,
            isSubcategory: false
        };
    }

    timer = null;

    componentDidMount() {
        this.loadCategories();
    }

    loadCategories = () => {

        let isSubcategory = this.state.isSubcategory;

        categoriesService
            .loadCategories(this.state, isSubcategory)
            .then(res => {
                let categoriesCount = Number(res.categoriesCount);
                let size = Number(this.state.size);

                this.setState({
                    categories: res.categories,
                    categoriesCount: categoriesCount,
                    pagesCount: Math.ceil(categoriesCount / size),
                    loading: false
                });

            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    sort = (sortProperty, descending) => {
        this.setState({
            sortProperty: sortProperty,
            descending: descending,
            loading: true
        }, () => this.loadCategories());
    };

    changeClass = (sortProp, descending) => {
        if (this.state.sortProperty === sortProp &&
            this.state.descending === descending) {
            return 'btn btn-sort active';
        }

        return 'btn btn-sort';
    };

    goToPage = (page) => {
        this.setState({
            page: page,
            loading: true
        }, () => this.loadCategories());
    };

    handleSizeChange = (e) => {
        if (e.target.value === '') return;
        this.setState({size: e.target.value}, () => this.goToPage(1));
    };

    handleTypeChange = (e) => {

        if (e.target.value === '') return;

        let isCategory = CATEGORY_OR_SUBCATEGORY[e.target.value];

        this.setState({isSubcategory: isCategory}, () => this.goToPage(1));
    };

    handleFilterProperty = (е) => {
        this.setState({filterValue: '', filterProperty: е});
    };

    handleFilterValue = (e) => {
        this.setState({filterValue: e.target.value});
    };

    handleKeyDown = (e) => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.goToPage(1), FILTER_INPUT_WAIT_INTERVAL);
    };

    render() {

        let categoriesList = [];

        if (this.state.categories) {

            categoriesList = this.state.categories.map(e => {
                return <CategoryTableRow key={e.id} data={e}/>;
            });
        }


        let isCategoryValue = this.state.isSubcategory ? "Подкатегория" : "Категория";

        return (
            <Grid>

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />


                <Row>

                    <h5>
                        Покажи:

                        <FormSelectField
                            name="isSubcategory"
                            value={isCategoryValue}
                            optionsList={CATEGORY_OR_SUBCATEGORY}
                            required={false}
                            onChange={this.handleTypeChange}/>
                    </h5>

                </Row>
                <Row>
                    <Col xs={12} className="buttons-container">
                        <Link to="/category/create" className="btn btn-sm btn-primary">Новa
                            категория/подкатегория</Link>
                    </Col>

                </Row>

                <Row>
                    <Col xs={4} sm={3} md={2}>
                        <FormSelectField
                            name="size"
                            value={this.state.size}
                            optionsList={ELEMENTS_ON_PAGE}
                            required={false}
                            onChange={this.handleSizeChange}/>
                    </Col>

                    <Col xs={8} sm={6}>
                        <FormInputWithDropdown
                            // input
                            inputName="filterValue"
                            filterValue={this.state.filterValue}
                            placeholder="филтър по"
                            onChange={this.handleFilterValue}
                            onKeyDown={this.handleKeyDown}
                            // dropdown
                            filterProperty={this.state.filterProperty}
                            dropdownName="filterProperty"
                            onSelect={this.handleFilterProperty}
                            // dropdown options
                            optionsList={ADMIN_CATEGORIES_FILTER_OPTIONS}/>
                    </Col>
                </Row>

                {this.state.loading && <div className="admin-loader"/> }

                <Table striped bordered condensed hover id="admin-categories-table">
                    <TableHead
                        changeClass={this.changeClass}
                        sort={this.sort}
                        handleChange={this.handleSizeChange}/>
                    <tbody>
                    {categoriesList}
                    </tbody>
                </Table>

                {this.state.size !== '0' &&
                <Paging
                    active={Number(this.state.page)}
                    pagesCount={Number(this.state.pagesCount)}
                    goToPage={this.goToPage}/>}
            </Grid>
        );
    }
}

export default CategoriesList;
