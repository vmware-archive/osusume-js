import * as types from './constants/ActionTypes';
import fetch from 'isomorphic-fetch'

function requestRestaurants() {
    return {
        type: types.FETCH_RESTAURANTS_REQUEST
    }
}

function receiveRestaurants(json) {
    return {
        type: types.FETCH_RESTAURANTS_SUCCESS,
        restaurants: json
    }
}

function receiveSuggestions(json) {
    return {
        type: types.FETCH_SUGGESTIONS_SUCCESS,
        suggestions: json
    }
}

function fetchRestaurantsWithUser() {
    return dispatch => {
        dispatch(requestRestaurants());

        return fetch(`${process.env.API_SERVER}/restaurants`, authorizationConfig())
            .then(response => response.json())
            .then(json => dispatch(receiveRestaurants(json)));
    }
}

function fetchSuggestionsWithUser(name) {
    return dispatch => {
        let config = Object.assign({}, authorizationConfig(),
          {method: "POST", body: JSON.stringify({restaurantName: name})}
        );

        return fetch(`${process.env.API_SERVER}/restaurant_suggestions`, config)
          .then(response => response.json())
          .then(json => dispatch(receiveSuggestions(json)));
    }
}

export function fetchRestaurants() {
    return dispatch => {
        if (token()) {
            return dispatch(fetchRestaurantsWithUser());
        } else {
            return dispatch(login(fetchRestaurantsWithUser));
        }
    }
}

export function fetchSuggestions(name) {
    return dispatch => {
        if (token()) {
            return dispatch(fetchSuggestionsWithUser(name));
        } else {
            return dispatch(login(fetchSuggestionsWithUser, name));
        }
    }
}

function login(nextAction, ...args) {
    let email = 'danny';
    let password = 'danny';
    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({email: email, password: password})
    };

    return dispatch => {
        dispatch(requestRestaurants());
        return fetch(`${process.env.API_SERVER}/session`, config)
            .then(response => response.json())
            .then((json) => {
                localStorage.setItem('token', json.token);
                dispatch(nextAction(...args));
            })
    }
}

function authorizationConfig() {
    return {
        headers: {
            'Authorization': `Bearer ${token()}`,
            'Content-Type':'application/json'
        }
    };
}

function token() {
    return localStorage.getItem('token');
}
