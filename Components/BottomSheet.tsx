import { View, Text, Button,StyleSheet} from 'react-native'
import React, { forwardRef, useCallback, useMemo, useRef } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, TouchableOpacity, useBottomSheetModal } from '@gorhom/bottom-sheet'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
export type Ref = BottomSheetModal


const BottomSheet = forwardRef<Ref>((props, ref) => {
    const snapPoints = useMemo(() => ['50%'], [])
    const renderBackdrop = useCallback((props:any)=> <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
    const {dismiss} = useBottomSheetModal()
    return (
    <BottomSheetModal 
    
    backgroundStyle={{backgroundColor:Colors.lightGrey,borderRadius:10}}
    ref={ref} 
    snapPoints={snapPoints}
    overDragResistanceFactor={0}
    backdropComponent={renderBackdrop}
    handleIndicatorStyle={{display:'none'}}
    >
      <View style={styles.content}>
        <View style={styles.toggle}>
            <TouchableOpacity style={styles.toggleActive}>
                <Text style={{color: '#fff',fontWeight:'700'}}>Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleInactive}>
                <Text style={{color: Colors.primary,fontWeight:'700'}}>Pickup</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Your Location</Text>
        <Link href={'/'} asChild>
            <TouchableOpacity>
                <View style={styles.location}>
                    <Ionicons name="location-outline" size={20} color={Colors.medium} />
                    <Text style={{flex:1}}>Current Location</Text>
                    <Ionicons name="chevron-forward" size={20} color={Colors.primary} style={{marginLeft:3,marginTop:2}}/>
                </View>
            </TouchableOpacity>
        </Link>


        <Text style={styles.subtitle}>Arrival Time</Text>
        <Link href={'/'} asChild>
            <TouchableOpacity>
                <View style={styles.location}>
                    <Ionicons name="stopwatch-outline" size={20} color={Colors.medium} />
                    <Text style={{flex:1}}>Now</Text>
                    <Ionicons name="chevron-forward" size={20} color={Colors.primary} style={{marginLeft:3,marginTop:2}}/>
                </View>
            </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.btn} onPress={() => dismiss()}>
        <Text style={styles.btnTxt}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal >
  )
})

const styles = StyleSheet.create({
    btnTxt:{
        color:'#fff',
        fontWeight:'bold',
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
    content:{
    flex:1,
    },
    toggle:{
    flexDirection:'row',
    justifyContent: 'center',
    gap:10,
    marginBottom:32
    },
    toggleActive:{
        backgroundColor:Colors.primary,
        padding: 8,
        borderRadius:30,
        paddingHorizontal:30
    },
    toggleInactive:{
        padding: 8,
        borderRadius:30,
        paddingHorizontal:30,
        borderColor:Colors.primary,
       borderWidth:1
    },
    subtitle:{
        fontSize:16,
        fontWeight:'600',
        margin:16
    },
    location:{
    flexDirection:'row',
    gap:8,
    alignItems:'center',
    padding:16,
    backgroundColor: '#fff',
    borderColor:Colors.grey,
    borderWidth:1,
    }
})

export default BottomSheet