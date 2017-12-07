import React from 'react'
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableHighlight, ScrollView } from 'react-native'
import axios from 'axios'
import MapView from 'react-native-maps'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
// const LATITUDE = -6.25692154;
// const LONGITUDE = 106.78456578;
const LATITUDE_DELTA = 0.0922;
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
        <MapView
          loadingEnabled={ true }
          initialRegion={{
            latitude: this.state.position.latitude,
            longitude: this.state.position.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          style={ styles.mapView }
        />
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
  }
})
