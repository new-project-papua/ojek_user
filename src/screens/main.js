import React from 'react'
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableHighlight, ScrollView } from 'react-native'
import axios from 'axios'
import MapView from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Polyline from '@mapbox/polyline'
import { connect } from 'react-redux'

import { actionSetPosition } from '../../actions/action';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
// const LATITUDE = -6.25692154;
// const LONGITUDE = 106.78456578;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      position: {
        latitude: 0,
        longitude: 0
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
      destinationAddress: null,
      coords: null,
      distance: null
    }
  }

  componentWillMount() {
    this.getCurrentPosition()
  }

  componentDidMount() {
    // this.getAddress(`${this.state.position.latitude},${this.state.position.longitude}`, 2)
  }

  render() {
    return (
      <View>
        { this.showDistancePrice() }
        { this.showForm() }
        <MapView
          showsUserLocation = { true }
          followUserLocation = { true }
          showsMyLocationButton={ true }
          loadingEnabled={ true }
          initialRegion={{
            latitude: this.state.position.latitude,
            longitude: this.state.position.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          style={ styles.mapView }>
          { this.showMarker() }
        </MapView>
      </View>
    )
	}

  showDistancePrice() {
    return (
      <View style={ styles.distancePriceResult }>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Rp10.000</Text>
        <Text>3.4 km</Text>
      </View>
    )
  }

	getDistance() {
    if (this.state.pickupCoordinate.latitude != 0 && this.state.pickupCoordinate.longitude != 0 && this.state.destinationCoordinate.latitude != 0 && this.state.destinationCoordinate.longitude != 0) {
      axios({
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${this.state.pickupCoordinate.latitude},${this.state.pickupCoordinate.longitude}&destinations=${this.state.destinationCoordinate.latitude},${this.state.destinationCoordinate.longitude}&mode=car&key=AIzaSyC9qifGjvHcpZ2CvLjBBbQZk58rzA9lj8E`
      })
      .then(response => {
        this.setState({distance: response.data.rows[0].elements[0].distance})
        console.log(this.state.distance)
      })
      .catch(err => console.log(err))
    }
	}

  getLine() {
      this.getDirections(`${this.state.pickupCoordinate.latitude.toString()}, ${this.state.pickupCoordinate.longitude.toString()}`, `${this.state.destinationCoordinate.latitude.toString()}, ${this.state.destinationCoordinate.longitude.toString()}`)
  }

  async getDirections(startLoc, destinationLoc) {
    try {
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
        let respJson = await resp.json();
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        console.log('ini respJson', respJson);
        let coords = points.map((point, index) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        })
        this.setState({coords: coords})
        return coords
    } catch(error) {
        console.log('ini error getDirections', error)
        return error
    }
  }

  showMarker() {
    return (
      <View>
        <MapView.Marker
          coordinate={{
            latitude: this.state.position.latitude,
            longitude: this.state.position.longitude
          }}
          draggable
          onDragEnd={(e) => {
            var coordinate = {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            }
            this.setState({ pickupCoordinate: coordinate})
            this.getAddress(`${coordinate.latitude},${coordinate.longitude}`, 1)
            this.getDistance()
          }}
        />
        <MapView.Marker
          coordinate={{
            latitude: this.state.position.latitude,
            longitude: this.state.position.longitude
          }}
          draggable
          onDragEnd={(e) => {
            var coordinate = {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            }
            this.setState({ destinationCoordinate: coordinate})
            this.getAddress(`${coordinate.latitude},${coordinate.longitude}`, 2)
            this.getDistance()
          }}
          pinColor='#5DB7DE'
        />
      </View>
    )
  }

  showForm() {
    return (
      <View>

        <GooglePlacesAutocomplete
          placeholder={ this.state.pickupAddress == null ? 'Dari:' : `${this.state.pickupAddress}` }
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
              zIndex: 2,
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
            console.log('INI KELUARAN DARI GOOGLE_PLACES_AUTOCOMPLETE:')
            console.log(data)
            console.log(details)
            // this.setState({
            //   pickupCoordinate: {
            //     latitude:  details.geometry.location.lat,
            //     longitude: details.geometry.location.lng,
            //     latitudeDelta: LATITUDE_DELTA,
            //     longitudeDelta: LONGITUDE_DELTA
            //   }
            // }), this.getAddress(`${details.geometry.location.lat},${details.geometry.location.lng}`, 1)
          }}

          onChangeText={() => {
            console.log('onChangeText di autocomplete jalan...')
          }}
          listViewDisplayed={false}
          renderDescription={(row) => console.log(row)}
          getDefaultValue={() => {
            return ''
          }}

          query={{
            key: 'AIzaSyC9qifGjvHcpZ2CvLjBBbQZk58rzA9lj8E',
            language: 'en'
          }}
        />

        <GooglePlacesAutocomplete
          placeholder={ this.state.destinationAddress == null ? 'Tujuan:' : `${this.state.destinationAddress}` }
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
              position: 'absolute',
              top: 42,
              left: 5,
              right: 5,
              zIndex: 3,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#009FB7',
              fontSize: 12,
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
          }}
          currentLocation={false}
          onPress={(data, details = null) => {
            console.log('INI KELUARAN DARI GOOGLE_PLACES_AUTOCOMPLETE:')
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
          var newAddress = `${json.results[0].address_components[1].long_name}, ${json.results[0].address_components[0].long_name}, ${json.results[0].address_components[2].long_name}`
          var formatted_address = json.results[0].formatted_address

          if(code === 1){
            this.setState({
              pickupAddress: formatted_address
            })
          } else {
            this.setState({
              destinationAddress: formatted_address
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
    zIndex: 1,
  },
  fromTextInput: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    zIndex: 4,
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
    zIndex: 5,
    borderRadius: 5,
    height: 30,
    fontWeight: 'bold',
    paddingVertical: 0,
    paddingHorizontal: 15,
  },
  distancePriceResult: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
    zIndex: 6,
    borderRadius: 5,
    height: 60,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  }
})

const mapStateToProps = (state) => {
  return {
    position: state.position
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPosition: () => dispatch(actionSetPosition())
  }
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Main)

export default ConnectedComponent
