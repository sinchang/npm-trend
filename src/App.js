import { Component } from 'react'

import Title from './components/Title'
import Footer from './components/Footer'
import Search from './components/Search'
import Chart from './components/Chart'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="wrapper">
          <Title />
          <Search />
          <Chart />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
