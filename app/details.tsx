import { View, Text,StyleSheet, Image, TouchableOpacity, SectionList, ListRenderItem, ScrollViewComponent, ScrollView } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import ParallaxScrollView from '@/Components/Parallax'
import Colors from '@/constants/Colors'
import { restaurant } from '@/assets/data/restaurant'
import { Link, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const Details = () => {
    const navigation = useNavigation()
    const [activeIndex, setActiveIndex] = useState(0)

    const opacity = useSharedValue(0)
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value
    }))

    const onScroll = (event: any) => {
        const yOffset = event.nativeEvent.contentOffset.y
        if(yOffset >370){
            opacity.value = withTiming(1)
        } else {
            opacity.value = withTiming(0)
        }
    }

    const DATA= restaurant.food.map((item,index)=>({
            title: item.category,
            data: item.meals,
            index
    }))

    const scrollRef = useRef<ScrollView>(null)
    const itemsRef = useRef<TouchableOpacity[]>([])

    const renderItem: ListRenderItem<any> = ({item, index}) => (
      <Link href={{pathname: '(modal)/dish', params: {id: item.id} }} asChild>
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

    const selectedCategory= (index:number) => {
      const selected = itemsRef.current[index]

        setActiveIndex(index)

        selected.measure((x,) => {
            scrollRef.current?.scrollTo({x: x - 16, y: 0, animated: true})
        })
    }
    
  return (
    <>
      <ParallaxScrollView 
      scrollEvent={onScroll}
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
        <View style={{flexDirection: 'row',flex:1}}>
        <Image style={styles.bike} source={require('../assets/images/applebike.png')} /> 
        <Text style={styles.restTag}>Delivery: {restaurant.delivery} </Text>
        </View>
        <Text style={styles.restTags}> {restaurant.tags.map((item, index) => `${item}${index < restaurant.tags.length - 1 ? ' • ' : ''}`)}</Text>
        
        <SectionList contentContainerStyle={{paddingBottom: 50}} keyExtractor={(item,index)=> `${index + item.id}`} scrollEnabled={false} sections={DATA} renderItem={renderItem}
        
        ItemSeparatorComponent={() => <View style={{height: 1,backgroundColor: Colors.grey,marginHorizontal: 20}}/>}
        SectionSeparatorComponent={() => <View style={{height: 1,backgroundColor: Colors.grey}}/>}
        renderSectionHeader={({section:{title,index}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        />
        </View>
      </ParallaxScrollView>

      <Animated.View style={[styles.stickySlider, animatedStyles]} >
          <View style={styles.sliderShadow}>

            <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 16, alignItems: 'center',gap:20,paddingBottom: 4}}>
           {restaurant.food.map((item, index) => (
             <TouchableOpacity ref={(ref) => itemsRef.current[index] = ref!} key={index} style={activeIndex === index ? styles.sliderBtnActive : styles.sliderBtn} onPress={() => selectedCategory(index)}>
               <Text style={activeIndex === index ? styles.sliderBtnTxtActive : styles.sliderBtnTxt}>{item.category}</Text>
             </TouchableOpacity>
           ))}
            </ScrollView>
          </View>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  stickySlider:{
    position: 'absolute',
 
    height: 50,
    left:0,
    right:0,
    top:100,
    backgroundColor: '#fff',
    overflow: 'hidden',
    paddingBottom: 4
  },
  sliderShadow:{
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
    width: '100%',
    height:'100%'
  },
  sliderBtnTxtActive:{
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16
  },
  sliderBtnActive:{
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50
  },
  sliderBtn:{
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50
  },
  sliderBtnTxt:{
    
    color: Colors.primary,
    fontSize: 16
  },
  bike:{
    width: 30,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 16
  },
  
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
    restTag:{
      fontSize: 16,
        marginTop:3,
        margin: 6,
        lineHeight: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        color: Colors.mediumDark
    },
    restTags:{
        fontSize: 16,
        marginTop:6,
        margin: 16,
        lineHeight: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        color: Colors.medium
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