import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MapView from 'react-native-maps'
import Colors from '@/constants/Colors'
import { useNavigation } from 'expo-router'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import { Ionicons } from '@expo/vector-icons'

// 
const Location = () => {

    const [location, setLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    const navigation = useNavigation()

  return (
    <View style={{flex:1}}>
         <GooglePlacesAutocomplete
         renderLeftButton={() => (
            <View style={styles.inputBox}>
                 <Ionicons name="search-outline" size={20} color={Colors.medium}/>
            </View>
         )}
         styles={{
            container:{
                flex:0
            },
            textInput:{
                backgroundColor:Colors.grey,
                paddingLeft:35,
                borderRadius:20,
            },
            textInputContainer:{
                backgroundColor: '#fff',
                padding:8,

            }
        }}
      placeholder='Search'
      fetchDetails={true}
      onPress={(data, details) => {
        const point = details?.geometry?.location
        if(!point)return
        setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
            
        })
      }}
      query={{
        key:process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        language: 'en',
      }}
    />
      <MapView style={styles.map} region={location} showsUserLocation={true} />
      <View style={styles.btnBox}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
            <Text style={styles.btnTxt}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    map:{
        flex:1
    },
    btnBox:{
        position:'absolute',
        bottom:20,
        width:'100%',
     
    },
    btn:{
        backgroundColor:Colors.primary,
        padding: 16,
        borderRadius:8,
        margin: 16,
        alignItems:'center',
        marginTop:'auto',
        marginBottom:50
    },
    btnTxt:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:16
    },
    inputBox:{
        position:'absolute',
        top:20,
        left:10,
        zIndex:1
    }
})
export default Location



