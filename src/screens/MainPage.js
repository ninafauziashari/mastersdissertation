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
import { LinearGradient } from 'expo-linear-gradient';
import ExpandedScreen from './ExpandedScreen.js'
import {SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'; 
import {Foundation, AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome5} from '@expo/vector-icons'; 

const MainPage = ({navigation, props}) => {
  const [firstName, setFirstName] = useState('')
  const [hillName, setHillName]=useState('')
  const [filteredDataSource, setFilteredDataSource] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [isStatus, setIsStatus ] = useState(true);
  const [isCompleteStatus, setIsCompleteStatus] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [expandedScreen, setExpandedScreen] = useState(false)

  const [search, setSearch] = useState('')
  const [search1, setSearch1] = useState('')
  const [searchCountry, setSearchCountry] = useState('')
  const [searchCounty, setSearchCounty] = useState('')

  const flatListRef = useRef()
 

  const URL ="http://localhost:3000/hill"
  const visitedURL = "http://localhost:3000/hill/createCompleted"
  const hillsToHikeURL = "http://localhost:3000/hill/createHillsToHike"
  const removeURL = "http://localhost:3000/hill/removeHillsToHike"
  const removeComplete = "http://localhost:3000/hill/removeCompletedHill"

  const fetchData = async () =>{
    const firstName = await AsyncStorage.getItem('user')
    setFirstName(firstName)

    const token = await AsyncStorage.getItem('secretKey')
    console.log('Main Page: '+ JSON.stringify(token))

    await AsyncStorage.getItem('saveFavourite')
    await AsyncStorage.getItem ('saveCompleted')

    console.log('Hills'+ firstName+' has not hiked')
    
    fetch(URL,{
         method:"POST",
         headers: {
            Accept : 'application/json',
            'Content-Type': 'application/json',
             Authorization :"Bearer "+token,
        },
        body:JSON.stringify({
          firstName: firstName,
        })
      })
    .then(res=>res.json())
    .then(responseJson => {
      setFilteredDataSource(responseJson)
      setDataSource(responseJson)
      console.log(responseJson)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  console.log('0')

  const loggedInName = async () => {
    try{
      const firstName = await AsyncStorage.getItem('user')
      if (firstName !== null)
        setFirstName(firstName)
    }
    catch (err){
      console.log(err)
    }
    //Apply the same for favourites here??
  } 

  useEffect(() =>{
    fetchData()
    loggedInName()
    if (Platform.OS === 'android'){
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }, [])

  console.log('1')

  const changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }

  const changeScreenLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedScreen(!expandedScreen);
  }

  const logout = () =>{
    AsyncStorage.removeItem('secretKey')
    AsyncStorage.removeItem('user')
    .then(()=>{
      navigation.push("Login")
      console.log(navigation)
    })
  }
  console.log('2')

  const searchFilterFunction = (text) => {
    if (text){
      //passing the inserted text in textinput
      const newData = dataSource.filter (function(item){
        //applying filter for the inserted text in search bar
        const itemData = item.hillName
        //const itemData = item
        ? item.hillName.toUpperCase()
        : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })

      setFilteredDataSource(newData);
      setSearch(text);
    }
    else{
      setFilteredDataSource(dataSource)
      setSearch(text)
    }  
  }
 
  console.log('3')

  const searchFilterFunction1 = (text1) => {
    if (text1){
      //passing the inserted text in textinput
      const newData = dataSource.filter (function(item){
        //applying filter for the inserted text in search bar
        const itemData = item.area 
        ? item.area.toUpperCase() 
        : ''.toUpperCase();
        const textData = text1.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch1(text1);
    }
    else{
      setFilteredDataSource(dataSource)
      setSearch1(text1)
    }  
  }

  const searchFilterCountry = (text) => {
    if (text){
      //passing the inserted text in textinput
      const newData = dataSource.filter (function(item){
        //applying filter for the inserted text in search bar
        const itemData = item.countryCode 
        ? item.countryCode.toUpperCase() 
        : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchCountry(text);
    }
    else{
      setFilteredDataSource(dataSource)
      setSearchCountry(text)
    }  
  }

  const searchFilterCounty = (text) => {
    if (text){
      //passing the inserted text in textinput
      const newData = dataSource.filter (function(item){
        //applying filter for the inserted text in search bar
        const itemData = item.county 
        ? item.county.toUpperCase() 
        : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchCounty(text);
    }
    else{
      setFilteredDataSource(dataSource)
      setSearchCounty(text)
    }  
  }

  const listViewItemSeparator = () =>{
    return(
      <View
        style ={{
          height: 0.3,
          width: '90%', 
        }}/>
    )
  }

  const renderItem = ({item, index}) =>{

      const functionComplete = ()=>{
        const hillName = item.hillName
        setIsCompleteStatus(item.status)
        try{
          fetch(visitedURL, {
            method:"POST",
            headers: {
              Accept : 'application/json',
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            firstName: firstName, //already set by AsyncStorage 
            hillName: hillName,
            status: isCompleteStatus
            })
          })
          .then(res => res.json())
          .then(async (responseJson) =>{
            try{
              setHillName(hillName)
              setIsCompleteStatus(!isCompleteStatus)

              if (isCompleteStatus !== true){
                await AsyncStorage.setItem('saveCompleted', false)
                functionRemoveCompletedHills()
                
              }
            
              console.log(firstName + ' has visited '+ hillName)
              console.log('Hill Name is set to: '+ item.hillName)
              //setVisited(!visited)
              }
            catch(err){
              console.log(err)
            }
          })
        }
        catch(err){
        }   
      }

      const functionRemoveCompletedHills=()=>{  
        const hillName = item.hillName
            try{
              fetch(removeComplete, {
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
                  //await AsyncStorage.setItem('saveFavourite', false)
                  //setHillName(hillName)
                  console.log(firstName+' did not visit '+ hillName)
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

      const functionHillToHike=()=>{
        const hillName = item.hillName
        setIsStatus(item.status)
         //const status = item.status
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
                  //await AsyncStorage.setItem('saveFavourite', false)
                  //setHillName(hillName)
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
      <View style={styles.listContainer}>
        <View style ={styles.headerStyle}>
          <View>
            <View >
              <Text style={{fontWeight:'bold', fontSize:24, fontFamily:'exoBlack', color:'white'}}>{item.hillName}</Text>
            </View>
              <View style={styles.rowContainer}>
                <AntDesign name="checkcircleo" size={35} color={isCompleteStatus ? 'white' : '#4ce44c'} onPress={() => functionComplete()}/>
                <Text>     </Text>
                <AntDesign name={isStatus ? 'hearto' : 'heart'} size={35} color={isStatus ? 'white' : 'red'} onPress={() => functionHillToHike()} />
              </View> 
          </View>
        </View>

        <View style={styles.rowContainerFlatlist}>
          <Text style={{fontWeight:'bold', fontSize:18, fontFamily:'exoMedium'}}>M: {item.metre.low}         </Text>
          <Text style={{fontWeight:'bold', fontSize:18, fontFamily:'exoMedium'}}>Ft: {item.feet.low}         </Text>
          <Text style={{fontWeight:'bold', fontSize:18, fontFamily:'exoMedium'}}>Dp: {item.drop.low}         </Text>
        </View>
        <div style={{fontFamily:'Calibri', paddingTop:10, padding:5}}> 
          <li style={{fontWeight:'bold', fontSize:15, fontFamily:'exoLight'}}>Country     : {item.countryCode}</li >
          <li style={{fontWeight:'bold', fontSize:15, fontFamily:'exoLight'}}>Region      : {item.region}</li>
          <li style={{fontWeight:'bold', fontSize:15, fontFamily:'exoLight'}}>Area        : {item.area}</li>
          <li style={{fontWeight:'bold', fontSize:15, fontFamily:'exoLight'}}>County      : {item.county}</li>  
          <li style={{fontWeight:'bold', fontSize:15, fontFamily:'exoLight'}}>Parent      : {item.parentName}</li>
          <li style={{fontWeight:'bold', fontSize:15, fontFamily:'exoLight'}}>Features    : {item.feature}</li> 
        </div>
      </View>
      )
  }
  /*<TouchableOpacity onPress={completedToggle}>
              <Text> Your toggle is {isCompleted ? isCompleted.toString() : "false"}</Text>
            </TouchableOpacity> */

  return( 
    <View
        style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginBottom:5
        }}>
        <LinearGradient
            colors={['#4CBB17', '#EFFD5F','transparent']}
            style={styles.mainContainer}    
        />

        <KeyboardAvoidingView style={styles.headContainer}> 
            <View style={styles.rowHeaderContainer}>
              <Text style={{fontFamily: "exoMedium", fontWeight:'bold',
                 marginTop:4, marginBottom: 4, marginLeft:13, fontSize:35}}>Hello, {firstName}!</Text> 
              <Text>                       </Text>
              <MaterialCommunityIcons style={{marginTop:4, marginBottom: 4, paddingLeft:30}} activeopacity={0.4} name="logout" size={35} color="black" onPress={()=>logout()}/>  
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
           
           <View style={styles.expandedView}>
              <TouchableOpacity style={{backgroundColor:'white'}} activeOpacity={0.8} onPress={()=> changeLayout()}>
                <Text style={styles.expandedFont} >FILTER YOUR SEARCH HERE</Text>
              </TouchableOpacity>
              <View style={{ height: expanded ? null : 0, overflow: 'hidden', backgroundColor:'white'}}>

              <SearchBar
                containerStyle={{
                  //backgroundColor: 'transparent',
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderRadius: 4,
                  padding: 0,
                  marginBottom: 0,
                }}
                inputStyle={{
                  backgroundColor: 'white', 
                  color:'black',
                  alignItems: "center",
                  alignSelf: "stretch",
                  fontFamily:'mono',
                  fontSize:15,
                  padding:0,
                  paddingLeft:5,
                  //fontWeight: "900",
                }}
                round
                searchIcon={{ size: 15 }}
                onChangeText={text => searchFilterCountry(text)}
                onClear={text => searchFilterCountry('')}
                placeholder="Search by country code {e.g:'E' for England}"
                value={searchCountry}/>

                <SearchBar
                containerStyle={{
                  //backgroundColor: 'transparent',
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderRadius: 4,
                  padding: 0,
                  marginBottom: 0,
                }}
                inputStyle={{
                  backgroundColor: 'white', 
                  color:'black',
                  alignItems: "center",
                  alignSelf: "stretch",
                  fontFamily:'mono',
                  fontSize:15,
                  padding:0,
                  paddingLeft:5,
                  //fontWeight: "900",
                }}
                round
                searchIcon={{ size: 15 }}
                onChangeText={text => searchFilterFunction1(text)}
                onClear={text => searchFilterFunction1('')}
                placeholder="Search by area"
                value={search1}/>

                <SearchBar
                containerStyle={{
                  //backgroundColor: 'transparent',
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderRadius: 4,
                  padding: 0,
                  marginBottom: 0,
                }}
                inputStyle={{
                  backgroundColor: 'white', 
                  color:'black',
                  alignItems: "center",
                  alignSelf: "stretch",
                  fontFamily:'mono',
                  fontSize:15,
                  padding:0,
                  paddingLeft:5,
                  //fontWeight: "900",
                }}
                round
                searchIcon={{ size: 15 }}
                onChangeText={text => searchFilterCounty(text)}
                onClear={text => searchFilterCounty('')}
                placeholder="Search by county"
                value={searchCounty}/>
              
              <SearchBar
                containerStyle={{
                  //backgroundColor: 'transparent',
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderRadius: 4,
                  padding: 0,
                  marginBottom: 0,
                }}
                inputStyle={{
                  backgroundColor: 'white', 
                  color:'black',
                  alignItems: "center",
                  alignSelf: "stretch",
                  fontSize:15,
                  padding:0,
                  fontFamily:'mono',
                  paddingLeft:5,
                  //fontWeight: "900",
                }}
                round
                searchIcon={{ size: 15 }}
                onChangeText={text => searchFilterFunction(text)}
                onClear={text => searchFilterFunction('')}
                placeholder="Search by hill"
                value={search}/>
              </View>
            </View> 
        </KeyboardAvoidingView>
        
        <View style={styles.cbContainer}>
            <FlatList
              ref={flatListRef}
              style = {{paddingTop:10}}
              data = {filteredDataSource}
              renderItem={renderItem}
              keyExtractor = {(item, index) => index.toString()}
              enableEmptySections={true}
              ItemSeparatorComponent={listViewItemSeparator}
            />
        </View>
    </View>
);
}

const styles = StyleSheet.create(
    {
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
      headContainer:{
        //flex: 0.5,
        //flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        alignSelf: "stretch",
        //margin: 0,
       // padding: 0,
        paddingTop:0,
        paddingBottom:4,
        paddingLeft:5,
        paddingRight:5,
        //borderWidth: 3,
        borderBottomWidth:0,
        //borderColor: "black",
        backgroundColor: "rgba(255, 255, 225, 0.6)",
      },

      titleStyle:{
        paddingLeft:5,
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center'
      },
      
      rowContainer: {
        flex:1,
        flexDirection: 'row',
        paddingTop:2,
        //marginTop:10,
        alignSelf:'center'
       // paddingLeft: 
        //paddingRight:100
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

      rowHeaderContainer: {
        flex:1,
        flexDirection: 'row',
        paddingTop:10,
        marginTop:10,
        //alignSelf:'center'
       // paddingLeft: 
        //paddingRight:100
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
        //borderBottomWidth:3,
        //borderColor:'black'
       // marginTop:10
      },

      logo:{
       // paddingBottom: 20, 
        alignSelf:'center',
        flexDirection:'row', 
        //paddingTop:10,
        marginTop:20,
        marginLeft:5,
        fontWeight:'900', 
        fontSize:15, 
        fontFamily:'exoBlackItalic',
        backgroundColor: 'rgba(250, 255, 255, 0.7)',
        borderWidth: 3,
        borderColor: "black",
        padding: 5,
        //paddingLeft:20,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2.5, height: 2 },
        textShadowRadius: 12
      },

      cbContainer:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        alignSelf: "stretch",
        margin: 0,
        padding: 5,
        /*paddingTop:5,
        paddingBottom:0,
        paddingLeft:20,
        paddingRight:20,*/
        borderWidth: 0,
        //borderBottomWidth:3,
       // borderColor: "black",
        backgroundColor: "rgba(255, 255, 225, 0.6)",

      },
      cfContainer:{
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
        borderColor: "black",
        backgroundColor: "rgba(255, 255, 225, 0.6)",
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

      hillName:{

      },

      searcBar:{}
    }
);

export default MainPage;

