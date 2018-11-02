import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'
import Loader from './components/Loader'

import Home from './components/Home'

import {BrowserRouter as Router, Route} from 'react-router-dom'
import pageComponents from './constants/pageComponents'
import {keepPropsInObj} from './helpers/filterPropsFromObj'
import withConsumer from './helpers/withConsumer'
import compose from './helpers/compose'
import includes from './helpers/includes'
import getCollBasedOnVal from './helpers/getCollBasedOnVal'
import DataStoreProvider, {DatastoreConsumer} from './providers/DataStoreProvider'

class App extends Component {
  render () {
    return (
      <Router>
          <DataStoreProvider>
              {({pages}) => {
                  const createRoutes = compose(createDefaultUrlFallback, renderRoutes)
                  return (
                      <div className='app'>
                        <Header />
                        <Loader />
                        {createRoutes(pages)}
                        <Footer />
                      </div>
                  )
              }}
          </DataStoreProvider>
      </Router>

    )
  }
}

const createDefaultUrlFallback = pages => pages.reduce((newColl, p) => {
  const homeRoute = getCollBasedOnVal(p, 'home')
  if (homeRoute) newColl.push({...homeRoute, slug: ''})
  newColl.push(p)
  return newColl
}, [])

const renderRoutes = pages => pages.map(p => {
  return (
    <Route
      key={p.slug}
      render={withConsumer(DatastoreConsumer)(({page}) => {
          const Component = pageComponents[p.slug]
          return <Component page={page}/>
      })}
      path={`/${p.slug}`}
      exact
    />
  )
})

export default App
