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
import React, {useContext, useEffect} from 'react'
import {Input} from '@ui-kitten/components'
import {BarsCards} from './Context'
import useAxiosFunction from '../hooks/useAxiosFunction'
import axios from '../apis/jsonPlaceholder'
import QRCode from 'react-native-qrcode-svg'

const TicketComponent = () => {
  const [data, error, loading, axiosFetch] = useAxiosFunction()

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: 'GET',
      url: '/api/bar/reservation/all',
    })
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])
  console.log(data.data[0].passCode)
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
                  value={data.data[0].passCode}
                />
              )}
            </View>
          </View>
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
