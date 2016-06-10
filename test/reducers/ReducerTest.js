import expect from 'expect'
import reducer from '../../src/js/reducers/Reducer'
import * as types from '../../src/js/constants/ActionTypes'
import * as restaurantReducer from '../../src/js/reducers/RestaurantReducer'

describe('Reducer', () => {
  afterEach(function () {
    expect.restoreSpies()
  })

  it('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      restaurants: [],
      suggestions: [],
      cuisineTypes: [],
      priceRanges: [],
      comments: []
    })
  })

  it('calls restaurants when the action is FETCH_RESTAURANTS_SUCCESS', () => {
    let restaurants = [
      {id: 0, name: 'Afuri'},
      {id: 1, name: 'Tsukemen'}
    ]
    let action = {
      type: types.FETCH_RESTAURANTS_SUCCESS,
      restaurants: restaurants
    }
    let state = {
      restaurants: [],
      suggestions: [],
      cuisineTypes: [],
      priceRanges: [],
      comments: []
    }
    var spy = expect.spyOn(restaurantReducer, 'restaurants')
    reducer(state, action)
    expect(spy).toHaveBeenCalledWith(state.restaurants, action)
  })

  it('calls restaurants when the action is FETCH_RESTAURANT_SUCCESS', () => {
    let restaurant = {id: 0, name: 'Afuri'}
    let action = {
      type: types.FETCH_RESTAURANT_SUCCESS,
      restaurant: restaurant
    }
    let state = {
      restaurants: [],
      suggestions: [],
      cuisineTypes: [],
      priceRanges: [],
      comments: []
    }
    var spy = expect.spyOn(restaurantReducer, 'restaurants')
    reducer(state, action)
    expect(spy).toHaveBeenCalledWith(state.restaurants, action)
  })

  it('calls restaurants when the action is CREATE_RESTAURANT_SUCCESS', () => {
    let restaurant = {id: 0, name: 'Afuri'}

    let action = {
      type: types.CREATE_RESTAURANT_SUCCESS,
      restaurant: restaurant
    }
    let state = {
      restaurants: [],
      suggestions: [],
      cuisineTypes: [],
      priceRanges: [],
      comments: []
    }
    var spy = expect.spyOn(restaurantReducer, 'restaurants')
    reducer(state, action)
    expect(spy).toHaveBeenCalledWith(state.restaurants, action)
  })


  it('returns the list of suggestions when the action is FETCH_SUGGESTIONS_SUCCESS', () => {
    let suggestions  = [
      {name: 'Afuri', address: 'Roppongi'},
      {name: 'Singaporean Chicken', address: 'Roppongi'}
    ]
    let action = {
      type: types.FETCH_SUGGESTIONS_SUCCESS,
      suggestions: suggestions
    }

    expect(reducer(undefined, action)).toEqual({
      restaurants: [],
      suggestions: suggestions,
      cuisineTypes: [],
      priceRanges: [],
      comments: []
    })
  })

  it('returns the cuisine types the action is FETCH_CUISINE_TYPES_SUCCESS', () => {
    let cuisineTypes = [
      {id: 0, name: 'Not Specified'},
      {id: 1, name: 'Japanese'},
      {id: 2, name: 'French'}
    ]
    let action = {
      type: types.FETCH_CUISINE_TYPES_SUCCESS,
      cuisineTypes: cuisineTypes
    }

    expect(reducer(undefined, action)).toEqual({
      restaurants: [],
      suggestions: [],
      cuisineTypes: cuisineTypes,
      priceRanges: [],
      comments: []
    })
  })

  it('returns the price ranges the action is FETCH_PRICE_RANGES_SUCCESS', () => {
    let priceRanges = [
      {id: 0, range: 'Not Specified'},
      {id: 1, range: '¥0~999'},
      {id: 2, range: '¥1000~1999'}
    ]
    let action = {
      type: types.FETCH_PRICE_RANGES_SUCCESS,
      priceRanges: priceRanges
    }

    expect(reducer(undefined, action)).toEqual({
      restaurants: [],
      suggestions: [],
      cuisineTypes: [],
      priceRanges: priceRanges,
      comments: []
    })
  })

  it('returns the comments the action is FETCH_COMMENTS_SUCCESS', () => {
    let comments = [
      {id: 0, content: 'It is delicious'},
      {id: 1, content: 'this is second comment'}
    ]
    let action = {
      type: types.FETCH_COMMENTS_SUCCESS,
      comments: comments
    }

    expect(reducer(undefined, action)).toEqual({
      restaurants: [],
      suggestions: [],
      cuisineTypes: [],
      priceRanges: [],
      comments: comments
    })
  })
})
