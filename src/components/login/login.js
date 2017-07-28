import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import Signup from '../login/login.js'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const { width, height } = Dimensions.get("window");

const background = require("./login1_bg.png");
const mark = require("./login1_mark.png");
const lockIcon = require("./login1_lock.png");
const personIcon = require("./login1_person.png");

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} resizeMode="cover">
          <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
          </View>

          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholder="Username" 
                placeholderTextColor="#FFF"
                style={styles.input}
                value={this.state.username}
						    onChangeText={(value) => this.setState({username: value})} 
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholderTextColor="#FFF"
                placeholder="Password" 
                style={styles.input} 
                secureTextEntry
                value={this.state.password}
						    onChangeText={(value) => this.setState({password: value})} 
              />
            </View>
            <TouchableOpacity activeOpacity={.5}>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {this.goLogin()}}
              activeOpacity={.5}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <TouchableOpacity activeOpacity={.5}>
                <View>
                  <Text 
                    onPress={() => {this.props.navigation.navigate('ManHinh_Signup')}}
                    style={styles.signupLinkText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <GoogleSigninButton
              style={{width: 150, height: 48, marginBottom:15}}
              size={GoogleSigninButton.Size.Icon}
              color={GoogleSigninButton.Color.Dark}
              onPress={this._signInGG.bind(this)}/>
          </View>
        </Image>
      </View>
    );
  }
  fetchData = function(param, value, callback) {
    let REQUEST_URL = "http://192.168.1.23:3000/signin";
    console.log("request url", REQUEST_URL);
    fetch(REQUEST_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        })
      })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      var nowData = []
      for(let i = 0; i < responseData.length; i++) {
        nowData.push({key: responseData[i].name})
      }
      console.log(nowData);
      this.setState({
        data: nowData,
      });
      callback(responseData.msg);
    })
    .done();
  }

  goLogin() {
		// ajax il kontrol
		var name = this.state.username;
		var pass = this.state.password;
		var present = this;
		if (name == "" || pass == "") {
			Alert.alert(" K bo trong");
		} else {
      this.fetchData("asdasd", "dasdas", function(data) {
        console.log(data);
        alert(data);
      })
    }
  }
  _signInGG(){
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
      offlineAccess: true,
      hostedDomain: '' ,
      forceConsentPrompt: true,
      accountName: ''
      })
      .then(() => {
        GoogleSignin.currentUserAsync().then((user) => {
          console.log('USER', user);
          this.setState({user: user});
        }).done();
        GoogleSignin.signIn().then((user) => {
          console.log(user);
          this.setState({user: user});
        })
        .catch((err) => {
          console.log('WRONG SIGNIN', err);
        })
        .done();
      });
    })
    .catch((err) => {
    console.log("Play services error", err.code, err.message);
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  background: {
    flex: 1,
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#FF3366",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
    fontSize: 18,
  }
});
