import {
  FETCH_PACKAGES_PENDING,
  FETCH_PACKAGES_FULFILLED,
  FETCH_PACKAGES_REJECTED,
  UPDATE_TIME
} from '../constants/actionTypes.js'

export default (state = {
  packages: [],
  fetching: false,
  error: null,
  show: false,
  keyword: null,
  num: null
}, action) => {
  /* eslint-disable */
  switch (action.type) {
    case UPDATE_TIME:
      return {
        ...state,
        num: action.payload
      }
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
        packages: action.payload.data.downloads,
        keyword: action.payload.data.package
      }
    default:
      return state
  }
}
