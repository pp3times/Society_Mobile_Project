import { AppLayout, Backbutton } from "@/components/";
import { Text, Layout } from "@ui-kitten/components";
import { StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";

const BarDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  return (
    <AppLayout>
      <ScrollView style={styles.container}>
        <Backbutton route="Main" navigation={navigation} style={{ position: "absolute", zIndex: 99 }} />
        <Image
          style={styles.img}
          source={{
            uri: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
          }}
        />
        <Layout style={styles.content}>
          <Text>ลาดกระบัง</Text>
          <Layout>
            <Text>โสดซิง - ลาดกระบัง</Text>
            <Layout>
              <Text>จำนวนโต๊ะว่าง</Text>
              <Text>20</Text>
              <Text>ที่นั่ง</Text>
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#101010",
  },
  img: {
    width: "100%",
    height: 250,
  },
  content: {
    marginTop: "5%",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: "10%",
  },
});

export default BarDetailScreen;
