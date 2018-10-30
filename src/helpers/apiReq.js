import baseUrl from '../constants/baseUrl'

function apiReq (baseUrl) {
  return ({endpoint, method, successFn, errorFn}) => {
    return fetch(`${baseUrl}${endpoint}`)
    .then(res => res.json())
    .then(data => {
      // insert ui (e.g. loader) stuff here
      successFn(data)
    })
  }
}

export default apiReq(baseUrl)
