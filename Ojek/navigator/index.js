import { StackNavigator } from 'react-navigation'

import Main from '../src/screens/main'

const Navigator = StackNavigator({
  main: {
    screen: Main,
    navigationOptions: {
      title: 'HOME'
    }
  }
}
,{ headerMode: 'none' }
)

export default Navigator
