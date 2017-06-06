import React, { Component } from 'react'
// import debounce from 'lodash.debounce'
import { connect } from 'react-redux'

import { fetchSuggestions } from '../actions/suggestionsActions'
import { fetchPackages } from '../actions/packagesActions'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: true
    }
  }

  renderLists(packages) {
    if (packages.length) {
      return (
        <ul className={this.state.isShow ? 'search-result' : 'search-result hide'}>
          {
            packages.map((item, i) => {
              return <li key={i} onClick={(e) => this.handleSubmit(e, item.package.name) }>{item.package.name}</li>
            })
          }
        </ul>
      )
    }
  }

  handleKeyup() {
    const keyword = this.refs.search.value
    this.setState({
      isShow: true
    })
    if (!keyword) return
    this.props.dispatch(fetchSuggestions(keyword))
  }

  handleSubmit(e, keyword) {
    e.preventDefault()
    keyword = keyword || this.refs.search.value
    this.refs.search.value = ''
    this.setState({
      isShow: false
    })
    if (!keyword) return
    this.props.dispatch(fetchPackages('last-month', keyword))
  }

  render() {
    const { fetching, packages } = this.props
    return (
      <form className="field" onSubmit={(e) => this.handleSubmit(e)}>
        <div className={fetching ? 'control is-loading search-input' : 'control search-input'}>
          <input className="input is-primary" type="text" placeholder="Enter an npm package" ref="search" onKeyUp={() => this.handleKeyup()} />
          {this.renderLists(packages)}
        </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.suggestions.fetching,
    packages: state.suggestions.packages
  }
}

export default connect(mapStateToProps)(Search)
