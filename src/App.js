import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {PagesAPI} from './renderProps/apiCommunicator'
import UI from './renderProps/UI'
import pageComponents from './constants/pageComponents'
import {keepPropsInObj} from './helpers/filterPropsFromObj'

class App extends Component {
  render () {
    return (
      <Router>
        <PagesAPI
          render={pages => (
              <UI render={({loaderShown, loaderShownFn}) => (
                  <div className='app'>
                    <Header />
                    {
                        createRoutes(
                            {pages, uiActions: {loaderShownFn} }
                        )
                    }
                    <Footer />
                  </div>

              )}/>
          )}
        />
      </Router>

    )
  }
}

const createRoutes = ({pages, uiActions}) => pages.map(page => (
  <Route
    key={page.slug}
    render={() => {
        const Component = pageComponents[page.slug]
        const queryColl = keepPropsInObj(page, 'slug')
        return (
            <Component
                queryColl={queryColl}
                uiActions={uiActions}
            />
        )
    }}
    path={`/${page.slug}`}
    exact
  />
))

export default App
