import React from 'react'
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableHighlight, ScrollView } from 'react-native'
import axios from 'axios'
import MapView from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

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
        latitude: -2.52,
        longitude: 140.74
      },
      pickupCoordinate: {
        latitude: 0,
        longitude: 0
      },
      destinationCoordinate: {
        latitude: 0,
        longitude: 0
      },
      pickupAddress: null,
      destinationAddress: null
    }
  }

  componentWillMount() {
    this.getCurrentPosition()
  }

  render() {
    console.log(this.state)
    return (
      <View>

        <GooglePlacesAutocomplete
          placeholder={ this.state.pickupAddress == null ? 'Dari' : this.state.pickupAddress }
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth:0,
              // width: 270,
              height: 50,
              padding: 5,
              zIndex: 99,
              position: 'absolute',
              top: 0,
              left: 5,
              right: 5,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#009FB7',
              fontSize: 12
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
          }}
          currentLocation={false}
          onPress={(data, details = null) => {
            this.setState({
              pickupCoordinate: {
                latitude:  details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              }
            }), this.getAddress(`${details.geometry.location.lat},${details.geometry.location.lng}`, 1)
          }}

          query={{
            key: 'AIzaSyC9qifGjvHcpZ2CvLjBBbQZk58rzA9lj8E',
            language: 'en'
          }}
        />

        <GooglePlacesAutocomplete
          placeholder='Tujuan:'
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              // flex:1,
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth:0,
              // width: 270,
              height: 50,
              padding: 5,
              zIndex: 299,
              position: 'absolute',
              top: 40,
              left: 5,
              right: 5,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#009FB7',
              fontSize: 12
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
          }}
          currentLocation={false}
          onPress={(data, details = null) => {
            console.log(data)
            console.log(details)
            // this.setState({
            //   destinationCoordinate: {
            //     latitude:  details.geometry.location.lat,
            //     longitude: details.geometry.location.lng,
            //     latitudeDelta: LATITUDE_DELTA,
            //     longitudeDelta: LONGITUDE_DELTA
            //   }
            // }), this.getAddress(`${details.geometry.location.lat},${details.geometry.location.lng}`, 2)
          }}

          query={{
            key: 'AIzaSyC9qifGjvHcpZ2CvLjBBbQZk58rzA9lj8E',
            language: 'en'
          }}
        />

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

  getAddress(latlng, code) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=AIzaSyC9qifGjvHcpZ2CvLjBBbQZk58rzA9lj8E`)
    	.then(res => res.json())
    	.then(json => {
    		if (json.status !== 'OK') {
    			throw new Error(`Geocode error: ${json.status}`);
    		} else {
          var newAddress = `${json.results[0].address_components[1].long_name} no. ${json.results[0].address_components[0].long_name} ${json.results[0].address_components[2].long_name}`

          if(code === 1){
            this.setState({
              pickupAddress: newAddress
            })
          } else {
            // alert(newAddress)
            this.setState({
              destinationAddress: newAddress
            })
          }
        }

    	// alert(JSON.stringify(json.results[0].address_components[0].long_name))
    });
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
    zIndex: 0,
  },
  fromTextInput: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    zIndex: 99,
    borderRadius: 5,
    height: 30,
    fontWeight: 'bold',
    paddingVertical: 0,
    paddingHorizontal: 15,
  },
  destinationTextInput: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 40,
    left: 5,
    right: 5,
    zIndex: 99,
    borderRadius: 5,
    height: 30,
    fontWeight: 'bold',
    paddingVertical: 0,
    paddingHorizontal: 15,
  }
})
