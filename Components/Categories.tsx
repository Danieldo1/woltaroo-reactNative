import { View, Text, ScrollView,StyleSheet, Image } from 'react-native'
import React from 'react'
import { categories } from '@/assets/data/home'

const Categories = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
        paddingHorizontal:16
    }}
    >
      {categories.map((item, index) => (
        <View key={index} style={styles.card}>
          <Image source={item.img} />
          <Text style={styles.cardTxt}>{item.text}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    card:{
        width:100,
        height:100,
        backgroundColor:'#fff',
        marginEnd:10,
        elevation:5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        marginBottom:10,
        borderRadius:4,
        marginStart:5
    },
    cardTxt:{
        padding:10,
        fontSize:12,
        fontWeight:'bold',
        textAlign:'center'
    }
})

export default Categories