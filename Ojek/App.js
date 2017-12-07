import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import Navigator from './navigator/login_register'
import Registration from './src/screens/registration'
import Login from './src/screens/login'

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        { this.showScreen() }
      </View>
    );
  }

  showScreen() {
    return (
      <Navigator/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
