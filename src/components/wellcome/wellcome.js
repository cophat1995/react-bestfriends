import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const background = require("../../images/bkg.png");
const mark = require("../../images/hero.png");
export default class wellcome extends Component {
  render(){
    return(
      <View style={style.container}>
        <Image 
          source={background} 
          style={[style.container, style.bg]} 
          resizeMode="cover"
        >
          <View style={style.markWrap}>
            <Image source={mark} style={style.mark} resizeMode="contain" />
          </View>
          <View style={style.wrapper}>
            <TouchableOpacity 
              style={style.buttonContainer}
              onPress={() => {this.props.navigation.navigate('ManHinh_Login')}}
            >
              <Text style={style.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    paddingTop: 30,
    width: null,
    height: null
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  wrapper: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    color: '#FFF',
    marginTop:10,
    width: 160,
    textAlign:'center',
    opacity: 0.9,
    fontSize: 25
  },
  buttonContainer:{
    marginTop:10,
    backgroundColor: 'rgba(231, 76, 60,1.0)',
    textAlign: 'center',
    paddingVertical:5,
    width: 300,
  },
  buttonText:{
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 25
  }
})