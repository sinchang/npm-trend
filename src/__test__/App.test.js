import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import App from '../App'
import Title from '../components/Title'

// it('renders without crashing11', () => {
//   const div = document.createElement('div')
//   ReactDOM.render(<App />, div)
// })

it('contains component <Title />', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find(Title)).toBeTruthy()
})
