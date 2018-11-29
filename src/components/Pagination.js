import React from 'react'

export default ({
  pages,
  hidePrevArrow,
  hideNextArrow,
  handleNumClick,
  handleBackClick,
  handleNextClick,
  paginationUpdateFn
}) => {
  return pages.length ? (
    <div className='pagination'>
      {!hidePrevArrow && <div onClick={e => handleBackClick(paginationUpdateFn)}>Previous</div>}
      <ul className='pagination__list'>
        {pages.map(p => (
          <li onClick={e => handleNumClick(p, paginationUpdateFn)}>{p}</li>
        ))}
      </ul>
      {!hideNextArrow && <div onClick={e => handleNextClick(paginationUpdateFn)}>Next</div>}
    </div>
  ) : null
}
