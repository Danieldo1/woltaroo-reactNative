import { View, Text, FlatList,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useBasketStore from '@/store/basket'
import Colors from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import ConfettiCannon from 'react-native-confetti-cannon';
import { Link } from 'expo-router'
import GmailStyleSwipeableRow from '@/Components/Swipe'


const Basket = () => {
    const {items, total, clearCart, products,reduceProduct,addProduct} = useBasketStore()
    const [order, setOrder] = useState(false)

    const Fee = {
        service: 2.99,
        delivery: 4.99,
    }

    const checkout = () => {
        setOrder(true)
        clearCart()
    }
  return (
    <>
      {order && (
          <ConfettiCannon count={200} origin={{x: -10, y: 0}} fallSpeed={3000} fadeOut={true} autoStart={true}  />
      )}
      {order && (
        <View style={{marginTop:'50%', padding:20,alignItems:'center'}}>
            <Text style={{ fontSize: 24, fontWeight: 'bold',marginVertical: 8, marginLeft: 16}}>Your Order is Confirmed</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold',marginVertical: 8, marginLeft: 16}}>Thank you for your order!</Text>
            <Link href={'/'} asChild>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnTxt}>Back to Home</Text>
                </TouchableOpacity>
            </Link>
        </View>
      )}
      {!order && (
          <>
          <FlatList data={products} 
          ListHeaderComponent={<Text style={{ fontSize: 24, fontWeight: 'bold',marginVertical: 8, marginLeft: 16}}>Added Items</Text>}
          renderItem={({item}) => (
            <GmailStyleSwipeableRow onDelete={() => reduceProduct(item)} >
              <View style={styles.row}>
                  <Text style={{ fontSize:18}}>{item.quantity} x</Text>
                  <Text style={{ fontSize:18,flex:1, marginHorizontal: 16}}>{item.name}</Text>
                  <Text style={{ fontSize:18}}>$ {item.price}</Text>
              </View>
            </GmailStyleSwipeableRow>
          )}
          ListFooterComponent={
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff'}}>
                    <Text style={{ fontSize:16, color:Colors.medium}}>Subtotal</Text>
                    <Text style={{ fontSize:16, color:Colors.medium}}>$ {total}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff'}}>
                    <Text style={{ fontSize:16, color:Colors.medium}}>Service Fee</Text>
                    <Text style={{ fontSize:16, color:Colors.medium}}>$ {Fee.service}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff'}}>
                    <Text style={{ fontSize:16, color:Colors.medium}}>Delivery Fee</Text>
                    <Text style={{ fontSize:16, color:Colors.medium}}>$ {Fee.delivery}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff'}}>
                    <Text style={{ fontSize:16, color:Colors.mediumDark, fontWeight: 'bold'}}>Total Order</Text>
                    <Text style={{ fontSize:16, color:Colors.mediumDark,fontWeight: 'bold'}}>$ {(total + Fee.service + Fee.delivery).toFixed(2)}</Text>
                </View>
            </View>
          }
          />

          <View style={styles.footer}>
            <SafeAreaView edges={['bottom']} style={{backgroundColor: '#fff'}}>
                <TouchableOpacity style={styles.btn} onPress={checkout} >
                    <Text style={styles.btnTxt}>Place Order</Text>

                </TouchableOpacity>
            </SafeAreaView> 
          </View>
          </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
    btnTxt:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    justifyContent: 'space-between',
    
    gap:20
},
    btn:{ 
        backgroundColor: Colors.primary,
       paddingHorizontal: 16,
       borderRadius: 8,
       alignItems: 'center',
       justifyContent: 'space-between',
       marginBottom: 16,
       marginTop: 16,
       width: '100%',
       flexDirection: 'row',
       height: 50
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
  container:{
    flex:1,
    backgroundColor: '#fff'
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff'
  }
})

export default Basket