import React from 'react'
import {Route} from 'react-router-dom'

import pageComponents from '../constants/pageComponents'
import compose from '../helpers/compose'
import encodeQueryParams from '../helpers/encodeQueryParams'
import convertToSlug from '../helpers/convertToSlug'
import getCollBasedOnVal from '../helpers/getCollBasedOnVal'
import includes from '../helpers/includes'
import Post from './Post'

const Main = ({routes}) => (
  <div className='main container'>{routes}</div>
)

export default class extends React.Component {
  componentDidMount = () => {
      this.props.getPages()
      this.props.getPosts()
  }

  render = () => {
    const createRoutes = compose(createDefaultUrlFallback, mapRoutes(this.props)) 
    return <Main routes={createRoutes([...this.props.pages, ...this.props.posts])} />
  }


}

const mapRoutes = ({pages, posts, history, setDataFetching}) => routeResources => routeResources.map(resource => {  
  const resourceSlug = resource.slug || convertToSlug(resource.title.rendered || resource.title)
  // if a corresponding component isn't found in this collection
  // then we assume that it is a Post
  const Component = pageComponents[resourceSlug] || Post  
  return (
    <Route
      key={resourceSlug}
      render={() => (
          <Component              
              {...resource}
              pages={pages}
              posts={posts}
              setDataFetching={setDataFetching}
              history={history}
          />
      )}
      path={`/${resourceSlug}`}
      exact
    />
  )
})

const createDefaultUrlFallback = routeResources => routeResources.reduce((newColl, r) => {
  const homeRoute = getCollBasedOnVal(r, 'home')
  if (homeRoute){
    newColl.push({...homeRoute, slug: ''})
  } else {
    newColl.push(r)
  }
  return newColl
}, [])
