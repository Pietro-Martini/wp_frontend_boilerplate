import React from 'react'
import {Route} from 'react-router-dom'

import pageComponents from '../constants/pageComponents'
import {keepPropsInObj} from '../helpers/filterPropsFromObj'
import compose from '../helpers/compose'
import encodeQueryParams from '../helpers/encodeQueryParams'
import getCollBasedOnVal from '../helpers/getCollBasedOnVal'

class Main extends React.Component {
  componentDidMount = () => {
    const {getPage, getPages, history} = this.props

    const initialPage = history.location.pathname.slice(1)
    const queryParams = encodeQueryParams({slug: initialPage})

    getPage({queryParams})
    getPages()
  }

  render = () => {
    const {pages, page, history} = this.props

    const createRoutes = compose(createDefaultUrlFallback,
      pages => pages.map(p => {          
        const Component = pageComponents[p.slug]
        return (
          <Route
            key={p.slug}
            render={() => <Component page={page} history={history} />}
            path={`/${p.slug}`}
            exact
          />
        )
    }))

    return createRoutes(pages)
  }
}

export default Main

const createDefaultUrlFallback = pages => pages.reduce((newColl, p) => {
  const homeRoute = getCollBasedOnVal(p, 'home')
  if (homeRoute) newColl.push({...homeRoute, slug: ''})
  newColl.push(p)
  return newColl
}, [])
