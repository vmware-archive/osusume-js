import expect from 'expect'
import {List, fromJS} from 'immutable'
import restaurants from '../../src/js/reducers/RestaurantReducer'
import * as types from '../../src/js/constants/ActionTypes'

describe('RestaurantReducer', () => {
  it('returns the list of restaurants when the action is FETCH_RESTAURANTS_SUCCESS', () => {
    let returnedRestaurants = [
      {id: 0, name: 'Afuri'},
      {id: 1, name: 'Tsukemen'}
    ]
    let action = {
      type: types.FETCH_RESTAURANTS_SUCCESS,
      restaurants: returnedRestaurants
    }

    expect(restaurants(undefined, action)).toEqual(fromJS([
      {id: 0, name: 'Afuri'},
      {id: 1, name: 'Tsukemen'}
    ]))
  })

  it('returns a restaurant when the action is FETCH_RESTAURANT_SUCCESS', () => {
    let restaurant = {id: 0, name: 'Afuri', comments: ['i love it']}
    let action = {
      type: types.FETCH_RESTAURANT_SUCCESS,
      restaurant: restaurant
    }

    let state = fromJS([
      {id: 0, name: 'Afuri'},
      {id: 1, name: 'Pizzakaya'}
    ])

    expect(restaurants(state, action)).toEqual(fromJS([
      {id: 0, name: 'Afuri', comments: ['i love it']},
      {id: 1, name: 'Pizzakaya'}
    ]))
  })

  it('returns a restaurant when the action is FETCH_RESTAURANT_SUCCESS and there are no restaurants yet', () => {
    let restaurant = {id: 0, name: 'Afuri', comments: ['i love it']}
    let action = {
      type: types.FETCH_RESTAURANT_SUCCESS,
      restaurant: restaurant
    }

    expect(restaurants(undefined, action)).toEqual(fromJS([restaurant]))
  })

  it('returns the restaurant with number of likes when the action is CREATE_LIKE_SUCCESS', () => {
    let currentState = fromJS([
      {id: 2, comment: 'another one'},
      {id: 1, comment: 'this is second comment', num_likes: 2, liked: false},
    ])
    let action = {
      type: types.CREATE_LIKE_SUCCESS,
      restaurantId: 1
    }

    expect(restaurants(currentState, action)).toEqual(fromJS([
      {id: 2, comment: 'another one'},
      {id: 1, comment: 'this is second comment', num_likes: 3, liked: true}
    ]))
  })

  it('returns the restaurant with number of likes when the action is CREATE_LIKE_SUCCESS and it is the first like', () => {
    let currentState = fromJS([
      {id: 1},
    ])
    let action = {
      type: types.CREATE_LIKE_SUCCESS,
      restaurantId: 1
    }

    expect(restaurants(currentState, action)).toEqual(fromJS([
      {id: 1, num_likes: 1, liked: true}
    ]))
  })

  it('returns the restaurant with number of likes when the action is REMOVE_LIKE_SUCCESS', () => {
    let currentState = fromJS([
      {id: 2, comment: 'another one'},
      {id: 1, comment: 'this is second comment', num_likes: 2, liked: true}
    ])
    let action = {
      type: types.REMOVE_LIKE_SUCCESS,
      restaurantId: 1
    }
    let updatedRestaurants = fromJS([
      {id: 2, comment: 'another one'},
      {id: 1, comment: 'this is second comment', num_likes: 1, liked: false}
    ])

    expect(restaurants(currentState, action)).toEqual(updatedRestaurants)
  })

  it('returns the restaurant with number of likes when the action is REMOVE_LIKE_SUCCESS and it is the first remove like', () => {
    let currentState = fromJS([
      {id: 1, num_likes: 1, liked: true}
    ])
    let action = {
      type: types.REMOVE_LIKE_SUCCESS,
      restaurantId: 1
    }

    expect(restaurants(currentState, action)).toEqual(fromJS([
      {id: 1, num_likes: 0, liked: false}
    ]))
  })

  it('returns empty array by default', () => {
    expect(restaurants(undefined, {})).toEqual(fromJS([]))
  })
})
