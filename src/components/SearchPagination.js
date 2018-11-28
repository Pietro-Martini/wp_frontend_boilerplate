import React from 'react'

import encodeQueryParams from '../helpers/encodeQueryParams'

const SearchPagination = ({
  pages,
  hidePrevArrow,
  hideNextArrow,
  handleNumClick,
  handleBackClick,
  handleNextClick,
  paginationUpdateCb
}) => {
  return pages.length ? (
    <div className='pagination'>
      {!hidePrevArrow && <div onClick={e => handleBackClick(paginationUpdateCb)}>Previous</div>}
      	<ul className='pagination__list'>
        {pages.map(p => (
          <li onClick={e => handleNumClick(p, paginationUpdateCb)}>{p}</li>
      		))}
      	</ul>
      {!hideNextArrow && <div onClick={e => handleNextClick(paginationUpdateCb)}>Next</div>}
    </div>
  ) : null
}

export default props => {
  const paginationUpdateCb = page => {
  	const queryParams = encodeQueryParams({page, search: props.search})
  	props.getSearchResults({queryParams})
  }

  const {pages, currentPage} = props

  const hidePrevArrow = pages.indexOf(currentPage) === 0
  const hideNextArrow = pages.indexOf(currentPage) === props.pages.length - 1

  return (
    <SearchPagination
      pages={props.pages}
      hidePrevArrow={hidePrevArrow}
      hideNextArrow={hideNextArrow}
      handleNumClick={props.handleNumClick}
      handleBackClick={props.handleBackClick}
      handleNextClick={props.handleNextClick}
      paginationUpdateCb={paginationUpdateCb}
    />
  )
}
