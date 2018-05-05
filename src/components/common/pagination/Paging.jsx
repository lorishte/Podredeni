import React from 'react';
import { Link } from 'react-router-dom';

import { Pagination } from 'react-bootstrap';

class Paging extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		console.log(this.props);
	}

	changePage = (e, selectedPage) => {
		console.log(this.props.active);

		if (selectedPage === undefined) selectedPage = Number(e.target.text);
		if (selectedPage < 1 || selectedPage > this.props.pagesCount) return;

		this.props.goToPage(selectedPage);
	};

	render () {

		let {active, pagesCount} = this.props;

		return (
			<Pagination>
				<Pagination.First
					disabled={active === 1}
					onClick={(e) => this.changePage(e, 1)}/>
				<Pagination.Prev
					disabled={active === 1}
					onClick={(e) => this.changePage(e, active - 1)}/>

				{active > 3 && <Pagination.Ellipsis /> }
				{active === 3 && <Pagination.Item onClick={this.changePage}>{active - 2}</Pagination.Item>}
				{active !== 1 && <Pagination.Item onClick={this.changePage}>{active - 1}</Pagination.Item>}

				<Pagination.Item active>{active}</Pagination.Item>

				{active !== pagesCount && <Pagination.Item onClick={this.changePage}>{active + 1}</Pagination.Item>}
				{active === 1 && <Pagination.Item onClick={this.changePage}>{active + 2}</Pagination.Item>}
				{active < pagesCount - 2 && <Pagination.Ellipsis /> }

				<Pagination.Next
					disabled={active === pagesCount}
					onClick={(e) => this.changePage(e, active + 1)}/>
				<Pagination.Last
					onClick={(e) => this.changePage(e, pagesCount)}
					disabled={active === pagesCount}/>
			</Pagination>
		);
	}
}

export default Paging;
