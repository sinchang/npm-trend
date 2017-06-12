import reducer from '../../reducers/suggestionsReducer'
import {
  FETCH_SUGGESTIONS_PENDING,
  FETCH_SUGGESTIONS_FULFILLED,
  FETCH_SUGGESTIONS_REJECTED
} from '../../constants/actionTypes.js'

const defaultState = {
  packages: [],
  fetching: false,
  error: null
}

describe('suggestions reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(defaultState)
  })

  it('should handle FETCH_SUGGESTIONS_PENDING', () => {
    expect(
      reducer(defaultState, {
        type: FETCH_SUGGESTIONS_PENDING
      })
    ).toEqual({
      ...defaultState,
      fetching: true
    })
  })

  it('should handle FETCH_SUGGESTIONS_FULFILLED', () => {
    expect(
      reducer(defaultState, {
        type: FETCH_SUGGESTIONS_FULFILLED,
        payload: {
          data: [
            {
              package: {
                name: 'vue'
              }
            }
          ]
        }
      })
    ).toEqual({
      ...defaultState,
      packages: [
        {
          package: {
            name: 'vue'
          }
        }
      ]
    })
  })

  it('should handle FETCH_SUGGESTIONS_REJECTED', () => {
    expect(
      reducer(defaultState, {
        type: FETCH_SUGGESTIONS_REJECTED
      })
    ).toEqual({
      ...defaultState,
      packages: [],
      error: 'something error'
    })
  })
})
