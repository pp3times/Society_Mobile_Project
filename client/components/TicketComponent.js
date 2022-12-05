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
import React, {useContext, useEffect, useState} from 'react'
import {Input} from '@ui-kitten/components'
import {BarsCards} from './Context'
import useAxiosFunction from '../hooks/useAxiosFunction'
import axios from '../apis/jsonPlaceholder'
import QRCode from 'react-native-qrcode-svg'
import * as SecureStore from 'expo-secure-store'

const TicketComponent = () => {
  const [data, error, loading, axiosFetch] = useAxiosFunction()
  const [dataTicket, setDataTicket] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [ticketData, setTicketData] = useState('')
  async function getValue(key) {
    let result = await SecureStore.getItemAsync(key)
    if (result) {
      return result
    }
  }
  const getFetchFirst = async () => {
    console.log('UID IS : ', await getValue('uid'))
    const uid = await getValue('uid')
    axios
      .get(`http://localhost:8080/api/bar/reservation/waiting/${Number(uid)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // console.log(response.data.data[0])
        setTicketData(response.data.data[0])
      })
      .catch((error) => {
        console.log(error.response)
      })
    axios
      .get('http://localhost:8080/api/bar/reservation/all', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // console.log(response)
        setDataTicket(response.data.data[0])
        setDateTime(response.data.data[0].orderDate.substring(0, 10))
      })
      .catch((error) => {
        console.log(error.response)
      })
  }
  useEffect(() => {
    getFetchFirst()
  }, [])
  // console.log(ticketData)

  // const getFetch = async () => {
  //   axios
  //     .get('http://localhost:8080/api/bar/reservation/all', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     .then((response) => {
  //       // console.log(response)
  //       setDataTicket(response.data.data[0])
  //       setDateTime(response.data.data[0].orderDate.substring(0, 10))
  //     })
  //     .catch((error) => {
  //       console.log(error.response)
  //     })
  // }
  // useEffect(() => {
  //   getFetch()
  // }, [])
  // console.log(dataTicket)
  // const theDate = dataTicket.orderDate
  console.log('Ticket', ticketData)
  const navigation = useNavigation()
  const {ticket} = useContext(BarsCards)
  // console.log(ticket, 'is ticket')
  return (
    <SafeAreaView>
      <ImageBackground
        style={{aspectRatio: 5 / 2, height: 170}}
        // source={{url: ticket.image}}
        source={{
          url: 'https://cdn.discordapp.com/attachments/1006207117331546143/1049071145405653134/image.png',
        }}
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // marginTop: 10,
            }}
          >
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 14, fontWeight: '500', color: 'gray'}}>
                ตั๋วของคุณ
              </Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                จองโต๊ะไว้ที่ {ticketData.name}
              </Text>
              <View />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: 'gray',
                  marginTop: 20,
                }}
              >
                {dataTicket.name}
              </Text>
              <Text style={{marginTop: 0, fontSize: 15, fontWeight: '500'}}>
                {dateTime}
              </Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 3,
                // marginBottom: -10,
              }}
            >
              {loading && <Text>กำลังดาวน์โหลดข้อมูล</Text>}
              {!loading && error && <Text>{error}</Text>}
              {!loading && !error && data && (
                <QRCode
                  style={{width: 40, height: 40}}
                  value={dataTicket.passCode}
                  // value="test"
                />
              )}
            </View>
          </View>
        </Pressable>
      </ImageBackground>
      <View style={{marginTop: 100}} />
    </SafeAreaView>
  )
}

export default TicketComponent

const styles = StyleSheet.create({})
