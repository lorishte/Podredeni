import React from 'react';

class SortButtons extends React.Component {
	constructor (props) {
		super(props);
	}


	render () {

		let sortProp = this.props.sortProperty;

		return (

			<div className="table-sorting-buttons">
				<button
					className={this.props.changeClass(sortProp, false)}
					onClick={() => this.props.sort(sortProp, false)}>
					<i className="fa fa-arrow-down" aria-hidden="true"/>
				</button>
				<button
					className={this.props.changeClass(sortProp, true)}
					onClick={() => this.props.sort(sortProp, true)}>
					<i className="fa fa-arrow-up" aria-hidden="true"/>
				</button>
			</div>

		);
	}
}

export default SortButtons;
