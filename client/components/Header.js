import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Pressable,
  ScrollView,
} from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View>
      <ImageBackground
        style={{aspectRatio: 5 / 2, height: 200}}
        source={{url: 'https://api.lorem.space/image/movie?w=1460&h=600'}}
      >
        <Pressable
          style={{
            position: 'absolute',
            height: 130,
            backgroundColor: '#171717',
            padding: 10,
            borderRadius: 6,
            top: 140,
            left: 20,
            width: '70%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 11,
            },
            shadowOpacity: 0.55,
            shadowRadius: 14.78,
            elevation: 5,
          }}
        >
          <View
            style={{
              height: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{fontSize: 24, fontWeight: '700', color: 'white'}}>
              ยังไม่มีรายการจองไว้จ้า
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400', color: 'white'}}>
              สามารถเลือกจองร้านทางด้านล่างได้เลย
            </Text>
          </View>
        </Pressable>
      </ImageBackground>
      <View style={{marginTop: 100}} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})
