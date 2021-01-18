//Description: Other Recommendation page

import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, 
    Text, 
    View, 
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Button,
    Alert, 
    FlatList,
    ScrollView,
    LayoutAnimation,
    Platform, 
    UIManager
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ExpandedScreen from './ExpandedScreen.js'
import {SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'; 
import {Foundation, AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome5} from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';

const OtherRecom = ({navigation, props}) => {
    
    const [firstName, setFirstName] = useState('')
    const [dataScotland, setDataScotland] = useState([])
    const [dataEngland, setDataEngland] = useState([])
    const [dataWales, setDataWales] = useState([])
    const [familyFriendly, setFamilyFriendly] = useState([])
    const [classifiedMountain, setClassifiedMountain] = useState([]) 
    const [shareBorder, setShareBorder] = useState([])
    const [hillName, setHillName] = useState('') 
    const [expandedScreen, setExpandedScreen] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [expandedEngland, setExpandedEngland] = useState(false)
    const [expandedWales, setExpandedWales] = useState(false)
    const [expandedFamilyFriendly, setExpandedFamilyFriendly] = useState(false)
    const [expandedClassifiedMountain, setExpandedClassifiedMountain] = useState(false)
    const [expandedShareBorder, setExpandedShareBorder] = useState(false)
    const [isStatus, setIsStatus ] = useState(true);

    //SURELY THERE'S A WAY TO SIMPLIFY THIS RIGHT? HRMMM

    const hillsToHikeURL = "http://localhost:3000/hill/createHillsToHike"
    const removeURL = "http://localhost:3000/hill/removeHillsToHike"
    
    const URLScotland = "http://localhost:3000/hill/highestScotland"
    const URLEngland = "http://localhost:3000/hill/highestEngland"
    const URLWales = "http://localhost:3000/hill/highestWales"
    const URLFamilyFriendly = "http://localhost:3000/hill/familyFriendly"
    const URLClassifiedMountain = "http://localhost:3000/hill/classifiedMountain"
    const URLShareBorder = 'http://localhost:3000/hill/shareBorder'



    //CANNOT SIMPLIFY???? D:
    const fetchData = async () =>{
        const firstName = await AsyncStorage.getItem('user')
        setFirstName(firstName)
        console.log('Recommendation page for '+ firstName)

        fetch(URLScotland)
        .then(res => res.json())
        .then(responseJson => {
            setDataScotland(responseJson)
            console.log(responseJson)
        })
        .then((fetchEngland) =>{
            fetch(URLEngland)
            .then(res => res.json())
            .then(response => {
                setDataEngland(response)
                console.log(response)
                })
                .then((fetchWales =>{
                    fetch(URLWales)
                    .then(res => res.json())
                    .then(response => {
                        setDataWales(response)
                        console.log(response)
                    })  
                    .then((fetchFamilyFriendly) =>{
                        fetch(URLFamilyFriendly)
                        .then(res => res.json())
                        .then(response => {
                            setFamilyFriendly(response)
                            console.log(response)
                        })
                        .then((fetchClassifiedMountain) => {
                            fetch(URLClassifiedMountain)
                            .then(res => res.json())
                            .then(responseJson =>{
                                setClassifiedMountain(responseJson)
                                console.log(responseJson)
                            })
                            .then((fetchGetShareBorder)=>{
                              fetch(URLShareBorder)
                              .then(res=>res.json())
                              .then(responseJson => {
                                setShareBorder(responseJson)
                                console.log(responseJson)

                              })
                            })
                            
                        })
                    })
   
                })
            )
         })
            
    .catch((error) => {
        console.log(error)
        })
    }
    
    useEffect(() =>{
        fetchData()
        if (Platform.OS === 'android'){
            UIManager.setLayoutAnimationEnabledExperimental(true)
          }
      }, [])

      const changeScreenLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedScreen(!expandedScreen);
      }

      const changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
      }

      const changeEnglandLayout = () =>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedEngland(!expandedEngland);

      }

      const changeWalesLayout = () =>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedWales(!expandedWales);

      }

      const changeFamilyFriendlyLayout = () =>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedFamilyFriendly(!expandedFamilyFriendly);

      }

      const changeClassifiedMountainLayout = () =>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedClassifiedMountain(!expandedClassifiedMountain);

      }

      const changeShareBorderLayout = () =>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedShareBorder(!expandedShareBorder);

      }

      const listViewItemSeparator = () =>{
        return(
          <View
            style ={{
              height: 0.3,
              width: '0.9%', 
            }}/>
        )
      }

      const renderItem = ({item, index}) =>{

        const functionHillToHike = ()=>{
            const hillName = item.hillName
            setIsStatus(item.status)
            try{
            fetch(hillsToHikeURL, {
                method:"POST",
                headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                firstName: firstName, //already set by AsyncStorage 
                hillName: hillName,
                status: isStatus
                })
            })
            .then(res => res.json())
            .then(async (responseJson) =>{
                try{
                setHillName(hillName)
                setIsStatus(!isStatus)

                if (isStatus !== true){
                  await AsyncStorage.setItem('saveFavourite', false)
                  functionRemoveHillsToHike()
                  
                }

                await AsyncStorage.setItem('saveFavourite', isStatus)
                console.log(hillName + ' s favourite is set to '+isStatus.toString())
                console.log(firstName + ' plan to visit '+ hillName)
                console.log('Hill Name is set to: '+ item.hillName)
              }
              catch(err){
                console.log(err)
              }
            })
            }
            catch(err){
            console.log(err)
            } 
      }

      const functionRemoveHillsToHike=()=>{  
        const hillName = item.hillName
            try{
              fetch(removeURL, {
                method:"POST",
                headers: {
                  Accept : 'application/json',
                  'Content-Type': 'application/json',
              },
              body:JSON.stringify({
                  firstName: firstName, //already set by AsyncStorage 
                  hillName: hillName,
                })
              })
              .then(res => res.json())
              .then(async (responseJson) =>{
                try{
                 // await AsyncStorage.setItem('saveFavourite', false)
                  //setHillName(hillName)
                 // Alert.alert('Removed' + hillName + 'to the Favourites list!') 
                  console.log(firstName+' no longer wants to visit '+ hillName)
                  // console.log(firstName + ' plan to visit '+ hillName)
                  //console.log('Hill Name is set to: '+ item.hillName)
                }
                catch(err){
                  console.log(err)
                }
              })
            }
            catch(err){
                console.log(err)
          }
        }
  
      return(
          <View >
            <View style ={{flex:1, flexDirection:'row',}}>
            <AntDesign style={{paddingLeft:5, marginRight:10}} name={isStatus ? 'hearto' : 'heart'} size={35} color={isStatus ? 'black' : 'red'} size={35}  onPress={() => functionHillToHike()} />
            <Text style={{fontWeight:'bold', fontSize:15, fontFamily:'exoLight', color:'black', paddingTop:10, paddingBottom:10}}>
                {item.hillName}  ({item.metre.low}m) , {item.countryCode}</Text>          
            </View>
          </View>
      )
    }

    return( 
        <View
            style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            marginBottom:10
            }}
        >
            <LinearGradient
            colors={['#FF0000', '#ffba00','transparent']}
            style={styles.mainContainer}   
             />
            
            <KeyboardAvoidingView style={styles.headContainer}> 
            <View>
                 <View style={styles.rowHeaderContainer}>
                    <Text style={{fontFamily: "exoLight", fontWeight:'bold',
                    marginTop:1, color:'black', marginLeft:0, fontSize:18, marginBottom:5}}>Hi, {firstName}! check out other amazing hills in the UK! Add them to your Favourites to check out more details!</Text>
                </View>
            </View>
            <View style={styles.expandedView}>
                <TouchableOpacity style={{backgroundColor:'white', borderRadius:4}} activeOpacity={0.4} onPress={()=> changeScreenLayout()}>
                    <Text style={styles.expandedFont} >MENU</Text>
                </TouchableOpacity>

                <View style={{ height: expandedScreen ? null : 0, overflow: 'hidden', backgroundColor:'white',
                    borderRadius:5, paddingBottom:3, paddingTop:3}}>
                <ExpandedScreen/> 
            </View>
          </View>
          </KeyboardAvoidingView>
            <ScrollView style={{paddingBottom:10}}>
            <View style={styles.cfContainer}>

                <View style={{}}>
                  <TouchableOpacity style={styles.touchable} activeOpacity={0.8} onPress={()=> changeLayout()}>
                    <AntDesign name="caretdown" size={18} color="black" />
                    <span> &nbsp; &nbsp; </span>
                    <Text style={styles.font}>Top 10 Highest Hills in Scotland</Text>
                  </TouchableOpacity>
                </View>

                <View style={{
                  padding:5, 
                  //borderWidth:3, 
                  //borderColor:'black', 
                  marginBottom:20,
                  backgroundColor:'white',
                  borderRadius:20,
                  height: expanded ? null : 0, 
                  overflow: 'hidden'
                  // paddingBottom:10
                }}>
                    <FlatList
                        style = {{paddingTop:5}}
                        data = {dataScotland}
                        renderItem={renderItem}
                        keyExtractor = {(item, index) => index.toString()}
                        enableEmptySections={true}
                        ItemSeparatorComponent={listViewItemSeparator}/>
                </View>
                
                <TouchableOpacity style={styles.touchable} activeOpacity={0.8} onPress={()=> changeEnglandLayout()}>
                  <AntDesign name="caretdown" size={18} color="black" />
                    <span> &nbsp; &nbsp; </span>
                  <Text style={styles.font}>Top 10 Highest Hills in England</Text>
                </TouchableOpacity>

                <View style={{
                    padding:5, 
                    //borderWidth:3, 
                    //borderColor:'black', 
                    marginBottom:20,
                    backgroundColor:'white',
                    borderRadius:20,
                    height: expandedEngland ? null : 0, 
                    overflow: 'hidden'}}
                    >         
                    <FlatList
                    style = {{paddingTop:5}}
                    data = {dataEngland}
                    renderItem={renderItem}
                    keyExtractor = {(item, index) => index.toString()}
                    enableEmptySections={true}
                    ItemSeparatorComponent={listViewItemSeparator}/>
                </View> 

                <TouchableOpacity style={styles.touchable} activeOpacity={0.8} onPress={()=> changeWalesLayout()}>
                  <AntDesign name="caretdown" size={18} color="black" />
                    <span> &nbsp; &nbsp; </span>
                  <Text style={styles.font}>Top 10 Highest Hills in Wales</Text>
                </TouchableOpacity>

                <View style={{
                    padding:5, 
                    //borderWidth:3, 
                    //borderColor:'black', 
                    marginBottom:20,
                    backgroundColor:'white',
                    borderRadius:20,
                    height: expandedWales ? null : 0, 
                    overflow: 'hidden'}}> 

                    <FlatList   
                    style = {{paddingTop:5}}
                    data = {dataWales}
                    renderItem={renderItem}
                    keyExtractor = {(item, index) => index.toString()}
                    enableEmptySections={true}
                    ItemSeparatorComponent={listViewItemSeparator}/>
                </View> 
                  
                <TouchableOpacity style={styles.touchable} activeOpacity={0.8} onPress={()=> changeClassifiedMountainLayout()}>
                   <AntDesign name="caretdown" size={18} color="black" />
                    <span> &nbsp; &nbsp; </span>
                   <Text style={styles.font}>Classified Mountains</Text>
                </TouchableOpacity>

                <View style={{
                    padding:5, 
                    //borderWidth:3, 
                    //borderColor:'black', 
                    marginBottom:20,
                    backgroundColor:'white',
                    borderRadius:20,
                    height: expandedClassifiedMountain ? null : 0, 
                    overflow: 'hidden'}}>

                    <FlatList
                        style = {{paddingTop:5}}
                        data = {classifiedMountain}
                        renderItem={renderItem}
                        keyExtractor = {(item, index) => index.toString()}
                        enableEmptySections={true}
                        ItemSeparatorComponent={listViewItemSeparator}/>
                </View>


                <TouchableOpacity style={styles.touchable} activeOpacity={0.8} onPress={()=> changeFamilyFriendlyLayout()}>
                  <AntDesign name="caretdown" size={18} color="black" />
                      <span> &nbsp; &nbsp; </span>
                  <Text style={styles.font}>Family Friendly Hills</Text>
                </TouchableOpacity>
                <View style={{
                    padding:5, 
                    //borderWidth:3, 
                    //borderColor:'black', 
                    marginBottom:20,
                    backgroundColor:'white',
                    borderRadius:20,
                    height: expandedFamilyFriendly ? null : 0, 
                    overflow: 'hidden'}}>

                    <FlatList   
                    style = {{paddingTop:5}}
                    data = {familyFriendly}
                    renderItem={renderItem}
                    keyExtractor = {(item, index) => index.toString()}
                    enableEmptySections={true}
                    ItemSeparatorComponent={listViewItemSeparator}/>
                </View> 

                <TouchableOpacity style={styles.touchable} activeOpacity={0.8} onPress={()=> changeShareBorderLayout()}>
                   <AntDesign name="caretdown" size={18} color="black" />
                    <span> &nbsp; &nbsp; </span>
                   <Text style={styles.font}>10 Hills That Share Scotland and England Border</Text>
                </TouchableOpacity>

                <View style={{
                    padding:5, 
                    //borderWidth:3, 
                    //borderColor:'black', 
                    marginBottom:20,
                    backgroundColor:'white',
                    borderRadius:20,
                    height: expandedShareBorder ? null : 0, 
                    overflow: 'hidden'}}>

                    <FlatList
                        style = {{paddingTop:5}}
                        data = {shareBorder}
                        renderItem={renderItem}
                        keyExtractor = {(item, index) => index.toString()}
                        enableEmptySections={true}
                        ItemSeparatorComponent={listViewItemSeparator}/>
                </View>

            </View>
        </ScrollView>
    </View>    
    )   
    
}

const styles = StyleSheet.create({

    mainContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        padding:2,
        borderColor: "black",
        borderWidth: 1,
        borderLeftWidth:1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        },

        rowContainer: {
            flexDirection: 'row',
            //flexDirection: 'row',
            paddingTop:10,
            marginTop:10
          },

    listContainer:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        alignSelf: "stretch",
        margin: 10,
        borderRadius:20,
        //marginLeft:0.5,
       // marginRight:10,
        marginBottom:15,
        //shadowColor:'rgba(0, 0, 0, 0.5)',
        padding:0,
        borderWidth: 2,
        backgroundColor: 'white',//"rgba(255, 255, 225, 0.6)",
        shadowColor:'rgba(0, 0, 0, 0.8)',
        //textShadowColor: 
        shadowOffset:{ width: 3, height: 3 },
        shadowRadius: 15,
        //textShadowOffset: 
        //textShadowRadius: 12
      },
      rowContainerFlatlist: {
        backgroundColor:'#ececec',
        flex:1,
        flexDirection: 'row',
        alignItems:'stretch',
        alignSelf:'stretch',
        //paddingTop:10,
        //paddingRight:30,
        marginBottom:5,
        paddingLeft:35,
        padding:15,
        //paddingLeft:0,
        //borderRightWidth:3,
        borderBottomWidth:3,
        borderColor:'black'
       // marginTop:10
      },

      headerStyle: {
        padding:10,
        paddingTop:10,
        marginTop:-5,
        marginLeft:-2,
        marginRight:-2,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:'black',
        alignItems:'center',
        justifyContent: 'space-around',
        position: 'relative',
        alignSelf: 'stretch',
      },

    cfContainer:{
        flex: 1,
        justifyContent: 'center',
        margin: 0,
       // padding: 8,
        /*paddingTop:5,
        paddingBottom:0,
        paddingLeft:20,
        paddingRight:20,*/
        //: 3,
        //borderBottomWidth:3,
        //borderColor: "black",
        backgroundColor: "rgba(255, 255, 225, 0.6)",
        borderRadius:4, 
        padding:0, 
        alignSelf:'stretch', 
        alignItems:'stretch',
        margin:5,
        marginBottom:5
      },

      headContainer:{
        //flex: 0.5,
        //flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        alignSelf: "stretch",
        //margin: 0,
       // padding: 0,
       padding:5,
      // paddingTop:10,
        /*paddingBottom:15,
        paddingLeft:5,
        paddingRight:5,*/
        borderWidth: 0,
        borderBottomWidth:0,
        borderColor: "black",
        //backgroundColor: "rgba(255, 255, 225, 0.6)",
      },

      font:{
        fontFamily: "exoMedium", 
        fontWeight:'bold',
        marginTop:0, 
       //padding:5,
        //marginLeft:5, 
        fontSize:18, 
        marginBottom:5,
        alignItems:'stretch',
        alignSelf:'stretch'
      },

      touchable:{
        backgroundColor:'white',
        flex:1, 
        flexDirection:'row', 
        borderRadius:4, 
        padding:3
      },

      scrollview:{
        padding:5, 
        //borderWidth:3, 
        //borderColor:'black', 
        marginBottom:20,
        backgroundColor:'white',
        borderRadius:20
       // paddingBottom:10

       
      },

      mainScroll:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },

      rowMenuContainer: {
        flex:1,
        flexDirection: 'row',
        paddingTop:2,
        paddingLeft:5
        //marginTop:10,
        //alignSelf:'center'
       // paddingLeft: 
        //paddingRight:100
      },
      expandedView :{
        borderRadius:4, 
        padding:0, 
        alignSelf:'stretch', 
        alignItems:'stretch',
        marginBottom:10

      },
      expandedFont:{
        fontFamily:'monoBold', 
        fontSize:18, 
        fontWeight:'bold', 
        paddingLeft:10, 
        padding:3},

  rowHeaderContainer: {
    flex:1,
    flexDirection: 'row',
    paddingTop:10,
    marginTop:10,
    //alignSelf:'center'
   // paddingLeft: 
    //paddingRight:100
  },
  scrollview1:{
    padding:5, 
    //borderWidth:3, 
    //borderColor:'black', 
    marginBottom:20,
    backgroundColor:'white',
    borderRadius:20,
   // height: expanded ? null : 0, 
    overflow: 'hidden'
    // paddingBottom:10

  }

})


export default OtherRecom;