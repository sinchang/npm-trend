import reducer from '../../reducers/packagesReducer'
import {
  FETCH_PACKAGES_PENDING,
  FETCH_PACKAGES_FULFILLED,
  FETCH_PACKAGES_REJECTED,
  UPDATE_TIME
} from '../../constants/actionTypes.js'

const defaultState = {
  packages: [],
  fetching: false,
  error: null,
  show: false,
  keyword: null,
  num: null
}

describe('packages reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(defaultState)
  })

  it('should handle UPDATE_TIME', () => {
    expect(
      reducer(defaultState, {
        type: UPDATE_TIME,
        payload: 1
      })
    ).toEqual({
      ...defaultState,
      num: 1
    })
  })

  it('should handle FETCH_PACKAGES_PENDING', () => {
    expect(
      reducer(defaultState, {
        type: FETCH_PACKAGES_PENDING
      })
    ).toEqual({
      ...defaultState,
      fetching: true
    })
  })

  it('should handle FETCH_PACKAGES_FULFILLED', () => {
    expect(
      reducer(defaultState, {
        type: FETCH_PACKAGES_FULFILLED,
        payload: {
          data: {
            package: 'vue',
            downloads: [
              {
                day: '2017-05-12',
                downloads: 1
              }, {
                day: '2017-05-11',
                downloads: 2
              }
            ]
          }
        }
      })
    ).toEqual({
      ...defaultState,
      keyword: 'vue',
      packages: [
        {
          day: '2017-05-12',
          downloads: 1
        }, {
          day: '2017-05-11',
          downloads: 2
        }
      ]
    })
  })

  it('should handle FETCH_PACKAGES_REJECTED', () => {
    expect(
      reducer(defaultState, {
        type: FETCH_PACKAGES_REJECTED
      })
    ).toEqual({
      ...defaultState,
      packages: [],
      error: 'something error'
    })
  })
})
