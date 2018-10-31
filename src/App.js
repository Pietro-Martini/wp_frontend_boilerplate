import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import pageComponents from './constants/pageComponents'
import {keepPropsInObj} from './helpers/filterPropsFromObj'
import DataStoreProvider from './providers/DataStoreProvider'

class App extends Component {
  render () {
    return (
      <Router>
          <DataStoreProvider>
              {({pages}) => {
                  return (
                      <div className='app'>
                        <Header />
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

const createRoutes = pages => pages.map(page => (
  <Route
    key={page.slug}
    component={pageComponents[page.slug]}
    path={`/${page.slug}`}
    exact
  />
))

export default App
