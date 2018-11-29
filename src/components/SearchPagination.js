import React from 'react'

import encodeQueryParams from '../helpers/encodeQueryParams'
import PaginationComponent from './Pagination'

export default props => {
  const paginationUpdateFn = page => {
  	const queryParams = encodeQueryParams({page, search: props.search})
  	props.getSearchResults({queryParams})
  }

  return (
    <PaginationComponent
      pages={props.pages}
      hidePrevArrow={props.hidePrevArrow}
      hideNextArrow={props.hideNextArrow}
      handleNumClick={props.handleNumClick}
      handleBackClick={props.handleBackClick}
      handleNextClick={props.handleNextClick}
      paginationUpdateFn={paginationUpdateFn}
    />
  )
}
