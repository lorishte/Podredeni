import React from 'react';

import {ToastContainer} from 'react-toastr';

import {Button, Grid, Row, Col, Table, Tabs, Tab} from 'react-bootstrap';

import TableHead from './partials/TableHead';
import CategoryTableRow from './partials/CategoryTableRow';
import Paging from '../../../common/pagination/Paging';
import FormSelectField from '../../../common/formComponents/FormSelectField';
import FormInputWithDropdown from '../../../common/formComponents/FormInputWithDropdown';
import CreateCategoryForm from './partials/CreateCategoryForm'

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
            key: false,
            newCategoryName: '',
            currentCategoryId: ''
        };
    }

    timer = null;

    componentDidMount() {
        this.loadCategories();
    }

    loadCategories = () => {

        let isSubcategory = this.state.key;

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

    handleSelect = (key) => {
        this.setState({key: key, filterValue: '', page: 1}, () => this.goToPage(1));
    };

    updateNewCategoryName = (e) => {
        this.setState({newCategoryName: e.target.value});
    };

    createCategory = () => {

        let isSubcategory = this.state.key;

        if (this.state.currentCategoryId === '') {
            categoriesService.createCategory(isSubcategory, this.state.newCategoryName)
                .then(res => {

                    this.setState({newCategoryName: '', loading: true}, () => this.goToPage(1))

                })
                .catch(err => {

                    this.setState({newCategoryName: ''});

                    this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                        closeButton: false,
                    });
                })
        } else{
            categoriesService.updateCategory(isSubcategory, this.state.currentCategoryId, this.state.newCategoryName)
                .then(res => {
                    this.setState({newCategoryName: '', currentCategoryId: '', loading: true}, () => this.goToPage(1))
                })
                .catch(err => {

                    this.setState({newCategoryName: '', currentCategoryId: ''});

                    this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                        closeButton: false,
                    });
                })
        }
    };

    setEdit = (id, name) => {

        this.setState({newCategoryName: name, currentCategoryId: id});
    };

    deleteCategory = (id) => {

        let isSubcategory = this.state.key;

        categoriesService.deleteCategory(isSubcategory, id)
            .then(res => {

                this.setState({loading: true}, () => this.goToPage(1))

            })
            .catch(err => {

                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            })
    };

    render() {

        let categoriesList = [];

        let btnLabel = this.state.currentCategoryId === '' ? 'Създай' : 'Промени';

        if (this.state.categories) {

            categoriesList = this.state.categories.map(e => {
                return <CategoryTableRow onDeleteButtonClick={this.deleteCategory} onEditButtonClick={this.setEdit} key={e.id} data={e}/>;
            });
        }

        return (
            <Grid>
                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

                <Tabs defaultActiveKey={this.state.key}
                      id="admin-category-table"
                      onSelect={this.handleSelect}>


                    <CreateCategoryForm
                        btnLabel={btnLabel}
                        text={this.state.newCategoryName}
                        createCategory={this.createCategory}
                        updateNewCategoryName={this.updateNewCategoryName}/>


                    <Tab eventKey={false}
                         title='Категория'>
                        <Row>

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

                    </Tab>

                    <Tab eventKey={true}
                         title='Подкатегория'>
                        <Row>


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
                    </Tab>

                </Tabs>
            </Grid>
        );
    }
}

export default CategoriesList;
