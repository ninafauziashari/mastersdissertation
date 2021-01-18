//Description: A collapsible component (MENU  bar) that appears in all page

import React, {useState, useEffect, useCallback, Component, useRef} from 'react';
import { StyleSheet, 
    Text, 
    View, 
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Button,
    Alert, 
    FlatList,
    TouchableHighlight,
    LayoutAnimation,
    Platform, 
    UIManager
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
//import ExpandedScreen from './ExpandedScreen.js'
import {SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'; 
import {Foundation, AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome5} from '@expo/vector-icons'; 

function ExpandedScreen (){
  const navigation = useNavigation()

  const logout = async() =>{
   await AsyncStorage.removeItem('secretKey')
   await AsyncStorage.removeItem('user')
    .then(()=>{
      navigation.push("Login")
      console.log(navigation)
    })
  }
  console.log('2')

      return (
        <View>
        <TouchableOpacity activeOpacity={0.4} style={styles.rowMenuContainer}>
            <AntDesign name="home" size={24} color="black" /> 
            <span> &nbsp; </span>
            <Text onPress={()=> navigation.push("MainMenu")}
              style={{paddingTop:5, fontWeight: 'bold', fontFamily:'exoLight'}}
              >HOME</Text>
          </TouchableOpacity>   

          <TouchableOpacity activeOpacity={0.4} style={styles.rowMenuContainer}>
            <Ionicons name="ios-git-network" size={24} color="black"/>
            <span> &nbsp; </span>
            <Text onPress={()=> navigation.push("ContentBased")}
              style={{paddingTop:5, fontWeight: 'bold', fontFamily:'exoLight'}}
              >BASED ON WHERE YOU'VE BEEN...</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.4} style={styles.rowMenuContainer}>
              <Ionicons name="md-people" size={24} color="black" />
              <span> &nbsp;  </span>
              <Text onPress={()=> navigation.push("CollabFiltering")}
                style={{paddingTop:5, fontWeight: 'bold', fontFamily:'exoLight'}}
              >BASED ON WHERE OTHERS HAVE BEEN...</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.4} style={styles.rowMenuContainer}>
              <Foundation name="mountains" size={24} color="black"/>
              <span> &nbsp; </span>
              <Text onPress={()=> navigation.push('HillsHiked')}
                style={{paddingTop:5, fontWeight: 'bold', fontFamily:'exoLight'}}
              >HILLS VISITED</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.4} style={styles.rowMenuContainer}>
            <AntDesign name='hearto' size={24} color="black"/>
            <span> &nbsp; </span>
            <Text onPress={()=> navigation.push('Favourites')}
              style={{paddingTop:5, fontWeight: 'bold', fontFamily:'exoLight'}}
            >FAVOURITES</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.4} style={styles.rowMenuContainer}>
              <FontAwesome5 name="mountain" size={23} color="black" />
              <span> &nbsp; </span>
              <Text onPress={()=> navigation.push('OtherRecommendation')}
                style={{paddingTop:5, fontWeight: 'bold', fontFamily:'exoLight'}}
              >SEE OTHER RECOMMENDATIONS</Text>
          </TouchableOpacity>

          <View style ={{marginTop:10, paddingTop:10, borderTopColor:'black', borderTopWidth:2}}>
            <TouchableOpacity activeOpacity={0.4} style={styles.rowMenuContainer}>
            <MaterialCommunityIcons activeopacity={0.4} name="logout" size={25} color="black"/>
                <span> &nbsp; </span>
            <Text onPress={()=> logout() }
              style={{paddingTop:5, fontWeight: 'bold', fontFamily:'exoLight'}}
            >LOGOUT</Text>
            </TouchableOpacity>
          </View>

        </View>
      )
}

const styles = StyleSheet.create(
    {
        rowMenuContainer: {
            flex:1,
            flexDirection: 'row',
            paddingTop:2,
            paddingLeft:5,
            paddingBottom:5
            //marginTop:10,
            //alignSelf:'center'
           // paddingLeft: 
            //paddingRight:100
          },

    }
)

export default ExpandedScreen