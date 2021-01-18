//====================================================================
//    
//  CODE NOT USED
//
//====================================================================

import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerView
} from '@react-navigation/drawer';
import {LinearGradient} from 'expo-linear-gradient'



const DrawerContent = (props) => {
    return(
        <View style={{flex:1, backgroundColor:'#F8F8FF'}}>
            <DrawerContentScrollView {...props}>
            
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'column'}}>
                            <Title style={styles.title}>LEGGOHIKE</Title>
                        </View>
                    </View>
                    <View style={styles.drawerSection}>
                        <DrawerItem 
                            label="Home"
                            onPress={() => {props.navigation.navigate('MainMenu')}}
                        />
                        <DrawerItem 
        
                            label="Visited Hills"
                            onPress={() => {props.navigation.navigate('HillsHiked')}}
                        />
                        <DrawerItem 
                            label="Favourites"
                            onPress={() => {props.navigation.navigate('HillsToHike')}}
                        />
                        <DrawerItem 
                            label="Recommendation based on others"
                            onPress={() => {props.navigation.navigate('CollabFiltering')}}
                        />
                        <DrawerItem 
                        
                            label="Recommendation based on your hikes"
                            onPress={() => {props.navigation.navigate('ContentBased')}}
                        />
                         <DrawerItem 
                        
                            label="Other Recommendation"
                            onPress={() => {props.navigation.navigate('OtherRecommendation')}}
                         />
                    </View> 
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
            <DrawerItem  
                        label="Logout"
                        onPress={() => {props.navigation.navigate('Login')}}
                     />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      //borderColor:'black',
      //borderWidth:3
    },
    userInfoSection: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop:10
      //paddingLeft: 20,
     
      //padding:15
    },
    title: {
      alignItems: 'center',
     justifyContent: 'center',
     padding: 10,
      borderWidth: 5,
      borderColor: "black",
      fontSize: 20,
      color: 'black',
      fontFamily: 'exoBlackItalic',
      fontWeight: 'bold',
      backgroundColor: 'rgba(250, 255, 255, 0.7)',
      textShadowOffset: { width: 2.5, height: 2 },
      textShadowRadius: 12
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontFamily:'mono'
    },
    contentFont:{
        fontFamily:'mono'
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
      borderTopColor:'black',
      borderBottomColor:'black',
      borderTopWidth:3,
      borderBottomWidth:3,
      borderColor:'black'
    },
    bottomDrawerSection: {
        marginBottom: 15,
        //borderTopColor: '#f4f4f4',
       // borderTopWidth: 1,
       borderTopWidth:3,
       borderBottomWidth:3,
        borderTopColor:'black',
        borderBottomColor:'black',

    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

  export default DrawerContent
