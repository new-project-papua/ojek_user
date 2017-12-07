import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, TextInput, TouchableHighlight, ScrollView, AsyncStorage } from 'react-native'
import axios from 'axios'

export default class Registration extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  componentWillMount() {
    this.checkToken()
  }

  render() {
    return (
      <View style={ styles.container }>
        <TextInput
          style={ styles.formTextInput }
          placeholder='Username'
          onChangeText={ (value) => this.setState({username: value}) }
        />
        <TextInput
          style={ styles.formTextInput }
          placeholder='Password'
          onChangeText={ (value) => this.setState({password: value}) }
          secureTextEntry={ true }
        />
        <View style={ styles.buttonWrapper }>
          <TouchableHighlight
            style={ styles.loginButton }
            onPress={ () => this.login() }>
            <Text style={ styles.loginText }>LOGIN</Text>
          </TouchableHighlight>
        </View>
        <View style={ styles.buttonWrapper }>
          <Text>Don't have account yet? </Text>
        </View>
        <View style={ styles.buttonWrapper }>
          <TouchableHighlight
            style={ styles.registerButton }
            onPress={ () => this.props.navigation.navigate('registration') }>
            <Text style={ styles.registerText }>REGISTER HERE</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  checkToken() {
    AsyncStorage.getItem('token')
    .then(value => {
      if (value != null) {
        this.props.navigation.navigate('main')
      }
    })
  }

  login() {
    axios({
      method: 'post',
      url: `http://35.198.217.74/login`,
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
    .then(response => {
      if (response.data.message == 'login success') {
        AsyncStorage.setItem('token', response.data.token)
        this.props.navigation.navigate('main')
      } else {
        alert(JSON.stringify(response.data, null, 2))
      }
    })
    .catch(err => {
      alert(err.message)
    })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#DCE1DE',
    // justifyContent: 'center',
  },
  formTextInput: {
    marginHorizontal: 30,
    fontSize: 12,
  },
  loginButton: {
    backgroundColor: '#090446',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#5B4B49',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  registerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
})
