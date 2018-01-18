import fetch from 'isomorphic-fetch'

export const SERVER_STATE_REQUEST = 'SERVER_STATE_REQUEST'
export const SERVER_STATE_SUCCEED = 'SERVER_STATE_SUCCEED'
export const SERVER_STATE_FAILED = 'SERVER_STATE_FAILED'

//服务端使用http.request方法需要完整路径
//客户端使用ajax，使用相对路径
//这里也可以使用 __SERVER__ ＝ typeof window !== 'undefined'
const fetchHomeUrl = 'http://rap.weimob.com/mockjsdata/65/promotion/groupon/client/groupon/details2';//'http://localhost:3010/api/test';

function fetchHome(){
  return dispatch => {
    dispatch(serverHomeRequest())
    return fetch(fetchHomeUrl)
      .then(res => {
        res.json()
      })
      .then(data => {
        dispatch(serverHomeSucceed(data))
      })
      .catch(e => dispatch(serverHomeFailed(e)))
  }
}

export function fetchHomeServerState (state) {
  return (dispatch) => {
    return dispatch(fetchHome())
  }
}

export function serverHomeRequest () {
  return {
    type: SERVER_STATE_REQUEST
  }
}
export function serverHomeSucceed (data) {
  return {
    type: SERVER_STATE_SUCCEED,
    data: data
  }
}
export function serverHomeFailed (error) {
  console.log('server state get failed', error)
  return {
    type: SERVER_STATE_FAILED,
    error
  }
}
