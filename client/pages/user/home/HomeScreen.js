import { StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Input, Icon, Text, Layout, Button, TopNavigationAction, TopNavigation } from "@ui-kitten/components";
import { AppLayout } from "@/components";
const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const listBar = [
    {
      id: 1,
      barName: "me smile",
      img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 2,
      barName: "me smile",
      img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 3,
      barName: "me smile",
      img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 4,
      barName: "me smile",
      img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 5,
      barName: "me smile",
      img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 6,
      barName: "me smile",
      img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 7,
      barName: "me smile",
      img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 8,
      barName: "me smile",
      img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    },
  ];

  return (
    <AppLayout>
      <ScrollView style={styles.container}>
        <Input
          style={[styles.input, { backgroundColor: "black" }]}
          size="large"
          status="control"
          placeholder="ค้าหาร้าน"
          value={search}
          onChangeText={(nextValue) => setSearch(nextValue)}
        />
        <Layout style={[styles.bar, { marginVertical: "10%" }]}>
          <Text style={styles.title}>ร้าน และบาร์ใกล้ฉัน</Text>
          <Text onPress={() => navigation.navigate("AllBar")}>เพิ่มเติม</Text>
        </Layout>
        <ScrollView horizontal={true} style={[styles.scrollHorizontal]}>
          {listBar.map((bar) => {
            return (
              <TouchableOpacity key={bar.id} style={styles.boxNear} onPress={() => navigation.navigate("BarDeatil", { barId: bar.id })}>
                <Text style={{ color:'white', fontWeight: 'bold'  }}>{bar.barName}</Text>
                <Image
                  style={styles.NearBarImg}
                  source={{
                    uri: bar.img,
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Layout style={[styles.bar, { marginVertical: "10%" }]}>
          <Text style={styles.title}>ร้านยอดนิยม</Text>
        </Layout>
          {listBar.map((bar) => {
            return (
              <TouchableOpacity key={bar.id} style={styles.boxHit} onPress={() => navigation.navigate("BarDeatil", { barId: bar.id })}>
                <Text style={{ color:'white', fontWeight: 'bold'  }}>{bar.barName}</Text>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: bar.img,
                  }}
                />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: "10%",
    backgroundColor: "#101010",
    paddingHorizontal: "5%",
  },
  title: {
    fontSize: 20,
    fontWeight: "medium",
  },
  bar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#101010",
  },
  logo: {
    marginVertical: "20%",
  },
  buttonGroup: {
    flex: 1,
    width: "80%",
    marginTop: 2,
    rowGap: 20,
  },
  input: {
    marginTop: "7%",
  },
  boxHit: {
    marginBottom: 10,
    width: "100%",
    borderRadius: "5%",
    padding: 5,
  },
  boxNear: {
    marginRight: 10,
    width: 150,
    height: 200,
    borderRadius: "5%",
    padding: 5,
  },
  NearBarImg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  scorllVertical: {
    width: "100%",
  },
  scrollHorizontal: {
    width: "100%",
  },
  tinyLogo: {
    width: "100%",
    height: 100,
  },
});

export default HomeScreen;
