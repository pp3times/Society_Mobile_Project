import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import bars from "../data/bars";
import Header from "./Header";
import { BACKEND_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import { BarsCards } from "./Context";
import TicketComponent from "./TicketComponent";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

const BarCards = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const { ticket } = useContext(BarsCards);
  const getBar = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/bar/all`);
      console.log(res.data.data)
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBar();
  }, []);
  useEffect(() => {
    // console.log(ticket, "is ticket");
    // console.log(typeof ticket);
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
          <TouchableOpacity onPress={() => navigation.navigate("Detail", { barDetail: item })} style={{ margin: 10, marginHorizontal: 15 }}>
            <Image
              style={{
                aspectRatio: 2 / 3,
                height: 240,
                borderRadius: 6,
              }}
              source={{ url: `${item.bannerImage}` || "https://api.lorem.space/image/drink?w=150&h=150&hash=8B7BCDC2" }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                width: 170,
                marginTop: 10,
              }}
            >
              {item.name}
            </Text>
            <Text style={{ marginTop: 4, fontSize: 15, color: "gray" }}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BarCards
