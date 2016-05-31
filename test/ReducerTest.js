import expect from 'expect'
import {reducer} from '../src/js/Reducer'
import * as types from '../src/js/constants/ActionTypes'
import * as actions from '../src/js/Actions';

describe('Reducer', () => {
    it('returns the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({
            restaurants: [],
            suggestions: [],
            suggestion: undefined,
            cuisineTypes: []
        })
    });

    it('returns the list of restaurants when the action is FETCH_RESTAURANTS_SUCCESS', () => {
        let restaurants = [
            {id: 0, name: 'Afuri'},
            {id: 1, name: 'Tsukemen'}
        ];
        let action = {
           type: types.FETCH_RESTAURANTS_SUCCESS,
           restaurants: restaurants
        };

        expect(reducer(undefined, action)).toEqual({
            restaurants: [
                {id: 0, name: 'Afuri'},
                {id: 1, name: 'Tsukemen'}
            ],
            suggestions: [],
            suggestion: undefined,
            cuisineTypes: []
        });
    });

    it('returns the list of suggestions when the action is FETCH_SUGGESTIONS_SUCCESS', () => {
        let suggestions  = [
            {name: 'Afuri', address: 'Roppongi'},
            {name: 'Singaporean Chicken', address: 'Roppongi'}
        ];
        let action = {
            type: types.FETCH_SUGGESTIONS_SUCCESS,
            suggestions: suggestions
        };

        expect(reducer(undefined, action)).toEqual({
            restaurants: [],
            suggestions: suggestions,
            suggestion: undefined,
            cuisineTypes: []
        });
    })

    it('returns the selected suggestion when the action is SELECT_SUGGESTION', () => {
        let suggestion  = {name: 'Afuri', address: 'Roppongi'};
        let action = {
            type: types.SELECT_SUGGESTION,
            suggestion: suggestion
        };

        expect(reducer(undefined, action)).toEqual({
            restaurants: [],
            suggestions: [],
            suggestion: suggestion,
            cuisineTypes: []
        });
    })

    it('returns the cuisine types the action is FETCH_CUISINE_TYPES_SUCCESS', () => {
        let cuisineTypes = [
            {id: 0, name: 'Not Specified'},
            {id: 1, name: 'Japanese'},
            {id: 2, name: 'French'}
        ];
        let action = {
            type: types.FETCH_CUISINE_TYPES_SUCCESS,
            cuisineTypes: cuisineTypes
        };

        expect(reducer(undefined, action)).toEqual({
            restaurants: [],
            suggestions: [],
            suggestion: undefined,
            cuisineTypes: cuisineTypes
        });
    })
});
