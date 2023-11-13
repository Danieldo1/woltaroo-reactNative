import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getDishById } from '@/assets/data/restaurant';
import Colors from '@/constants/Colors';
import Animated, { FadeIn, FadeInLeft, FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import useBasketStore from '@/store/basket';
import {Ionicons} from '@expo/vector-icons'

const Dish = () => {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);

  const item = getDishById(+id)!;
  const router = useRouter();

  const { addProduct } = useBasketStore();
  const { reduceProduct } = useBasketStore();
  const addToCart = () => {
    addProduct(item);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    router.back();
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      reduceProduct(item);
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    addProduct(item);
    setQuantity(quantity + 1);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['bottom']}>
      <View style={styles.container}>
        <Animated.Image source={item?.img} style={styles.img} entering={FadeIn.duration(500).delay(400)} />
        <View style={{ padding: 16 }}>
          <Animated.Text entering={FadeInLeft.duration(500).delay(200)} style={styles.name}>
            {item?.name}
          </Animated.Text>
          <Animated.Text entering={FadeInLeft.duration(500).delay(400)} style={styles.txt}>
            {item?.info}
          </Animated.Text>
        </View>

        <View style={styles.footer}>
          <View style={{flexDirection:'row',flex:1, justifyContent:'center', alignItems:'center',gap:20}}>
          <TouchableOpacity onPress={decreaseQuantity}>
            <Ionicons name="remove-circle-outline" size={24} color={Colors.medium} />
          </TouchableOpacity>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity}>
            <Ionicons name="add-circle-outline" size={24} color={Colors.medium} />
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn} onPress={addToCart}>
            <Text style={styles.btnTxt}>Add {item?.name} to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff'
  },
  img:{
    width: '100%',
    height: 300,
  },
  name:{fontSize: 24, fontWeight: 'bold',marginBottom: 8},
  txt:{
    fontSize: 16,
    marginBottom: 8,
    color: Colors.mediumDark
  },
  footer:{
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    width: '100%',
    elevation:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  btn:{
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 16,
    width: '100%',



  },
  btnTxt:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',

  }
})

export default Dish