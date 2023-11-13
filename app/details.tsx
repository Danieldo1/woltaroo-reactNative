import { View, Text,StyleSheet, Image, TouchableOpacity, SectionList, ListRenderItem } from 'react-native'
import React, { useLayoutEffect } from 'react'
import ParallaxScrollView from '@/Components/Parallax'
import Colors from '@/constants/Colors'
import { restaurant } from '@/assets/data/restaurant'
import { Link, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const Details = () => {
    const navigation = useNavigation()

    const DATA= restaurant.food.map((item,index)=>({
            title: item.category,
            data: item.meals,
            index
    }))

    const renderItem: ListRenderItem<any> = ({item, index}) => (
      <Link href={'/'} asChild>
        <TouchableOpacity style={styles.card}>
          <View style={{flex:1}}>
            <Text style={styles.cardTxt}>{item.name}</Text>
            <Text style={styles.cardInfo}>{item.info}</Text>
            <Text style={styles.cardPrice}>${item.price}</Text>
          </View>
            <Image source={item.img} style={styles.img} />
           
        </TouchableOpacity>
      </Link>
    )

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
        <Text style={styles.restName}>{restaurant.name}</Text>
        <Text style={styles.restAbout}>{restaurant.about}</Text>
        <Text style={styles.restTags}>{restaurant.delivery} • {restaurant.tags.map((item, index) => `${item}${index < restaurant.tags.length - 1 ? ' • ' : ''}`)}</Text>
        
        <SectionList contentContainerStyle={{paddingBottom: 50}} keyExtractor={(item,index)=> `${index + item.id}`} scrollEnabled={false} sections={DATA} renderItem={renderItem}
        
        ItemSeparatorComponent={() => <View style={{height: 1,backgroundColor: Colors.grey,marginHorizontal: 20}}/>}
        SectionSeparatorComponent={() => <View style={{height: 1,backgroundColor: Colors.grey}}/>}
        renderSectionHeader={({section:{title,index}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        />

        
        </View>
      </ParallaxScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  cardInfo:{
    fontSize: 14,
    color: Colors.medium,
  },
cardPrice:{
  paddingVertical: 4
},
  cardTxt:{
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 4
  },
  img:{
    height:80,
    width: 80,
    borderRadius: 8,
    marginLeft: 16
  },
  card:{
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
   sectionHeader:{
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    margin: 16
   },
   restDish:{
     
   },
   
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
    },
    restName:{
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 16,
        marginLeft: 16
    },
    restTags:{
        fontSize: 16,
        marginTop:6,
        margin: 16,
        lineHeight: 25,
        color: Colors.mediumDark
    },
    restAbout:{
       fontSize: 16,
       marginTop:6,
        margin: 16,
        lineHeight: 25,
        color: Colors.mediumDark
    }

})

export default Details