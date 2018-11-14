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
import UI from './renderProps/UI'

import {AuthenticationProvider} from './providers/AuthenticationProvider'

class App extends Component {
  render () {
    return (
      <Router>
          <Route path='*' render={({history}) => (
              <AuthenticationProvider>
                  <UI>
                      {({dataFetching, setDataFetching}) => (
                          <PagesAPI setDataFetching={setDataFetching}>
                              {pageAPI => (
                                  <div className='app'>
                                    <Header {...pageAPI} setDataFetching={setDataFetching} />
                                    <Loader {...pageAPI} dataFetching={dataFetching} />
                                    <Main {...pageAPI} history={history} setDataFetching={setDataFetching} />
                                    <Footer />
                                  </div>
                              )}
                          </PagesAPI>
                      )}
                  </UI>
              </AuthenticationProvider>
          )} />
      </Router>

    )
  }
}

export default App
