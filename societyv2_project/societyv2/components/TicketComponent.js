import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { BarsCards } from "../Context";

const TicketComponent = () => {
  const { ticket } = useContext(BarsCards);
	console.log(ticket ,"is ticket")
  return (
    <View>
      {ticket.map((item, index) => {
        <ImageBackground
          style={{ aspectRatio: 5 / 2, height: 170 }}
          source={{ url: item.image }}
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
              ตั๋วของคุณ
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
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    color: "gray",
                    marginTop: 4,
                  }}
                >
                  {item.tableName}
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
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    textAlign: "center",
                  }}
                >
                  ดูการจอง
                </Text>
              </Pressable>
            </View>
            <Text style={{ marginTop: 8, fontSize: 15, fontWeight: "500" }}>
              {item.date}
            </Text>
          </Pressable>
        </ImageBackground>;
      })}
    </View>
  );
};

export default TicketComponent;

const styles = StyleSheet.create({});
