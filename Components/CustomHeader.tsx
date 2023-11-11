import { View, Text, SafeAreaView,StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'

const SearchBar = () => {
    return (
        <View style={styles.searchBar}>
            <View style={styles.searchInput}>
                <View style={styles.searchField}>
                    <TextInput style={styles.input} placeholder='Restaurant, groceries,dishes'/>
                </View>
                <Link href={'/'} asChild>
                    <TouchableOpacity style={styles.optionsBtn}>
                     <Ionicons name="options-outline" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    )
}

const CustomHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <TouchableOpacity >
                <Image style={styles.bike} source={require('@/assets/images/bike.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleContainer}>
                <Text style={styles.title}>Delivery · Now</Text>
                <View style={styles.location}>
                    <Text style={styles.subtitle}>Pickup</Text>
                    <Ionicons name="chevron-down" size={20} color={Colors.primary} style={{marginLeft:3,marginTop:2}}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileBtn}>
                <Ionicons name="person-outline" size={20} color={Colors.primary} />
            </TouchableOpacity>
        </View>
        <SearchBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safeArea:{
flex:1,
backgroundColor: '#fff'
    },
    container:{
        height:60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap:20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:20

    },
    bike:{
        width:30,
        height:30
    },
    titleContainer:{
        flex:1
    },
    profileBtn:{
        backgroundColor: Colors.lightGrey,
        padding:10,
        borderRadius:50
    },
    title:{
        fontSize:14,
        fontColor:Colors.medium

    },
    subtitle:{
        fontSize:18,
        fontWeight: 'bold',
    },
    location:{
        flexDirection: 'row',
         alignItems: 'center',
         marginTop:2,
          gap:1 
    },
    searchBar:{
        height:60,
        backgroundColor: '#fff',
    },
    searchInput:{
        flexDirection: 'row',
        gap:10,
        paddingHorizontal:20,
        alignItems: 'center',
        
    },
    searchField:{
        flex:1,
        backgroundColor: Colors.lightGrey,
        borderRadius:8,

    },
    optionsBtn:{
        padding:10,
        borderRadius:50
    },
    input:{
        padding:10,
        color:Colors.medium
    }
})

export default CustomHeader