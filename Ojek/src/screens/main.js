import React from 'react'
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableHighlight, ScrollView } from 'react-native'
import axios from 'axios'
import MapView from 'react-native-maps'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
// const LATITUDE = -6.25692154;
// const LONGITUDE = 106.78456578;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Registration extends React.Component {
  constructor() {
    super()
    this.state = {
      position: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  componentWillMount() {
    this.getCurrentPosition()
  }

  render() {
    console.log(this.state)
    return (
      <View>
        <TextInput
          style={ styles.fromTextInput }
          placeholder='Dari:'
          underlineColorAndroid='rgba(0,0,0,0)' />
        <TextInput
          style={ styles.destinationTextInput }
          placeholder='Tujuan:'
          underlineColorAndroid='rgba(0,0,0,0)' />
        <MapView
          loadingEnabled={ true }
          initialRegion={{
            latitude: this.state.position.latitude,
            longitude: this.state.position.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          style={ styles.mapView }
        >
          <MapView.Marker
            coordinate={ this.state.position }
          />
        </MapView>
      </View>
    )
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(position => {
        const myPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.setState({ position: myPosition })
      }
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#DCE1DE',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  mapView: {
    // flex: 1,
    width: '100%',
    height: '100%',
  },
  fromTextInput: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    position: 'absolute',
    top: 10,
    left: 5,
    right: 5,
    zIndex: 99,
    borderRadius: 10,
    height: 40,
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  destinationTextInput: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    position: 'absolute',
    top: 55,
    left: 5,
    right: 5,
    zIndex: 99,
    borderRadius: 10,
    height: 40,
    fontWeight: 'bold',
    paddingHorizontal: 15,
  }
})
