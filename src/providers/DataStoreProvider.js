import React, { Component } from 'react'
import API from '../renderProps/API'

const DatastoreContext = React.createContext('datastoreContext')

const {Provider} = DatastoreContext

const PagesAPI = API({
  initialState: {
    pages: [],
    page: {}
  },
  fetchArgs: [
    {endpoint: 'pages'},
    {endpoint: 'pages', transformStateFns: [x => x[0]]}
  ]
})

export const DatastoreConsumer = DatastoreContext.Consumer

export default function ({children}) {
  return (
    <PagesAPI>
      {pagesAPIObj => (
        <Provider value={pagesAPIObj}>
          {children}
        </Provider>
      )}
    </PagesAPI>
  )
}
