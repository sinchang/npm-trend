import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import { connect } from 'react-redux'

import { fetchSuggestions } from '../actions/suggestionsActions'
import { fetchPackages } from '../actions/packagesActions'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: true
    }
    this.callAjax = debounce(this.callAjax, 1000)
  }

  componentDidMount() {
    document.addEventListener('click', () => {
      this.setState({
        isShow: false
      })
    })
  }

  renderLists(packages) {
    if (packages.length) {
      return (
        <ul className={this.state.isShow ? 'search-result' : 'search-result hide'}>
          {
            packages.map((item, i) => {
              return <li key={i} onClick={(e) => this.handleSubmit(e, item.package.name)}>{item.package.name}</li>
            })
          }
        </ul>
      )
    }
  }

  handleKeyup(e) {
    if (e.keyCode === 13) return
    this.callAjax()
  }

  handleSubmit(e, keyword) {
    e.preventDefault()
    keyword = keyword || this.refs.search.value
    this.refs.search.value = ''
    this.setState({
      isShow: false
    })
    if (!keyword) return
    this.props.dispatch(fetchPackages('last-month', keyword.toLowerCase()))
  }

  callAjax() {
    const keyword = this.refs.search.value.toLowerCase()
    this.setState({
      isShow: true
    })
    if (!keyword) {
      this.props.dispatch({
        type: 'FETCH_SUGGESTIONS_REJECTED'
      })
      return
    }
    this.props.dispatch(fetchSuggestions(keyword))
  }

  render() {
    const { fetching, packages } = this.props
    return (
      <form className="field" onSubmit={(e) => this.handleSubmit(e)}>
        <div className={fetching ? 'control is-loading search-input' : 'control search-input'}>
          <input className="input is-primary" type="text" placeholder="Enter an npm package" ref="search" onKeyUp={(e) => this.handleKeyup(e)} />
          {this.renderLists(packages)}
        </div>
      </form>
    )
  }
}

Search.PropTypes = {
  packages: PropTypes.array,
  fetching: PropTypes.bool
}

function mapStateToProps(state) {
  return {
    fetching: state.suggestions.fetching,
    packages: state.suggestions.packages
  }
}

export default connect(mapStateToProps)(Search)
