import expect from 'expect'
import reducer from '../../src/js/reducers/Reducer'
import * as types from '../../src/js/constants/ActionTypes'
import * as restaurantReducer from '../../src/js/reducers/RestaurantReducer'
import * as commentReducer from '../../src/js/reducers/CommentReducer'
import * as currentUserReducer from '../../src/js/reducers/CurrentUserReducer'

describe('Reducer', () => {
  afterEach(function () {
    expect.restoreSpies()
    localStorage.clear()
  })

  it('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      restaurants: [],
      suggestions: [],
      cuisineTypes: [],
      priceRanges: [],
      comments: [],
      currentUser: null
    })
  })

  it('returns the initial state when localStorage has a user', () => {
    localStorage.setItem('user', JSON.stringify({token: 'token'}))
    expect(
      reducer(undefined, {})
    ).toEqual({
      restaurants: [],
      suggestions: [],
      cuisineTypes: [],
      priceRanges: [],
      comments: [],
      currentUser: {token: 'token'}
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
    var spy = expect.spyOn(restaurantReducer, 'restaurants')
    reducer(undefined, action)
    expect(spy).toHaveBeenCalledWith([], action)
  })

  it('calls restaurants when the action is FETCH_RESTAURANT_SUCCESS', () => {
    let restaurant = {id: 0, name: 'Afuri'}
    let action = {
      type: types.FETCH_RESTAURANT_SUCCESS,
      restaurant: restaurant
    }
    var spy = expect.spyOn(restaurantReducer, 'restaurants')
    reducer(undefined, action)
    expect(spy).toHaveBeenCalledWith([], action)
  })

  it('calls restaurants when the action is CREATE_RESTAURANT_SUCCESS', () => {
    let restaurant = {id: 0, name: 'Afuri'}

    let action = {
      type: types.CREATE_RESTAURANT_SUCCESS,
      restaurant: restaurant
    }
    var spy = expect.spyOn(restaurantReducer, 'restaurants')
    reducer(undefined, action)
    expect(spy).toHaveBeenCalledWith([], action)
  })

  it('calls restaurants when the action is CREATE_LIKE_SUCCESS', () => {
    let action = {
      type: types.CREATE_LIKE_SUCCESS,
      restaurantId: 1
    }
    var spy = expect.spyOn(restaurantReducer, 'restaurants')
    reducer(undefined, action)
    expect(spy).toHaveBeenCalledWith([], action)
  })

  it('calls restaurants when the action is REMOVE_LIKE_SUCCESS', () => {
    let action = {
      type: types.REMOVE_LIKE_SUCCESS,
      restaurantId: 1
    }
    var spy = expect.spyOn(restaurantReducer, 'restaurants')
    reducer(undefined, action)
    expect(spy).toHaveBeenCalledWith([], action)
  })

  it('calls comments when the action is FETCH_COMMENTS_SUCCESS', () => {
    let comment = {id: 0, content: 'comment!'}
    let action = {
      type: types.FETCH_COMMENTS_SUCCESS,
      comments: [comment]
    }
    var spy = expect.spyOn(commentReducer, 'comments')
    reducer(undefined, action)
    expect(spy).toHaveBeenCalledWith([], action)
  })

  it('calls comments when the action is CREATE_COMMENT_SUCCESS', () => {
    let comment = {content: 'comment!'}
    let action = {
      type: types.CREATE_COMMENT_SUCCESS,
      comment: comment
    }
    var spy = expect.spyOn(commentReducer, 'comments')
    reducer(undefined, action)
    expect(spy).toHaveBeenCalledWith([], action)
  })

  it('returns the currentUser when the action is LOGIN_SUCCESS', () => {
    let user = {token: 'party', name: 'Danny', id: 17}
    let action = {
      type: types.LOGIN_SUCCESS,
      user: user
    }
    var spy = expect.spyOn(currentUserReducer, 'currentUser')

    reducer(undefined, action)
    expect(spy).toHaveBeenCalledWith(null, action)
  })

  it('delete the currentUser when the action is LOGOUT_SUCCESS', () => {
    let action = {
      type: types.LOGOUT_SUCCESS
    }

    var spy = expect.spyOn(currentUserReducer, 'currentUser')

    reducer(undefined, action)
    expect(spy).toHaveBeenCalledWith(null, action)
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

    expect(reducer(undefined, action).suggestions).toEqual(suggestions)
  })

  it('returns the cuisine types when the action is FETCH_CUISINE_TYPES_SUCCESS', () => {
    let cuisineTypes = [
      {id: 0, name: 'Not Specified'},
      {id: 1, name: 'Japanese'},
      {id: 2, name: 'French'}
    ]
    let action = {
      type: types.FETCH_CUISINE_TYPES_SUCCESS,
      cuisineTypes: cuisineTypes
    }

    expect(reducer(undefined, action).cuisineTypes).toEqual(cuisineTypes)
  })

  it('returns the price ranges when the action is FETCH_PRICE_RANGES_SUCCESS', () => {
    let priceRanges = [
      {id: 0, range: 'Not Specified'},
      {id: 1, range: '¥0~999'},
      {id: 2, range: '¥1000~1999'}
    ]
    let action = {
      type: types.FETCH_PRICE_RANGES_SUCCESS,
      priceRanges: priceRanges
    }

    expect(reducer(undefined, action).priceRanges).toEqual(priceRanges)
  })
})
