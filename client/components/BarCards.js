import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import bars from "../data/bars";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import { BarsCards } from "./Context";
import TicketComponent from "./TicketComponent";
import { TouchableOpacity } from "react-native-gesture-handler";

const BarCards = () => {
  const data = bars;
  const navigation = useNavigation();
  const { ticket } = useContext(BarsCards);
  useEffect(() => {
    console.log(ticket, "is ticket");
    console.log(typeof ticket);
  }, [ticket]);
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        // ListHeaderComponent={Header}
        ListHeaderComponent={ticket ? TicketComponent : Header}
        // ListHeaderComponent={
        //   Object.keys(ticket).length === 0 && ticket.constructor === Object
        //     ? Header
        //     : TicketComponent
        // }
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Detail", {
                id: item.id,
                name: item.name,
                image: item.image,
              })
            }
            style={{ margin: 10, marginHorizontal: 15 }}
          >
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
            <Text style={{ marginTop: 4, fontSize: 15, color: "gray" }}>{item.genre}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BarCards;
