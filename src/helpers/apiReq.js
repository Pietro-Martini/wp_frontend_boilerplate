import baseUrl from '../constants/baseUrl'

function apiReq (baseUrl) {
  return ({endpoint, body, method, successFn, errorFn}) => {      
    return fetch(`${baseUrl}${endpoint}`, {method, body})
    .then(res => res.json())
    .then(data => {
      successFn(data)
    })
  }
}

export default apiReq(baseUrl)
