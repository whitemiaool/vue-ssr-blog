// this is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'

const logRequests = !!process.env.DEBUG_API

const api = createAPI({
  version: '/v0',
  config: {
    databaseURL: 'https://hacker-news.firebaseio.com'
  }
})

// warm the front page cache every 15 min
// make sure to do this only once across all requests
if (api.onServer) {
  warmCache()
}

function warmCache () {
  fetchItems((api.cachedIds.top || []).slice(0, 30))
  setTimeout(warmCache, 1000 * 60 * 15)
}

function fetch (child) {
  // console.log(`fetching ${child}...`)
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    logRequests && console.log(`cache hit for ${child}.`)
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
        // mark the timestamp when this item is cached
        if (val) val.__lastUpdated = Date.now()
        cache && cache.set(child, val)
        logRequests && console.log(`fetched ${child}.`)
        resolve(val)
      }, reject)
    })
  }
}

export function fetchIdsByType (type) {
  return api.cachedIds && api.cachedIds[type]
    ? Promise.resolve(api.cachedIds[type])
    : fetch(`${type}stories`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}

export function watchList (type, cb) {
  let first = true
  const ref = api.child(`${type}stories`)
  const handler = snapshot => {
    if (first) {
      first = false
    } else {
      cb(snapshot.val())
    }
  }
  ref.on('value', handler)
  return () => {
    ref.off('value', handler)
  }
}


/**
 * Created by lin on 2017/8/25.
 */

import axios from 'axios';
let api2;

axios.defaults.baseURL = 'https://dyxuan.top/api/';
// axios.defaults.baseURL = 'http://localhost:3000';
console.log(axios.defaults.baseURL)
axios.defaults.timeout = 10000;

axios.interceptors.response.use((res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  return Promise.reject(res);
}, (error) => {
  return Promise.reject({message: '网络异常，请刷新重试', err: error});
});

// if (process.__API__) {
//   api2 = process.__API__;
// } else {
  api2 = {
    get: function(url) {
      return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    post: function(target, options = {}) {
      return new Promise((resolve, reject) => {
        axios.post(target, options).then(res => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  };
// }

export function getbar() {
  return api2.get('getbar');
}


export const getrepo = function () {
  return api2.get('githubrep')
}

export const addpaper = function (o) {
  return api2.post('addonepaper',o)
}

export const delonepaper = function (o) {
  return api2.post('delonepaper',o)
}
export const getallpaper = function (o) {
  return api2.post('getallpaper',o)
}
export const getonepaper = function (o) {
  return api2.post('getonepaper',o)
}
export const getpact = function (o) {
  return api2.post('getpact',o)
}
export const updatepaper = function (o) {
  return api2.post('updatepaper',o)
}
export const clickstar = function (o) {
  return api2.post('clickstar',o)
}
export const commentpaper = function (o) {
  return api2.post('commentpaper',o)
}


export const getpapercom = function (o) {
  return api2.post('getpapercom',o)
}
export const starcomment = function (o) {
  return api2.post('starcomment',o)
}
export const addtopic = function (o) {
  return api2.post('addonetopic',o)
}
export const getopic = function () {
  return api2.get('getalltopic')
}
export const deltopic = function (o) {
  return api2.post('delonetopic',o)
}

// export const getbar = function () {
//   return api.get('getbar')
// }
