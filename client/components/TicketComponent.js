import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import React, {useContext} from 'react'
import {Input} from '@ui-kitten/components'
import {BarsCards} from './Context'
import QRCode from 'react-native-qrcode-svg'

const TicketComponent = () => {
  const navigation = useNavigation()
  const distinct = [
    {
      id: 0,
      name: 'ลาดกระบัง',
    },
    {
      id: 1,
      name: 'ลาดพร้าว',
    },
    {
      id: 2,
      name: 'สาทร',
    },
    {
      id: 3,
      name: 'อ่อนนุช',
    },
    {
      id: 4,
      name: 'รังสิต',
    },
  ]
  const {ticket} = useContext(BarsCards)
  console.log(ticket, 'is ticket')
  return (
    <SafeAreaView>
      <ImageBackground
        style={{aspectRatio: 5 / 2, height: 170}}
        source={{url: ticket.image}}
      >
        <Pressable
          style={{
            position: 'absolute',
            height: 130,
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 6,
            top: 140,
            left: 20,
            width: '82%',
          }}
        >
          <Text style={{fontSize: 14, fontWeight: '500', color: 'gray'}}>
            ตั๋วของคุณ
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {ticket.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: 'gray',
                  marginTop: 4,
                }}
              >
                {ticket.tableName}
              </Text>
            </View>
            {/* <Pressable
              style={{
                backgroundColor: '#FFC40C',
                padding: 10,
                borderRadius: 6,
                marginRight: 10,
              }}
              onPress={navigation.canGoBack() ? navigation.goBack() : ''}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  textAlign: 'center',
                }}
              >
                ดูการจอง
              </Text>
            </Pressable> */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                marginBottom: 20,
              }}
            >
              <QRCode style={{width: 80, height: 80}} value={ticketId} />
            </View>
          </View>
          <Text style={{marginTop: 8, fontSize: 15, fontWeight: '500'}}>
            {ticket.date}
          </Text>
        </Pressable>
      </ImageBackground>
      <View style={{marginTop: 100}} />
      <ScrollView horizontal={true}>
        {distinct.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                margin: 10,
                borderColor: 'C0C0C0',
                borderWidth: 0.2,
                borderRadius: 4,
                padding: 10,
              }}
            >
              <Text
                style={{textAlign: 'center', fontSize: 14, fontWeight: '500'}}
              >
                {item.name}
              </Text>
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default TicketComponent

const styles = StyleSheet.create({})
