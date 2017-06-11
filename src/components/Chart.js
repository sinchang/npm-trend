import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import createG2 from 'g2-react'

import { getTime } from '../helper'
import { fetchPackages } from '../actions/packagesActions'

const Line = createG2(chart => {
  chart.line().position('day*downloads').color('#00d1b2').shape('spline').size(2)
  chart.render()
})

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 1000,
      height: 400
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.refs.select.value = nextProps.num
    return true
  }

  handleSelect() {
    const num = this.refs.select.value
    const time = getTime(num)
    this.props.dispatch({
      type: 'UPDATE_TIME',
      payload: num
    })
    this.props.dispatch(fetchPackages(time, this.props.keyword))
  }

  render() {
    const { packages } = this.props
    return (
      <div className={packages.length ? 'chart' : 'chart hide'}>
        <div className="block control">
          <span style={{paddingRight: '10px'}}>Downloads in past</span>
          <span className="select">
            <select onChange={() => this.handleSelect()} ref="select">
              <option value="1">1 Month</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">1 Year</option>
              <option value="24">2 Years</option>
            </select>
          </span>
        </div>
        <Line
          data={packages}
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    )
  }
}

Chart.propTypes = {
  packages: PropTypes.array
}

function mapStateToProps(state) {
  return {
    packages: state.packages.packages,
    keyword: state.packages.keyword,
    num: state.packages.num
  }
}

export default connect(mapStateToProps)(Chart)
