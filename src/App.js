import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './components/Home'

import {BrowserRouter as Router, Route} from 'react-router-dom'
import pageComponents from './constants/pageComponents'
import {keepPropsInObj} from './helpers/filterPropsFromObj'
import withConsumer from './helpers/withConsumer'
import DataStoreProvider, {DatastoreConsumer} from './providers/DataStoreProvider'

class App extends Component {
  render () {
    return (
      <Router>
          <DataStoreProvider>
              {({pages}) => {
                  return (
                      <div className='app'>
                        <Header />
                        <Route path='/(home|/)/' component={Home}/>
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

const createRoutes = pages => pages.map(p => (
  <Route
    key={p.slug}
    render={withConsumer(DatastoreConsumer)(({page}) => {        
        const Component = pageComponents[p.slug]
        return <Component page={page}/>
    })}
    path={`/${p.slug}`}
    exact
  />
))

export default App
