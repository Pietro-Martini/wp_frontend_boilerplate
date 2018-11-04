import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Main from './components/Main'

import Home from './components/Home'

import {BrowserRouter as Router} from 'react-router-dom'
import DataStoreProvider from './providers/DataStoreProvider'

class App extends Component {
  render () {
    return (
      <Router>
          <DataStoreProvider>
            <div className='app'>
              <Header />
              <Loader />
              <Main />
              <Footer />
            </div>
          </DataStoreProvider>
      </Router>

    )
  }
}

export default App
