import React, { Component } from 'react'
import './App.css'
import SamplePost from './components/SamplePost'
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <SamplePost slug={'sample-page'} />
        <Header />
      </React.Fragment>
    )
  }
}

export default App
