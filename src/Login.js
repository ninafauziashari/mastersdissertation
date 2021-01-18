//Description: Login page

import React, {useState, Component, useContext, createContext} from 'react';
import { StyleSheet, 
         Text, 
         View, 
         ImageBackground,
         KeyboardAvoidingView,
         TextInput,
         TouchableOpacity,
         Alert
} from 'react-native';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-community/async-storage';
import {AppLoading} from "expo"
import { startAsync } from 'expo/build/AR';
//import AuthContext from './component/AuthContext.js'


const LoginScreen = ({navigation}) => {

  const fetchFont = () =>{
    return Font.loadAsync({
      exoBlack: require('../assets/fonts/exo/Exo-Black.ttf'),
      exoMedium: require('../assets/fonts/exo/Exo-Medium.ttf'),
      exoBlackItalic: require('../assets/fonts/exo/Exo-BlackItalic.ttf'),
      exoLight: require('../assets/fonts/exo/Exo-Light.ttf'),
      exoBold: require('../assets/fonts/exo/Exo-Bold.ttf'),
      mono: require('../assets/fonts/monoglyceride/Monoglyceride.ttf'),
      monoBold: require('../assets/fonts/monoglyceride/MonoglycerideBold.ttf'),  
  });
  }

    console.log('Test Login')

    const [username,setUsername] = useState('')
    const [password,setPassword]=useState('')
    const [errorMessage,setErrorMessage]=useState('')
    const [fontLoaded, setFont] = useState(false)

    if(!fontLoaded){
      return(
        <AppLoading
          startAsync ={fetchFont}
          onError ={() => console.log("ERROR")}
          onFinish={() => {
            setFont(true)
          }}
          />
      )
    }

    const login = async (props)=>{
      fetch("http://localhost:3000/login",{
        method:"POST",
        headers: {
          Accept : 'application/json',
          'Content-Type': 'application/json',
      },
      body:JSON.stringify({
         username: username,
         password: password
        })
      }).then(res=>res.json())
      .then(async (data) =>{
        try{
            if (data.error){
              console.log(data.error)
              setErrorMessage(data.error)
            }
            console.log('Login: ' +  JSON.stringify(data.token))
            await AsyncStorage.setItem('secretKey',data.token)
            await AsyncStorage.setItem('user', data.user.firstName)
            //await AsyncStorage.getItem(Boolean.toString())
            //console.log ('Bool ' + JSON.stringify(await AsyncStorage.getItem(Boolean.toString())))
            console.log ('Login1 ' + JSON.stringify(await AsyncStorage.getItem('secretKey')))
            console.log ('Welcome, ' + JSON.stringify(await AsyncStorage.getItem('user')))
            Alert.alert('Test')
            navigation.push("MainMenu")
            console.log ('Hello thereeee!')
        }
       catch (err){
          console.log("The error is " + err)
        }
          
      }).catch(function(err){
        console.log(err);
    })
  }

  


  return (
    <ImageBackground
      source = {require ('./img/bckground.jpg')}
      style={styles.backgroundContainer}>
        
      <View style={styles.headerStyle}>
      {
        fontLoaded ? (
            <Text style={styles.mainHeader}>
              LEGGOHIKE
            </Text> 
        ):null
      }
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.loginContainer}>
        {
          fontLoaded ? (
            <Text style={styles.loginHeader}>
              LOGIN 
            </Text>
          ):null
        }
        
        {
          fontLoaded ? (
            
            <TextInput 
             placeholderTextColor="black"
              underlineColorAndroid="transparent"
              placeholder="username:"
              style={styles.TextInput}
              onChangeText={username => setUsername(username)}/>
          ):null
        }
        {
          fontLoaded ? (
            <TextInput
              secureTextEntry={true} 
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              placeholder="password:"
              onChangeText={password => setPassword(password)}
              style={styles.TextInput}/>
          ):null
        }
        <TouchableOpacity style={styles.loginButton}>
        {
          fontLoaded ? (
            <Text style={styles.loginButtonFont}
            onPress={() => login()}
            >LOG IN</Text>
          ):null
        }
        </TouchableOpacity>
      <Text style={{color:'#E71919', fontFamily:'monoBold', fontSize:14, fontWeight:'bold'}}>{errorMessage}</Text>
      <TouchableOpacity style = {{alignSelf:'flex-start', paddingTop:0.5}}>
        {
          fontLoaded ? (
            <Text style={styles.registerButtonFont}
            onPress={() => navigation.navigate('Registration')}
            >NO ACCOUNT? REGISTER HERE</Text>
          ):null

        }
      </TouchableOpacity>
      <Text>Forgot password?</Text>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

  

const styles = StyleSheet.create(
{
  backgroundContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding:2
  },

loginContainer: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    margin: 15,
    padding: 75,
    paddingTop:10,
    paddingBottom:50,
    paddingLeft:20,
    paddingRight:20,
    borderWidth: 5,
    borderColor: "black",
    //borderRadius: 0,
    backgroundColor: "rgba(255, 255, 225, 0.6)",

  },

headerStyle: {
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainHeader: {
    color: 'black',
    fontFamily: 'exoBlackItalic',
    fontSize: 35,
    borderRadius: 0,
    borderWidth: 5,
    borderColor: "black",
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: 'rgba(250, 255, 255, 0.7)',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2.5, height: 2 },
    textShadowRadius: 12
  },
  loginHeader: {
    alignSelf: "center",
    fontFamily: "monoBold",
    textShadowColor: "white",
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 3,  
    color: "black",
    fontSize: 30,
    padding: 50,
    paddingTop: 25,
    paddingBottom: 20,
    
  },
  TextInput: {
    color: "black",
    alignSelf: "stretch",
    padding: 15,
    marginBottom: 5,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 0,
    borderColor: "black",
    fontFamily: "mono",
    fontWeight: "900",
  },
  loginButton: {
    alignSelf: "center",
    marginBottom: 20,
    paddingTop:15,
    paddingBottom: 10,
    borderRadius: 0,
    borderColor: "black",
    borderWidth: 3,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 15,
   // paddingBottom:1
  },
  loginButtonFont:{
    fontFamily: "exoBlack",
    fontSize: 18
  },
  registerButtonFont:{
    fontFamily: "exoBlack",
    fontSize: 14
  },

})

export default LoginScreen;