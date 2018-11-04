import baseUrl from '../constants/baseUrl'

function apiReq (baseUrl) {
  return ({endpoint, method, successFn, errorFn}) => {
    return fetch(`${baseUrl}${endpoint}`, {method})
    .then(res => res.json())
    .then(data => {
      successFn(data)
    })
  }
}

export default apiReq(baseUrl)
