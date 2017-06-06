import React, { Component } from 'react'
import { connect } from 'react-redux'
import createG2 from 'g2-react'

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

  render() {
    const { packages } = this.props
    return (
      <div className={packages.length ? 'chart' : 'chart hide'}>
        <Line
          data={packages}
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.packages.fetching,
    packages: state.packages.packages
  }
}

export default connect(mapStateToProps)(Chart)
