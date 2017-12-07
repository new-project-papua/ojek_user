import { StackNavigator } from 'react-navigation'

import Login from '../src/screens/login'
import Registration from '../src/screens/registration'
import Main from './index'

const Navigator = StackNavigator({
  login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  },
  registration: {
    screen: Registration,
    navigationOptions: {
      title: 'Registration'
    }
  },
  main: {
    screen: Main,
    navigationOptions: {
      title: 'Main'
    }
  }
}, {
  headerMode: 'none'
})

export default Navigator
