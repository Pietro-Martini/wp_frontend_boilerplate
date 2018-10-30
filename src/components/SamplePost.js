import React from 'react'
import {PageAPI} from '../renderProps/apiCommunicator'

import removePropsFromObj from '../helpers/removePropsFromObj'

const SamplePost = props => {
  return <PageAPI queryColl={removePropsFromObj(props, 'render')} render={entityData => {
    return <div />
  }} />
}

export default SamplePost
