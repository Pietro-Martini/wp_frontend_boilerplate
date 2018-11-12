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
      successFn,
      errorFn
  }) => {
    return fetch(
        `${baseUrl}${urlExtension}${endpoint}`,
        {method, body, headers}
    )
    .then(res => res.json())
    .then(successFn)
  }
}

const apiReqWithBaseUrl = apiReq(baseUrl)

export const apiReqAppResources = apiReqWithBaseUrl(appResourcesUrlExtension)
export const apiReqJWTAuthToken = apiReqWithBaseUrl(jwtAuthTokenUrlExtension)
