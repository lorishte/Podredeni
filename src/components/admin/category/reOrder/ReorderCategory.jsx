import React from 'react';
import { ToastContainer } from 'react-toastr';
import { Grid } from 'react-bootstrap';

// Partials
import SortableCategories from './partials/SortableCategories';

// Services
import categoriesService from '../../../../services/categories/categoryService';

// Constants
import { TOASTR_MESSAGES } from '../../../../data/constants/componentConstants';

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

		console.log(this.state);

		categoriesService.saveUpdatedCategoryOrder(this.state.newCategoryOrder.map(p => p.id))
			.then(res => {
				this.loadCategories();
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
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

				{!this.state.loading && this.state.categories.length === 0 &&
				<h4> Няма категории</h4>
				}

				{!this.state.loading && this.state.categories.length > 0 &&
				<div>
					{categories}

					<div className='buttons-container'>
						<button className='btn btn-default' onClick={() => this.props.history.go(-1)}>Назад</button>
						<button className='btn btn-primary' onClick={this.saveNewOrder}>Запази подреждането</button>
					</div>
				</div>
				}


			</Grid>
		);
	}
}

export default ReorderCategory;
