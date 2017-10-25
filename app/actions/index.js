import axios from 'axios'

import { ROOT_URL, STATIC_URL, API_URL } from '../../config/config'


export function setLogin(user, platform) {
  return {
    type: 'LOGIN',
    user,
    platform,
  }
}

export function setLogout() {
  return {
    type: 'LOGOUT',
  }
}

function _signedUpUser(signedUpUser) {
  return {
    type: 'SIGNED_UP_USER',
    signedUpUser,
  }
}

function _setFeedList({feedList, currentPage, totalPage}) {
  return {
    type: 'SET_FEED_LIST',
    feedList,
    currentPage,
    totalPage,
  }
}

function _addFeedList({feedList, currentPage, totalPage}) {
  return {
    type: 'ADD_FEED_LIST',
    feedList,
    currentPage,
    totalPage,
  }
}

function _deleteFeed(feedId) {
  return {
    type: 'DELETE_FEED',
    feedId,
  }
}

function _setNewsList(newsList) {
  return {
    type: 'SET_NEWS_LIST',
    newsList,
  }
}

function _setBeerRank(beerRank) {
  return {
    type: 'SET_BEER_RANK',
    beerRank,
  }
}

function _setBeerList(beerList) {
  return {
    type: 'SET_BEER_LIST',
    beerList
  }
}

function _setBeerDetail(beerDetail) {
  return {
    type: 'SET_BEER_DETAIL',
    beerDetail,
  }
}

function _setPubRank(pubRank) {
  return {
    type: 'SET_PUB_RANK',
    pubRank,
  }
}

function _setPubList(pubList) {
  return {
    type: 'SET_PUB_LIST',
    pubList
  }
}

function _setPubDetail(pubDetail) {
  return {
    type: 'SET_PUB_DETAIL',
    pubDetail,
  }
}

function _setUserDetail(feedList, pubCounter, beerCounter) {
  return {
    type: 'SET_USER_DETAIL',
    feedList,
    pubCounter,
    beerCounter,
  }
}

function _setMyFeed(myFeed) {
  return {
    type: 'SET_MY_FEED',
    myFeed,
  }
}

function _setMyPub(myPub) {
  return {
    type: 'SET_MY_PUB',
    myPub,
  }
}

function _setMyBeer(myBeer) {
  return {
    type: 'SET_MY_BEER',
    myBeer,
  }
}

function _actionsProvider(options, cb) {
  return axios({
    method: options.method || 'GET',
    url: options.url,
    headers: options.headers || {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json'
    },
    params: options.params || null,
    data: options.data || null,
  }).then(results => {
    if (results.data.code === 200 && cb && typeof cb === 'function') {
      cb(results)
    }
  }).catch((err) => console.log(err))
}

export function addUser(params) {
  return (dispatch, getState) => {
    _actionsProvider({
      method: 'POST',
      url: `${API_URL}/user`,
      params,
    }, (results) => {
      dispatch(_signedUpUser(results.data.results))
    })
  }
}

export function addFeed(data, cb) {
  return (dispatch, getState) => {
    _actionsProvider({
      method: 'POST',
      url: `${API_URL}/feed`,
      data,
    }, (results) => {
      if (results.data.results._id
        && results.data.results._id.length === 24
        && cb
        && typeof cb === 'function') {
        cb()
      }
    })
  }
}

export function modifyFeed(feedId, data, cb) {
  return (dispatch, getState) => {
    _actionsProvider({
      method: 'PUT',
      url: `${API_URL}/feed/${feedId}`,
      data,
    }, (results) => {
      if (results.data.results.nModified === 1
        && results.data.results.ok === 1
        && cb
        && typeof cb === 'function') {
        cb()
      }
    })
  }
}

export function deleteFeed(_id) {
  return (dispatch, getState) => {
    _actionsProvider({
      method: 'DELETE',
      url: `${API_URL}/feed/${_id}`,
    }, (results) => {
      if (results.data && results.data.results && results.data.results.ok === 1) {
          dispatch(_deleteFeed(_id))
      }
    })
  }
}

export function getFeedList(type=false, page=1, count=20) {
  let url = `${API_URL}/feed`
  url = type ? `${url}?type=all` : `${url}?page=${page}&count=${count}`

  return (dispatch, getState) => {
    _actionsProvider({
      url,
    }, (results) => {
      if (page === 1) {
        dispatch(_setFeedList(results.data.results))
      } else {
        dispatch(_addFeedList(results.data.results))
      }
    })
  }
}

export function getAllNewsList() {
  return (dispatch, getState) => {
    _actionsProvider({
      url: `${API_URL}/news`
    }, (results) => {
      dispatch(_setNewsList(results.data.results))
    })
  }
}

export function getBeerRank() {
  let url = `${API_URL}/beer/rank`

  return (dispatch, getState) => {
    _actionsProvider({
      url,
    }, (results) => {
      dispatch(_setBeerRank(results.data.results))
    })
  }
}

export function getBeerList(keyword) {
  let url = `${API_URL}/beer?type=all`
  url = keyword ? `${url}&keyword=${keyword}` : url

  return (dispatch, getState) => {
    _actionsProvider({
      url,
    }, (results) => {
      dispatch(_setBeerList(results.data.results))
    })
  }
}

export function getBeerDetail(_id) {
  let url = `${API_URL}/beer/${_id}`

  return (dispatch, getState) => {
    _actionsProvider({
      url,
    }, (results) => {
      dispatch(_setBeerDetail(results.data.results))
    })
  }
}

export function removeBeerDetail() {
  return (dispatch, getState) => {
    dispatch(_setBeerDetail(null))
  }
}

export function getPubRank() {
  let url = `${API_URL}/pub/rank`

  return (dispatch, getState) => {
    _actionsProvider({
      url,
    }, (results) => {
      dispatch(_setPubRank(results.data.results))
    })
  }
}

export function getPubList(keyword) {
  let url = `${API_URL}/pub?type=all`
  url = keyword ? `${url}&keyword=${keyword}` : url

  return (dispatch, getState) => {
    _actionsProvider({
      url,
    }, (results) => {
      dispatch(_setPubList(results.data.results))
    })
  }
}

export function getPubDetail(_id) {
  let url = `${API_URL}/pub/${_id}`

  return (dispatch, getState) => {
    _actionsProvider({
      url,
    }, (results) => {
      dispatch(_setPubDetail(results.data.results))
    })
  }
}

export function removePubDetail() {
  return (dispatch, getState) => {
    dispatch(_setPubDetail(null))
  }
}

export function getUserDetail(_id) {
  const url = `${API_URL}/user/${_id}`

  return (dispatch, getState) => {
    _actionsProvider({
      url,
    }, (results) => {
      let pubCounter = {}
      let beerCounter = {}
      const feedList = results.data.results._feeds
      feedList.map((v, k) => {
        if (pubCounter[v.pub._id] && pubCounter[v.pub._id]['count']) {
          pubCounter[v.pub._id]['count']++
        } else {
          pubCounter[v.pub._id] = {
            count: 1,
            pub: v.pub,
          }
        }

        v.beers.map((v2, k2) => {
          if (beerCounter[v2._id] && beerCounter[v2._id]['count']) {
            beerCounter[v2._id]['count']++
          } else {
            beerCounter[v2._id] = {
              count: 1,
              beer: v2,
            }
          }
        })
      })
      dispatch(_setUserDetail(feedList, pubCounter, beerCounter))
    })
  }
}
