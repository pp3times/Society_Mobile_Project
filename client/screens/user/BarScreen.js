import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
} from 'react-native'
import React, {useState, useEffect} from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {Ionicons} from '@expo/vector-icons'
import {AntDesign} from '@expo/vector-icons'
import tables from '../../data/table'
import UserLayout from '../../components/UserLayout'
import useAxiosFunction from '../../hooks/useAxiosFunction'
import axios from '../../apis/jsonPlaceholder'
import * as SecureStore from 'expo-secure-store'

const BarScreen = () => {
  const route = useRoute()
  // console.log(route.params);
  const navigation = useNavigation()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [table, setTable] = useState([])
  const [seatsData, setSeatsData] = useState([])
  const [maxSeat, setMaxSeat] = useState(0)
  const [minSeat, setMinSeat] = useState(0)
  const [tableId, setTableId] = useState(0)
  const [tableName, setTableName] = useState('')
  const [userId, setUserId] = useState('')
  let monthDate = new Date()
  monthDate.setDate(monthDate.getDate() + 30)
  let dateString = monthDate.toISOString().split('T')[0]
  // const tableData = tables
  const [barTable, error, loading, axiosFetch] = useAxiosFunction()
  async function getValue(key) {
    let result = await SecureStore.getItemAsync(key)
    if (result) {
      return result
    }
  }
  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/bar/table?id=${route.params.id}`,
    })
    setUserId(getValue('uid'))
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])
  console.log('THIS IS PAYLOAD', barTable.payload)
  console.log('TYPEOF PAYLOAD', typeof barTable.payload)
  const tableData = barTable.payload
  console.log('COUNTING', tableData)
  const options = ['จองให้ตัวเอง', 'จองให้เพื่อน']
  return (
    <UserLayout>
      <View
        style={{
          backgroundColor: '#171717',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 8,
          width: '100%',
        }}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons
            style={{marginLeft: 5}}
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              fontSize: 17,
              fontWeight: '600',
              marginLeft: 5,
              color: 'white',
            }}
          >
            จองโต๊ะร้าน {route.params.name}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
          }}
        ></View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 10,
          paddingLeft: 5,
          backgroundColor: '#171717',
        }}
      >
        <AntDesign name="Safety" size={24} color="orange" />
        <Text style={{paddingLeft: 4, color: 'white'}}>
          โต๊ะของคุณจะถูกจองทันทีที่ชำระเงิน
        </Text>
      </View>
      <View style={{backgroundColor: '#171717'}}>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date()}
          endDate={dateString}
          initialSelectedDate={new Date()}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={{backgroundColor: '#171717'}}
          style={{backgroundColor: '#171717'}}
        />
      </View>
      {loading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '80%',
            backgroundColor: '#171717',
          }}
        >
          <Text style={{color: 'white'}}>กำลังดาวน์โหลดข้อมูล</Text>
        </View>
      ) : (
        ''
      )}
      {!loading ? (
        error ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '80%',
              backgroundColor: '#171717',
            }}
          >
            <Text style={{color: 'white'}}>เกิดข้อผิดพลาด</Text>
          </View>
        ) : (
          ''
        )
      ) : (
        <Text></Text>
      )}
      {!loading ? (
        !error ? (
          tableData?.length ? (
            <ScrollView style={{backgroundColor: '#171717'}}>
              {tableData.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      setTable(item.name)
                      setSeatsData(item.tableData)
                      setMinSeat(item.minSeat)
                      setMaxSeat(item.maxSeat)
                      setTableName(item.name)
                      setTableId(item.id)
                    }}
                    style={{
                      margin: 10,
                      paddingVertical: 14,
                      backgroundColor: '#303030',
                      paddingHorizontal: 10,
                      borderRadius: 6,
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        // padding: 10,
                        // backgroundColor: "red",
                        fontSize: 16,
                        fontWeight: '500',
                        color: 'white',
                      }}
                    >
                      {item.name} สำหรับ {item.minSeat} - {item.maxSeat} ท่าน
                    </Text>
                    <Text
                      style={{fontSize: 14, fontWeight: '400', color: 'white'}}
                    >
                      ว่างทั้งหมด {item.available} โต๊ะ
                    </Text>
                    {table.includes(item.name) ? (
                      <ScrollView>
                        {options.map((item) => {
                          return (
                            <Pressable
                              key={item}
                              onPress={() =>
                                navigation.navigate('Summary', {
                                  option: item,
                                  name: route.params.name,
                                  date: selectedDate,
                                  minSeat: minSeat,
                                  maxSeat: maxSeat,
                                  tableName: tableName,
                                  image: route.params.image,
                                  tableId: tableId,
                                  userId: userId._z,
                                })
                              }
                              style={{
                                borderColor: 'black',
                                backgroundColor: 'black',
                                borderWidth: 0.5,
                                // width: 100,
                                borderRadius: 3,
                                margin: 10,
                                padding: 10,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: 'white',
                                  fontWeight: '500',
                                  textAlign: 'center',
                                }}
                              >
                                {item}
                              </Text>
                            </Pressable>
                          )
                        })}
                      </ScrollView>
                    ) : null}
                  </Pressable>
                )
              })}
            </ScrollView>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '80%',
                backgroundColor: '#171717',
              }}
            >
              <Text style={{color: 'white'}}>ร้านนี้ยังไม่มีโต๊ะ</Text>
            </View>
          )
        ) : (
          <Text></Text>
        )
      ) : (
        <Text></Text>
      )}
      {/* {!loading && !error && !tableData && (
        <View style={{backgroundColor: 'white'}}>
          <Text style={{color: 'white'}}>ร้านนี้ยังไม่มีโต๊ะ</Text>
        </View>
      )} */}
    </UserLayout>
  )
}

export default BarScreen

const styles = StyleSheet.create({})
