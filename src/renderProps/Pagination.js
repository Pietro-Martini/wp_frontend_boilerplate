import React from 'react'
import range from '../helpers/range'

export default class Pagination extends React.Component {
	state = {currentPage: 1}

	getMaxPage = () => Math.ceil(this.props.itemCount / this.props.itemsPerPage)

	handleNumClick = (paginationIdx, fn) => {
		this.setState({
			currentPage: paginationIdx
		}, e => fn(this.state.currentPage))
	}

	handleArrowClick = direction => fn => {
		const newPage = this.state.currentPage + direction
		if (newPage > 0 && newPage <= this.getMaxPage()) {
			this.setState({
				currentPage: this.state.currentPage + direction
			}, e => fn(this.state.currentPage))
		}			
	}	

	render = () => {		
		const {currentPage} = this.state

		const maxPage = this.getMaxPage()
		const pages = range(1, maxPage)		
		return (
			this.props.children({
				pages,
				currentPage,
				handleNumClick: this.handleNumClick,
				handleBackClick: this.handleArrowClick(-1),
				handleNextClick: this.handleArrowClick(1),
				hidePrevArrow: pages.indexOf(currentPage) === 0,
				hideNextArrow: pages.indexOf(currentPage) === pages.length - 1
			})
		)
	}
}
