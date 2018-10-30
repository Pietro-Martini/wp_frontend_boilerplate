import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {PagesAPI} from './renderProps/apiCommunicator'
import pageComponents from './constants/pageComponents'

class App extends Component {
  render () {
    return (
      <Router>
        <PagesAPI
          render={pages => (
            <div className='app'>
              <Header />
              {createRoutes(pages)}
              <Footer />
            </div>
          )}
        />
      </Router>

    )
  }
}

const createRoutes = pages => {
  return pages.map(({slug}) => (
    <Route
      key={slug}
      component={pageComponents[slug]}
      path={`/${slug}`}
      exact
    />
  ))
}

export default App
