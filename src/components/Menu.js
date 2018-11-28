import React from 'react'

import ActiveStateToggling from '../renderProps/ActiveStateToggling'
import Pagination from '../renderProps/Pagination'
import {AuthenticationConsumer} from '../providers/AuthenticationProvider'

import {SearchAPI} from '../renderProps/API'

import MenuList from './MenuList'
import MenuToggle from './MenuToggle'
import encodeQueryParams from '../helpers/encodeQueryParams'

import SearchToggle from './SearchToggle'
import {SearchForm} from '../renderProps/Form'
import SearchList from './SearchList'
import SearchPagination from './SearchPagination'

const Menu = ({active, toggleActiveState, logout, loggedIn, history, setDataFetching}) => (
  <nav className='menu container'>
    <ActiveStateToggling>
      {({active, toggleActiveState}) => (
        <React.Fragment>
          <MenuToggle
            toggleActiveState={toggleActiveState}
            active={active}
          />
          <MenuList
            active={active}
            logout={logout}
            loggedIn={loggedIn}
            setDataFetching={setDataFetching}
          />
        </React.Fragment>
      )}
    </ActiveStateToggling>
    <ActiveStateToggling>
      {({active, toggleActiveState}) => (
        <React.Fragment>
          <SearchToggle toggleActiveState={toggleActiveState} />
          <div className={`search-dropdown ${active ? '' : 'inactive'}`}>
            <SearchAPI setDataFetching={setDataFetching}>
              {({getSearchResults, searchResults, searchResultsResetState}) => (
                <Pagination
                  itemCount={searchResults.search_count}
                  itemsPerPage={searchResults.results_per_page}
                >
                  {pagination => (
                    <SearchForm
                      getSearchResults={getSearchResults}
                      preserveFormStateOnSubmit
                      onSubmit={body => {
                        const queryParams = encodeQueryParams({...body, page: 1})
                        getSearchResults({queryParams})
                      }}
                    >
                      {({fieldVals: {search}}) => (
                        <React.Fragment>
                          <SearchList
                            searchResults={searchResults}
                            searchResultsResetState={searchResultsResetState}
                            toggleActiveState={toggleActiveState}
                          />
                          <SearchPagination
                            {...pagination}
                            search={search}
                            getSearchResults={getSearchResults}
                          />
                        </React.Fragment>
                      )}
                    </SearchForm>
                  )}
                </Pagination>
              )}
            </SearchAPI>
          </div>
        </React.Fragment>
      )}
    </ActiveStateToggling>
  </nav>
)

export default ({setDataFetching}) => {
  return (
    <AuthenticationConsumer>
      {({logout, loggedIn}) => (
        <Menu
          logout={logout}
          loggedIn={loggedIn}
          setDataFetching={setDataFetching}
        />
      )}
    </AuthenticationConsumer>
  )
}
