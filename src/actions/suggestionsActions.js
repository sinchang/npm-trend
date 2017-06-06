import axios from 'axios'

export const fetchSuggestions = (keyword) => {
  return dispatch => {
    dispatch({
      type: 'FETCH_SUGGESTIONS',
      payload: axios.get(`https://api.npms.io/v2/search/suggestions?q=${keyword}&size=10`)
    })
  }
}
