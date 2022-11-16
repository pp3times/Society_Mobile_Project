import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useContext } from "react";
import bars from "../data/bars";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import { BarsCards } from "../Context";
import TicketComponent from "./TicketComponent";

const BarCards = () => {
  const data = bars;
  const navigation = useNavigation();
  const { ticket } = useContext(BarsCards);
	console.log(ticket, "is ticket");
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={ticket.length > 0 ? TicketComponent : Header}
        data={data}
        renderItem={({ item }) => (
          <Pressable style={{ margin: 10, marginHorizontal: 15 }}>
            <Image
              style={{
                aspectRatio: 2 / 3,
                height: 240,
                borderRadius: 6,
              }}
              source={{ url: item.image }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                width: 170,
                marginTop: 10,
              }}
            >
              {item.name.substring(0.16) + "..."}
            </Text>
            <Text style={{ marginTop: 4, fontSize: 15, color: "gray" }}>
              {item.genre}
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate("Bars", {
                  id: item.id,
                  name: item.name,
                  image: item.image,
                })
              }
              style={{
                backgroundColor: "#FFC40C",
                padding: 10,
                borderRadius: 6,
                marginRight: 10,
                marginTop: 10,
                width: 100, // เอาออกก็สวยอยู่เด้
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                จองที่นั่ง
              </Text>
            </Pressable>
          </Pressable>
        )}
      />
    </View>
  );
};

export default BarCards;

const styles = StyleSheet.create({});
