import React from 'react'
import {Route} from 'react-router-dom'

import pageComponents from '../constants/pageComponents'
import {keepPropsInObj} from '../helpers/filterPropsFromObj'
import withConsumer from '../helpers/withConsumer'
import compose from '../helpers/compose'
import encodeQueryParams from '../helpers/encodeQueryParams'
import getCollBasedOnVal from '../helpers/getCollBasedOnVal'

import {DatastoreConsumer} from '../providers/DataStoreProvider'

class Main extends React.Component {
  componentDidMount = () => {
    const {getPage, getPages} = this.props
    
    getPage(encodeQueryParams({slug: 'home'}))
    getPages()
  }

  render = () => {
    const {pages, page} = this.props

    const createRoutes = compose(createDefaultUrlFallback,
      pages => pages.map(p => {
        const Component = pageComponents[p.slug]
        return (
          <Route
            key={p.slug}
            render={() => <Component page={page} />}
            path={`/${p.slug}`}
            exact
          />
        )
    }))

    return createRoutes(pages)
  }
}

export default withConsumer(DatastoreConsumer)(pageAPIMethods => <Main {...pageAPIMethods}/>)

const createDefaultUrlFallback = pages => pages.reduce((newColl, p) => {
  const homeRoute = getCollBasedOnVal(p, 'home')
  if (homeRoute) newColl.push({...homeRoute, slug: ''})
  newColl.push(p)
  return newColl
}, [])
