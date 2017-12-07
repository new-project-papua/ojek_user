import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, TextInput, TouchableHighlight, ScrollView } from 'react-native'
import axios from 'axios'

export default class Registration extends React.Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      password_confirmation: ''
    }
  }

  render() {
    return (
      <ScrollView style={ styles.container }>
        <TextInput
          style={ styles.formTextInput }
          placeholder='First Name'
          onChangeText={ (value) => this.setState({first_name: value}) }
        />
        <TextInput
          style={ styles.formTextInput }
          placeholder='Last Name'
          onChangeText={ (value) => this.setState({last_name: value}) }
        />
        <TextInput
          style={ styles.formTextInput }
          placeholder='Email'
          onChangeText={ (value) => this.setState({email: value}) }
        />
        <TextInput
          style={ styles.formTextInput }
          placeholder='Phone Number'
          onChangeText={ (value) => this.setState({phone: value}) }
        />
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
        <TextInput
          style={ styles.formTextInput }
          placeholder='Re-enter Password'
          onChangeText={ (value) => this.setState({password_confirmation: value}) }
          secureTextEntry={ true }
        />
        <View style={ styles.buttonWrapper }>
          <TouchableHighlight
            style={ styles.registerButton }
            onPress={ () => this.registerUser() }>
            <Text style={ styles.registerText }>REGISTER</Text>
          </TouchableHighlight>
        </View>
        <View style={ styles.buttonWrapper }>
          <Text>Already have account? </Text>
        </View>
        <View style={ styles.buttonWrapper }>
          <TouchableHighlight
            style={ styles.loginButton }
            onPress={ () => this.props.navigation.goBack() }>
            <Text style={ styles.loginText }>LOGIN HERE</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }

  registerUser() {
    alert('tombol register jalan...')
    // if (this.state.password !== this.state.password_confirmation) {
    //   alert('Konfirmasi password gagal...')
    // } else {
    //   axios({
    //     method: 'post',
    //     url: `http://35.198.217.74/register`,
    //     data: {
    //       first_name: this.state.first_name,
    //       last_name: this.state.last_name,
    //       email: this.state.email,
    //       phone: this.state.phone,
    //       username: this.state.username,
    //       password: this.state.password
    //     }
    //   })
    //   .then(response => {
    //     alert(JSON.stringify(response.data, null, 2))
    //     // alert('Masuk then axios...')
    //   })
    //   .catch(err => {
    //     alert(err.message)
    //     // alert('Masuk error axios...')
    //   })
    // }
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
  registerButton: {
    backgroundColor: '#090446',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#5B4B49',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
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
  },
  buttonWrapper: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 10,
  }
})
