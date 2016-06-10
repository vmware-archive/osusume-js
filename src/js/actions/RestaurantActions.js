import * as types from "../constants/ActionTypes"
import fetch from "isomorphic-fetch"
import {hashHistory} from "react-router"
import {authorizationConfig} from './Authorization'


function receiveRestaurants(json) {
  return {
    type: types.FETCH_RESTAURANTS_SUCCESS,
    restaurants: json
  }
}

function receiveRestaurant(json) {
  return {
    type: types.FETCH_RESTAURANT_SUCCESS,
    restaurant: json
  }
}

function receiveCreatedRestaurant(json) {
  return {
    type: types.CREATE_RESTAURANT_SUCCESS,
    restaurant: json
  }
}

function receiveCreatedComment(json) {
  return {
    type: types.CREATE_COMMENT_SUCCESS,
    comment: json
  }
}

export function fetchRestaurant(restaurantId) {
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants/${restaurantId}`, authorizationConfig())
      .then(response => response.json())
      .then(json => dispatch(receiveRestaurant(json)))
  }
}

export function fetchRestaurants() {
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants`, authorizationConfig())
      .then(response => response.json())
      .then(json => dispatch(receiveRestaurants(json)))
  }
}

function createRestaurant(restaurant) {
  let config = Object.assign({}, authorizationConfig(),
    {
      method: "POST",
      body: JSON.stringify(
        {
          restaurant: restaurant
        }
      )
    }
  )
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants`, config)
    .then(response => response.json())
    .then(json => dispatch(receiveCreatedRestaurant(json)))
  }
}

export function addNewRestaurant(restaurant, file, fileUploader) {
  return dispatch => {
    restaurant['photo_urls'] = []

    if (file == undefined) {
      return dispatch(createRestaurant(restaurant))
    } else {
      return dispatch(uploadPhoto(createRestaurant, restaurant, file, fileUploader))
    }
  }
}

export function createComment(restaurantId, comment) {
  let config = Object.assign({}, authorizationConfig(),
  {
    method: "POST",
    body: JSON.stringify(
      {
        comment: comment
      }
    )
  }
)
  return dispatch => {
    return fetch(`${process.env.API_SERVER}/restaurants/${restaurantId}/comments`, config)
    .then(response => response.json())
    .then(json => dispatch(receiveCreatedComment(json)))
  }
}

function uploadPhoto(nextAction, restaurant, file, fileUploader) {
  return dispatch => {
    return fileUploader.upload(file).then((photoUrl) => {
      let restaurantWithPhotoUrl = Object.assign({}, restaurant, {photo_urls: [{url: photoUrl}]})
      dispatch(nextAction(restaurantWithPhotoUrl))
    })
  }
}
