//Description: Registration page

import React, {Component, useState, useEffect} from 'react'
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Button,
  ImageBackground
} from 'react-native'
import {useHistory} from 'react-router-dom'

const Registration = ({navigation}) =>{

    //const{firstName, lastName, username, password} = this.props.setState('')
    const history = useHistory()
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPasword] = useState("")
    const [errorMessage,setErrorMessage]=useState('')
    
    const register = () =>{
        console.log('Test')
        fetch("http://localhost:3000/register", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                firstName,
                lastName,
                username,
                password
            })
          })
            .then(res=>res.json())
            .then(data => {
              try{
                if (data.error){
                  console.log(data.error)
                  setErrorMessage(data.error)    
                }
                else{
                  console.log("Yay!")
                  navigation.navigate('Login')
                  //res.redirect('/login')
                }
              }
              catch(err){
                console.log(err)
              }
            })
            .catch(err =>{
                console.log(err)
          }) 
    } 

    const PostData = ()=>{
        register()
    }

    return(
      <ImageBackground
      source = {require ('../img/reg.jpg')}
      style={styles.backgroundContainer}
      >
        <KeyboardAvoidingView>
        <View style={styles.loginContainer}>
            <Text style={styles.mainHeader}>
                REGISTRATION
            </Text> 
            <TextInput 
                    placeholderTextColor="black"
                    underlineColorAndroid="transparent"
                    placeholder="First Name:"
                    style={styles.TextInput}
                    onChangeText={firstName => setFirstName(firstName)}/>
            <TextInput 
                    placeholderTextColor="black"
                    underlineColorAndroid="transparent"
                    placeholder="Last Name:"
                    onChangeText={lastName => setLastName(lastName)}
                    style={styles.TextInput}/>
            <TextInput 
                    placeholderTextColor="black"
                    underlineColorAndroid="transparent"
                    placeholder="Username:"
                    style={styles.TextInput}
                    onChangeText={username => setUsername(username)}/>
            <TextInput 
                    secureTextEntry={true} 
                    placeholderTextColor="black"
                    underlineColorAndroid="transparent"
                    placeholder="Password:"
                    onChangeText={password => setPasword(password)}
                    style={styles.TextInput}/>

          <Text style={{color:'#E71919', fontFamily:'monoBold', fontSize:14, fontWeight:'bold'}}>{errorMessage}</Text>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonFont}
              onPress={()=>PostData()}
              >REGISTER</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {{alignSelf:'flex-start', paddingTop:0.5}}>
            <Text style={styles.loginButtonFont}
              onPress={()=> navigation.push('Login')}
              >BACK TO LOGIN</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>  
      </ImageBackground>
    )
}

const styles = StyleSheet.create(
    {
      backgroundContainer:{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        borderRadius: 5,
        padding:2
      },

      cbContainer:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        alignSelf: "stretch",
        margin: 0,
        padding: 0,
        paddingTop:0,
        paddingBottom:0,
        paddingLeft:20,
        paddingRight:20,
        borderWidth: 3,
        borderBottomWidth:0,
        borderColor: "black",
        backgroundColor: "rgba(255, 255, 225, 0.6)",
      },
  
      headerStyle: {
          height: '25%',
          //alignItems: 'stretch',
          paddingRight:50,
          //paddingTop:23,
          //justifyContent: 'center',
          //alignSelf: "stretch",
          flex: 1,
      },
  
      mainHeader: {
        alignSelf: "center",
        fontFamily: " monoBold",
        textShadowColor: "white",
        textShadowOffset: {width: 0.5, height: 0.5},
        textShadowRadius: 3,  
        color: "black",
        fontSize: 30,
       // padding: 50,
        paddingTop: 8,
        paddingBottom: 35,
        //marginBottom:15,
         /* color: 'black',
          fontFamily: 'exoBlackItalic',
          fontSize: 25,
          borderRadius: 0,
          borderWidth: 5,
          borderColor: "black",
          padding: 15,
          //padding: 10,
         // paddingLeft: 40,
         // paddingRight: 40,
          backgroundColor: 'rgba(250, 255, 255, 0.7)',
          fontWeight: 'bold',
          textShadowColor: 'rgba(0, 0, 0, 0.5)',
          textShadowOffset: { width: 2.5, height: 2 },
          textShadowRadius: 12*/
        },
        loginContainer: {
          alignItems: "flex-start",
          alignSelf: "stretch",
          margin: 15,
          padding: 20,
         // paddingTop:10,
         // paddingBottom:50,
          //paddingLeft:20,
          //paddingRight:20,
          borderWidth: 5,
          borderColor: "black",
          //borderRadius: 0,
           backgroundColor: "rgba(255, 255, 225, 0.6)",
    
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
          marginTop:10,
          alignSelf: "center",
          marginBottom: 20,
          //paddingTop:15,
          //paddingBottom: 10,
          borderRadius: 0,
          borderColor: "black",
          borderWidth: 3,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: 15,
         // paddingBottom:1
        },
        /*(backToLoginButton:{
         // marginTop:10,
          alignSelf: "center",
          marginBottom: 10,
          //paddingTop:15,
          //paddingBottom: 10,
          borderRadius: 0,
          borderColor: "black",
          borderWidth: 3,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: 5,
         // paddingBottom:1

        },*/
        loginButtonFont:{
          fontFamily: "exoBlack",
          fontSize: 18
        }
     }
  )
  
  
  export default Registration;