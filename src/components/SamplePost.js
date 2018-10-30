import React from 'react'
import {PageAPI} from '../renderProps/apiCommunicator'

const SamplePost = props => {
  return <PageAPI slug={props.slug} render={entityData => {
    return <div></div>
  }}/>
}

export default SamplePost
