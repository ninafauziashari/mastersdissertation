import React, {useState, Component} from 'react';
import { StyleSheet, 
    Text, 
    View, 
    ImageBackground,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {MaterialIcons} from '@expo/vector-icons'

export default class Search extends React.Component {
    constructor(props){
        super(props)
    }

    render(){ //rendering components
      return (
        <View style={styles.searchInput}>
            <MaterialIcons
                name='search' 
                size={22} 
                style={styles.searchIcon} 
                color='#bbb'
            />
            <TextInput
                style={styles.inputText}
                placeholder={'Search for a hiking spot...'}
                placeholderTextColor={'#999'}
                underlineColorAndroid={'#fff'}
                autoCorrect={false}
                onFocus={() => {
               // animation.expandBar();
               // this.props.changeInputFocus('search');
                }}
                  ref={(inputSearch) => {
                  this.inputSearch = inputSearch;
                }}
            />   
         </View>
         
        //<SearchBar style ={{flexDirection:'column', alignItems: 'center'}}
        //roundsearchIcon={{ size: 24 }}
       // onChangeText={text => this.SearchFilterFunction(text)}
       // onClear={text => this.SearchFilterFunction('')}
       // placeholder="Type Here..."
        //value={this.state.search}
         ///>
      )
    }
  }
  
  const styles = StyleSheet.create(
      {
        inputText: {
            display: 'flex',
            marginTop: 7,
            marginLeft: 40,
            color: 'black',
            fontSize: 15
           // borderRadius: 5,
          },
          searchIcon: {
            position: 'absolute',
            left: 13,
            top: 7
          },
          searchInput: {
            alignItems:'flex-start',
            alignSelf: "stretch",
            //display: 'flex',
            backgroundColor: 'white',
            borderColor: "black",
            borderWidth: 3,
            borderRadius: 0,
            height: 40,
            marginTop: 20,
            marginLeft: 0,
            marginRight: 0,
          },
          styleButton:{
              flexDirection:'row',
              marginTop: 20,
              borderRadius: 0,
              borderColor: "black",
              borderWidth: 3,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
          }
      }
  )
  
  
  //Search;