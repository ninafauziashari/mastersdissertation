//====================================================================
//    
//  CODE NOT USED
//
//====================================================================

/*import React, {useEffect,useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Login from '../Login.js'
import Screen from './Navigator.js'
import Registration from '../screens/Registration.js'
import MainMenu from '../screens/MainPage.js'
import HillsHiked from '../screens/HillsHiked.js'
import Favourites from '../screens/Favourites.js'
import CollabFiltering from '../screens/CollabFiltering.js'
import ContentBased from '../screens/ContentBased.js'
import otherRecom from '../screens/OtherRecommendation.js'
//import DrawerContent from './DrawerContent.js'


const Drawer = createDrawerNavigator();

const DrawerNavigator =(props)=>{
    return (
			<Drawer.Navigator initialRouteName="Login" drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="Login" component={Login}/>
				<Drawer.Screen name="MainMenu" component={MainMenu}/>
                <Drawer.Screen name="HillsHiked" options={{ title: 'VISITED HILLS' }} component={HillsHiked}/>
                <Drawer.Screen name="HillsToHike" options={{ title: 'FAVOURITES' }} title="Favourites" component={HillsToHike}/>
                <Drawer.Screen name="ContentBased" options={{ title: 'RECOMMENDATIONS BASED ON YOUR HIKE' }} title="ContentBased" component={ContentBased}/>
                <Drawer.Screen name="CollabFiltering" options={{ title: 'RECOMMENDATIONS BASED ON OTHERS' }} title="CollabFiltering" component={CollabFiltering}/>
                <Drawer.Screen name="OtherRecommendation" options={{ title: 'OTHER HILLS' }} title="otherRecom" component={otherRecom}/>
                <Drawer.Screen name="Registration" title="Registration" component={Registration}/>
			</Drawer.Navigator>

	);
}


export default DrawerNavigator*/