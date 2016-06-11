
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  MapView,
  View,
  Text
} from 'react-native';

import APIService from './src/api';





class Weather extends Component {

  constructor(props){
    super(props);

    this.state = {
      pin:{
        latitude:0,
        longitude:0
      },
      description:'',
      temp:'',
      city:''
    };
  }

  _onRegionChangeComplete(region){
    //console.log(region);

    this.setState({
      pin:{
        latitude: region.latitude,
        longitude: region.longitude
      }
    });

    APIService(region.latitude,region.longitude)
      .then(data => {
        this.setState(data);
      });
  }

  render(){
    return(
      <View style={styles.container}>
        <MapView
          annotations={[this.state.pin]}
          onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
          style={styles.map}
        >
        </MapView>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{ this.state.city }</Text>
          <Text style={styles.text}>{ this.state.temp }</Text>
          <Text style={styles.text}>{ this.state.description }</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map:{
    flex:2,
    marginTop: 30
  },
  textWrapper:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontSize:30
  }
});

AppRegistry.registerComponent('Maps', () => Weather)
