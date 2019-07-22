import React from 'react';
import { ToastContainer } from 'react-toastr';
import { Grid } from 'react-bootstrap';

// Partials
import SortableCategories from './partials/SortableCategories';

// Services
import categoriesService from '../../../../services/categories/categoryService';

// Constants
import { TOASTR_MESSAGES } from '../../../../data/constants/componentConstants';
import { Link } from 'react-router-dom';

class ReorderCategory extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			categories: [],
			newCategoryOrder: [],
			loading: true
		};
	}

	componentDidMount () {
		this.loadCategories();
	}

	loadCategories = () => {
		categoriesService
			.loadCategories(this.state)
			.then(res => {

				this.setState({
					categories: res.categories, loading: false});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};

	handleOrderChange = (reorderedItems) => {
		this.setState({newCategoryOrder: reorderedItems});
	};

	saveNewOrder = () => {
		categoriesService.saveUpdatedCategoryOrder(this.state.newCategoryOrder.map(p => p.id))
			.then(res => {
				this.toastContainer.success(TOASTR_MESSAGES.successEdit)
			})
			.catch(err => {
				this.toastContainer.error(err.statusText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};

	render () {

		let categories;

		if(this.state.categories.length > 0){


			categories = (						
			<div id="admin-sortable">
			<SortableCategories sortableItems={this.state.categories}
								handleOrderChange={this.handleOrderChange}/></div>)
		}

		return (
			<Grid id='reorder-products'>

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>


				<h3>Подреждане на категории</h3>
				
				{this.state.loading && <div className="admin-loader"/>}

				{!this.state.loading && this.state.categories.length > 0 &&
				<div>
					{categories}
				</div>
				}

				<div className='buttons-container'>
					<Link to='/product/list' className='btn btn-default' > Към продукти </Link>
					<Link to='/category/list' className='btn btn-default' > Към категории </Link>
					<button className='btn btn-primary'
					        disabled={this.state.newCategoryOrder.length === 0}
					        onClick={this.saveNewOrder}>Запази подреждането</button>
				</div>


			</Grid>
		);
	}
}

export default ReorderCategory;
