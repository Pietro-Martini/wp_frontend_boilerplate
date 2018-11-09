import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Main from './components/Main'
import Login from './components/Login'

import Home from './components/Home'

import {BrowserRouter as Router, Route} from 'react-router-dom'
import {PagesAPI} from './renderProps/API'

class App extends Component {
  render () {
    return (
      <Router>
          <Route path='*' render={({history}) => (
              <React.Fragment>
                  <PagesAPI>
                      {pageAPI => (
                          <div className='app'>
                            <Header {...pageAPI} />
                            <Loader {...pageAPI} />
                            <Main {...pageAPI} history={history} />
                            <Footer />
                          </div>
                      )}
                  </PagesAPI>
                  <Login />
              </React.Fragment>
          )} />
      </Router>

    )
  }
}

export default App
