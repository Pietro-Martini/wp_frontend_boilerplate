import baseUrl from '../constants/baseUrl'
import {
    appResourcesUrlExtension,
    jwtAuthTokenUrlExtension
} from '../constants/urlExtensions'

function apiReq (baseUrl) {
  return urlExtension => ({
      endpoint,
      headers,
      body,
      method,
      fn
  }) => {
      const url = `${baseUrl}${urlExtension}${endpoint}`
      const fetchArgs = {method, body, headers}

    fetch(url, fetchArgs)
    .then(res => res.json())
    .then(fn)
  }
}

const apiReqWithBaseUrl = apiReq(baseUrl)

export const apiReqAppResources = apiReqWithBaseUrl(appResourcesUrlExtension)
export const apiReqJWTAuthToken = apiReqWithBaseUrl(jwtAuthTokenUrlExtension)
