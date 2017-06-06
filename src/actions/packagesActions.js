import axios from 'axios'

export const fetchPackages = (time, keyword) => {
  return dispatch => {
    dispatch({
      type: 'FETCH_PACKAGES',
      payload: axios.get(`https://api.npmjs.org/downloads/range/${time}/${keyword}`)
    })
  }
}
