import { StyleSheet, Text, View, SafeAreaView, Image, Pressable } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { BarsCards } from "@/components/Context";
import UserLayout from "../../components/UserLayout";

const TicketScreen = () => {
  const navigation = useNavigation();
  const { ticket } = useContext(BarsCards);
  const route = useRoute();
  const ticketId = nanoid(13);
  const ticketDetails = route.params;

  return (
    <UserLayout>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: "white",
            height: "90%",
            margin: 10,
            borderRadius: 6,
          }}
        >
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>รายละเอียดการจอง</Text>
            <Text>สถานะรายการ</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>{route.params.name}</Text>
            <Text style={{ color: "green", fontSize: 16 }}>ชำระเงินเสร็จสิ้น</Text>
          </View>

          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              marginHorizontal: 10,
              marginTop: 9,
              color: "gray",
            }}
          >
            {route.params.tableName} - {route.params.option}
          </Text>

          <Text
            style={{
              borderRadius: 1,
              borderStyle: "dashed",
              borderColor: "#DCDCDC",
              height: 1,
              borderWidth: 0.5,
              margin: 10,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ marginTop: 10, marginLeft: 10 }}>
              <Text style={{ color: "gray", fontSize: 16, fontWeight: "500" }}>DATE & TIME</Text>
              <Text>{route.params.date}</Text>
            </View>
            <Image
              style={{
                aspectRatio: 4 / 2,
                height: 60,
                borderRadius: 6,
                marginRight: 10,
              }}
              source={{ uri: route.params.image }}
            />
          </View>
          <Text
            style={{
              borderRadius: 1,
              borderStyle: "dashed",
              borderColor: "#DCDCDC",
              height: 1,
              borderWidth: 0.5,
              margin: 10,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginVertical: 10,
            }}
          >
            <View>
              <Text>โต๊ะของคุณ</Text>
              <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>G-12</Text>
            </View>

            <View>
              <Text>เข้าใช้ภายในเวลา</Text>
              <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>20:00</Text>
            </View>

            <View>
              <Text>จำนวนที่นั่ง</Text>
              <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>4-8</Text>
            </View>
          </View>
          <Text
            style={{
              borderRadius: 1,
              borderStyle: "dashed",
              borderColor: "#DCDCDC",
              height: 1,
              borderWidth: 0.5,
              margin: 10,
            }}
          />
          <View
            style={{
              height: 140,
              backgroundColor: "#8DA399",
              borderRadius: 6,
              margin: 10,
            }}
          >
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>รายละเอียดการชำระเงิน</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>ค่าธรรมเนียมการจอง</Text>
                <Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>10 บาท</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>ค่าธรรมเนียมการชำระเงิน</Text>
                <Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>0 บาท</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>อัตราชำระสุทธิ</Text>
                <Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>10 บาท</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>หมายเลขการจอง</Text>
                {/* <Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>
                FG43P9E8RR34MQ
              </Text> */}
                <Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>{ticketId}</Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              borderRadius: 1,
              borderStyle: "dashed",
              borderColor: "#DCDCDC",
              height: 1,
              borderWidth: 0.5,
              margin: 10,
            }}
          />

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
              marginBottom: 20,
            }}
          >
            <QRCode style={{ width: 80, height: 80 }} value={ticketId} />
          </View>

          <Text style={{ fontSize: 16, fontWeight: "500", textAlign: "center" }}>W33JNK3</Text>

          <Text
            style={{
              borderRadius: 1,
              borderStyle: "dashed",
              borderColor: "#DCDCDC",
              height: 1,
              borderWidth: 0.5,
              margin: 10,
            }}
          />
        </View>
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={{
            backgroundColor: "green",
            marginLeft: "auto",
            marginRight: "auto",
            width: 120,
            borderRadius: 4,
            padding: 10,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 15 }}>เสร็จสิ้น</Text>
        </Pressable>
      </SafeAreaView>
    </UserLayout>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({});
