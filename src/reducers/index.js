import { combineReducers } from "redux"

import packages from './packagesReducer'
import suggestions from './suggestionsReducer'

export default combineReducers({
  packages,
  suggestions
})
