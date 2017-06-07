import {
  FETCH_SUGGESTIONS_PENDING,
  FETCH_SUGGESTIONS_FULFILLED,
  FETCH_SUGGESTIONS_REJECTED
} from '../constants/actionTypes.js'

export default (state = {
  packages: [],
  fetching: false,
  error: null
}, action) => {
  /* eslint-disable */
  switch (action.type) {
    case FETCH_SUGGESTIONS_PENDING:
      return {
        ...state,
        fetching: true
      }
    case FETCH_SUGGESTIONS_REJECTED:
      return {
        ...state,
        fetching: false,
        packages: [],
        error: 'something error'
      }
    case FETCH_SUGGESTIONS_FULFILLED:
      return {
        ...state,
        fetching: false,
        packages: action.payload.data
      }
    default:
      return state
  }
}
