import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native'
import React, {useContext, useEffect} from 'react'
import {useNavigation, useRoute} from '@react-navigation/native'
import {Ionicons} from '@expo/vector-icons'
import {AntDesign} from '@expo/vector-icons'
import {useStripe} from '@stripe/stripe-react-native'
import {BarsCards as Context} from '../../components/Context'
import UserLayout from '../../components/UserLayout'
// import useAxiosFunction from '../../hooks/useAxiosFunction'
// import axios from '../../apis/jsonPlaceholder'
import axios from 'axios'

const SummaryScreen = () => {
  const {ticket, setTicket} = useContext(Context)
  const route = useRoute()
  const navigation = useNavigation()
  // const [order, error, loading, axiosFetch] = useAxiosFunction()
  const total = 10
  console.log('Route PARAMS', route.params)
  // console.log(total)
  const stripe = useStripe()
  // const runTest = async () => {
  //   try {
  //     const data = {
  //       userId: route.params.userId,
  //       tableId: route.params.tableId,
  //       orderDate: route.params.date,
  //     }
  //     const res = await axios.post(
  //       'http://localhost:8080/api/bar/reserve',
  //       data
  //     )
  //     console.log(res.data.data)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  const getData = () => {
    // axiosFetch({
    //   axiosInstance: axios,
    //   method: 'POST',
    //   url: '/api/bar/reserve',
    //   requestConfig: {
    //     userId: route.params.userId,
    //     tableId: route.params.tableId,
    //     orderDate: route.params.date,
    //   },
    // })
  }
  const subscribe = async () => {
    const response = await fetch('http://localhost:8080/api/payment/payment', {
      method: 'POST',
      body: JSON.stringify({
        amount: Math.floor(total * 100),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()

    if (!response.ok) return Alert.alert(data.message)
    const clientSecret = data.clientSecret
    const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    })
    if (initSheet.error) return Alert.alert(initSheet.error.message)
    const presentSheet = await stripe.presentPaymentSheet({
      clientSecret,
    })
    if (presentSheet.error) return Alert.alert(presentSheet.error)
    else {
      console.log(
        'CHECK VALUE',
        route.params.userId,
        route.params.tableId,
        route.params.date
      )
      axios

        .post(
          'http://localhost:8080/api/bar/reserve',
          {
            userId: Number(route.params.userId),
            tableId: Number(route.params.tableId),
            orderDate: route.params.date,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error.response)
        })
      setTicket({
        name: route.params.name,
        option: route.params.option,
        minSeat: route.params.minSeat,
        maxSeat: route.params.maxSeat,
        tableName: route.params.tableName,
        date: route.params.date.toDateString(),
        tableName: route.params.tableName,
        total: total,
        image: route.params.image,
        tableId: route.params.tableId,
      })

      navigation.navigate('Ticket', {
        name: route.params.name,
        option: route.params.option,
        minSeat: route.params.minSeat,
        maxSeat: route.params.maxSeat,
        tableName: route.params.tableName,
        date: route.params.date.toDateString(),
        tableName: route.params.tableName,
        total: total,
        image: route.params.image,
        tableId: route.params.tableId,
      })
    }
  }

  // useEffect(() => {
  //   getData()
  //   // eslint-disable-next-line
  // }, [ticket])
  // occupied.push(...seats);

  return (
    <UserLayout>
      <SafeAreaView style={{backgroundColor: '#171717'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#171717',
          }}
        >
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}
          >
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              color="white"
              style={{marginLeft: 5}}
            />
            <View style={{marginLeft: 6}}>
              <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>
                สรุปยอดจองโต๊ะ
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  color: 'gray',
                  fontSize: 15,
                  fontWeight: '500',
                }}
              >
                สำหรับการ{route.params.option}
              </Text>
            </View>
          </View>
          <AntDesign
            style={{marginRight: 12}}
            name="sharealt"
            size={24}
            color="black"
          />
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            padding: 10,
            backgroundColor: '#171717',
          }}
        >
          <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
            ยืนยันการจองโต๊ะ
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            backgroundColor: '#171717',
          }}
        >
          <Text style={{fontSize: 16, color: 'gray'}}>
            {route.params.option}
          </Text>
          <Text style={{color: 'red', fontSize: 16, color: 'white'}}>
            {route.params.tableName}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            paddingHorizontal: 10,
            paddingTop: 9,
            backgroundColor: '#171717',
            color: 'white',
          }}
        >
          ร้าน {route.params.name}
        </Text>
        <Text
          style={{
            borderRadius: 1,
            borderStyle: 'dashed',
            borderColor: 'white',
            height: 1,
            borderWidth: 0.5,
            margin: 10,
            backgroundColor: '#171717',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{marginTop: 10, marginLeft: 10}}>
            <Text style={{color: 'gray', fontSize: 15, fontWeight: '500'}}>
              DATE & TIME
            </Text>
            <Text style={{marginVertical: 4, fontSize: 16, color: 'white'}}>
              {route.params.date.toDateString()}
            </Text>
            {/* <Text>{moment(route.params.date).utc().format("MM/DD/YYYY")}</Text> */}
          </View>
          <Image
            source={{uri: route.params.image}}
            style={{
              aspectRatio: 4 / 2,
              height: 60,
              borderRadius: 6,
              marginRight: 10,
            }}
          />
        </View>
        <Text
          style={{
            borderRadius: 1,
            borderStyle: 'dashed',
            borderColor: 'white',
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}
        >
          <Text style={{fontSize: 16, color: 'white'}}>ค่าบริหารการจอง</Text>
          <Text style={{fontSize: 16, color: 'white'}}>10 บาท</Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            marginHorizontal: 10,
            marginTop: 9,
            color: 'red',
            fontStyle: 'italic',
          }}
        >
          * กรุณามาก่อนเวลาจอง 5-10 นาที
        </Text>
        <View style={{marginVertical: 140}} />
        <View style={{paddingBottom: 50}}>
          <Pressable
            onPress={subscribe}
            style={{
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 20,
              backgroundColor: '#06C755',
              marginHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>
              ชำระค่าจอง {total} บาท
            </Text>
          </Pressable>
        </View>

        {/* <Text>{route.params.date}</Text> */}
        {/* <Text>{route.params.minSeat}</Text> */}
        {/* <Text>{route.params.maxSeat}</Text> */}
        {/* <Text>{route.params.table}</Text> */}
        {/* <Text>{route.params.tableName}</Text> */}
        {/* <Text>{route.params.image}</Text> */}
      </SafeAreaView>
    </UserLayout>
  )
}

export default SummaryScreen

const styles = StyleSheet.create({})
