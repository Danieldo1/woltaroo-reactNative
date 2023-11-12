import { View, Text, ScrollView, StyleSheet, } from 'react-native'
import React from 'react'
import Categories from '@/Components/Categories'
import Restaurants from '@/Components/Restaurants'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Categories />

        <Text style={styles.header}>Top Picks</Text>
        <Restaurants />

        <Text style={styles.header}>Weekend Offers</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:5,
    marginBottom:20,
    paddingHorizontal:16
  },
  container:{
    top:60,
    backgroundColor: Colors.lightGrey,

  }
})

export default Page