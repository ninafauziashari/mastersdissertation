//Description: The application’s entry point

//import 'react-native-gesture-handler'
import React, {useState, useEffect, Component} from 'react'
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'


import Screen from './Navigator/Navigator.js'

const App = () =>{
   return (
     <NavigationContainer>
       <Screen/>
    </NavigationContainer>
  ) 

}



export default App;
