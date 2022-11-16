import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";

const Header = () => {
  const distinct = [
    {
      id: 0,
      name: "ลาดกระบัง",
    },
    {
      id: 1,
      name: "ลาดพร้าว",
    },
    {
      id: 2,
      name: "สาทร",
    },
    {
      id: 3,
      name: "อ่อนนุช",
    },
    {
      id: 4,
      name: "รังสิต",
    },
  ];
  return (
    <SafeAreaView>
      <ImageBackground
        style={{ aspectRatio: 5 / 2, height: 170 }}
        source={{ url: "https://api.lorem.space/image/movie?w=1460&h=600" }}
      >
        <Pressable
          style={{
            position: "absolute",
            height: 130,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 6,
            top: 140,
            left: 20,
            width: "82%",
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
            ร้านที่จองไว้
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                ร้าน YEDA Bars
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "gray",
                  marginTop: 4,
                }}
              >
                จำนวน : 10 ที่นั่ง
              </Text>
            </View>
            <Pressable
              style={{
                backgroundColor: "#FFC40C",
                padding: 10,
                borderRadius: 6,
                marginRight: 10,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "400", textAlign: "center" }}
              >
                ดูการจอง
              </Text>
            </Pressable>
          </View>
          <Text style={{ marginTop: 8, fontSize: 15, fontWeight: "500" }}>
            นั่งชิล, สังสรรค์, เดท
          </Text>
        </Pressable>
      </ImageBackground>
      <View style={{ marginTop: 100 }} />
      <ScrollView horizontal={true}>
        {distinct.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                margin: 10,
                borderColor: "C0C0C0",
                borderWidth: 0.2,
                borderRadius: 4,
                padding: 10,
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 14, fontWeight: "500" }}
              >
                {item.name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({});
