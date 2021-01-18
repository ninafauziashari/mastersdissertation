//Description: Navigation stacks between pages

import React, {useEffect,useState} from 'react'
//import {createSwitchNavigator, createDrawerNavigator, DrawerItems, createAppContainer} from '@react-navigation/native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator } from '@react-navigation/stack'
//import { createDrawerNavigator } from '@react-navigation/drawer'
import Login from '../Login.js'
import Registration from '../screens/Registration.js'
import MainMenu from '../screens/MainPage.js'
import DrawerContent from '../Navigator/DrawerNavigation.js'
import HillsHiked from '../screens/HillsHiked.js'
import Favourites from '../screens/Favourites.js'
import CollabFiltering from '../screens/CollabFiltering.js'
import ContentBased from '../screens/ContentBased.js'
import otherRecom from '../screens/OtherRecommendation.js'
import ExpandedScreen from '../screens/ExpandedScreen.js'

const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();

const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
  };

const Screen =()=>{
   //const [isloggedin,setLogged] = useState(false)

    const ref = React.useRef(null);

    return(
            <Stack.Navigator headerMode="none" /*initialRouteName="Login"*/ screenOptions={screenOptionStyle}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="MainMenu" component={MainMenu}/>
                
                <Stack.Screen name="HillsHiked" component={HillsHiked}/>
                
                <Stack.Screen name="ContentBased" title="ContentBased" component={ContentBased}/>
                <Stack.Screen name="CollabFiltering" title="CollabFiltering" component={CollabFiltering}/>
                <Stack.Screen name="OtherRecommendation" title="otherRecom" component={otherRecom}/>
                <Stack.Screen name="Favourites" title="Favourites" component={Favourites}/>
                <Stack.Screen name="Registration" title="Registration" component={Registration}/>
                
                <Stack.Screen name="ExpandedScreen" title="ExpandedScreen" component={ExpandedScreen}/>
            </Stack.Navigator>
    );
}

export default Screen;
