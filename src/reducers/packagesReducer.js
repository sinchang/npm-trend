import {
  FETCH_PACKAGES_PENDING,
  FETCH_PACKAGES_FULFILLED,
  FETCH_PACKAGES_REJECTED
} from '../constants/actionTypes.js'

export default (state = {
  packages: [],
  fetching: false,
  error: null,
  show: false
}, action) => {
  /* eslint-disable */
  switch (action.type) {
    case FETCH_PACKAGES_PENDING:
      return {
        ...state,
        fetching: true
      }
    case FETCH_PACKAGES_REJECTED:
      return {
        ...state,
        packages: [],
        error: 'something error'
      }
    case FETCH_PACKAGES_FULFILLED:
      return {
        ...state,
        packages: action.payload.data.downloads
      }
    default:
      return state
  }
}
