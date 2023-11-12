import { View, Text,StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import ParallaxScrollView from '@/Components/Parallax'
import Colors from '@/constants/Colors'
import { restaurant } from '@/assets/data/restaurant'
import { useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const Details = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
      navigation.setOptions({
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: Colors.primary,
          headerLeft: () => (
        <TouchableOpacity style={styles.topBtn}  onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline"  size={30} color={Colors.primary} />
        </TouchableOpacity>
          ),
          headerRight: () => (
          <View style={styles.bar}>
        <TouchableOpacity style={styles.topBtn}  >
            <Ionicons name="share-outline"  size={30} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.topBtn}  >
            <Ionicons name="search-outline"  size={30} color={Colors.primary} />
        </TouchableOpacity>
          </View>
          )
      })  
    },[])


  return (
    <>
      <ParallaxScrollView 
      style={{ flex: 1 }}
      backgroundColor={'#fff'}
      renderBackground={() => (
          <Image style={{width: '100%', height: 250}} source={restaurant.img} />
      )}
      parallaxHeaderHeight={250}
      stickyHeaderHeight={120}
      contentBackgroundColor={Colors.lightGrey}
      renderStickyHeader={() => <View key='sticky-header' style={styles.headerStick}>
        <Text style={styles.stickyText}>{restaurant.name}</Text>
      </View>}>

        <View style={styles.detailContainer}>
        <Text>Details</Text>
        </View>
      </ParallaxScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    detailContainer:{
        backgroundColor: Colors.lightGrey,

    },
    headerStick:{
        backgroundColor: '#fff',
        marginLeft: 70,
        height: 100,
        justifyContent: 'flex-end',


    },
    topBtn:{
        width:40,
        height:40,
        borderRadius:25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    stickyText:{
        fontSize: 20,
        margin: 10,
    }
})

export default Details