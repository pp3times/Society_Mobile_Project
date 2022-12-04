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

const TicketComponent = () => {
  const [data, error, loading, axiosFetch] = useAxiosFunction()
  const [dataTicket, setDataTicket] = useState('')
  // let theData = []
  // const getData = () => {
  //   axiosFetch({
  //     axiosInstance: axios,
  //     method: 'GET',
  //     url: '/api/bar/reservation/all',
  //   })
  // }

  // useEffect(() => {
  //   getData()

  //   // eslint-disable-next-line
  // }, [])
  // // setDataTicket(data)
  // useEffect(() => {
  //   theData = data
  // }, [data])
  // const getFetch = async () => {
  // 	const response = await fetch(
  //     'http://45.77.255.88:8080/api/payment/payment',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         amount: Math.floor(total * 100),
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   )
  //   const data = await response.json()
  // }
  const getFetch = async () => {
    axios
      .get('http://localhost:8080/api/bar/reservation/all', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response)
        setDataTicket(response.data.data[0])
      })
      .catch((error) => {
        console.log(error.response)
      })
  }
  useEffect(() => {
    getFetch()
  }, [])
  console.log(dataTicket.passCode)
  const navigation = useNavigation()
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // marginTop: 10,
            }}
          >
            <View>
              <Text style={{fontSize: 14, fontWeight: '500', color: 'gray'}}>
                ตั๋วของคุณ
              </Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                ร้าน {ticket.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: 'gray',
                  marginTop: 20,
                }}
              >
                จองโต๊ะ {ticket.tableName}
              </Text>
              <Text style={{marginTop: 0, fontSize: 15, fontWeight: '500'}}>
                {ticket.date}
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
