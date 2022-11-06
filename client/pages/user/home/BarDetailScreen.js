import { AppLayout, Backbutton, StarIcon, CloseIcon } from "@/components/";
import { Text, Layout, Button, Avatar, Modal, Card, Input, ButtonGroup } from "@ui-kitten/components";
import { StyleSheet, ScrollView, Image, TouchableOpacity, View } from "react-native";
import { useState } from "react";

const BarDetailScreen = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const { id } = route.params;
  const reviewList = [{ id: 2 }, { id: 1 }];
  const [score, setScore] = useState();
  const [textReview, setTextReview] = useState("");

  const submitReview = () => {
    setVisible(false);
    setScore(0);
    setTextReview("");
    console.log("submitReview", score, textReview);
  };
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
          <Text style={{ fontSize: "18" }}>ลาดกระบัง</Text>
          <Layout style={{ backgroundColor: "#101010", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ fontSize: "20", fontWeight: "bold" }}>โสดซิง - ลาดกระบัง</Text>
            <Layout style={{ backgroundColor: "#101010", flexDirection: "column", alignItems: "center" }}>
              <Text style={{ fontSize: "12" }}>จำนวนโต๊ะว่าง</Text>
              <Text style={{ fontSize: "30" }}>20</Text>
              <Text style={{ fontSize: "12" }}>ที่นั่ง</Text>
            </Layout>
          </Layout>
          <Text>รายละเอียดร้าน</Text>
          <Text style={{ marginTop: 10 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s
          </Text>
          <Layout style={styles.box}>
            <Layout style={{ backgroundColor: "#101010", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
              <Button onPress={() => setVisible(true)} style={[{ backgroundColor: "black", borderColor: "white", width: "40%" }]}>
                รีวิวร้าน
              </Button>
              <Button onPress={() => navigation.navigate("UserBooking", { id: 1 })} style={{ width: "40%" }} status="control">
                จอง
              </Button>
            </Layout>
            {reviewList.map((review) => {
              return (
                <Layout key={review.id} style={{ borderRadius: "10%", backgroundColor: "#303030", padding: 15, marginTop: 20 }}>
                  <Layout style={{ backgroundColor: "#303030", flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ marginRight: 10 }}>คุณ thun</Text>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </Layout>
                  <Text style={{ fontSize: 10, marginVertical: 10 }}>1 มกราคม 2565</Text>
                  <Text>บรรยากาศเป็นกันเองมากครับ นั่งแล้วชิลดี เหมาะสำหรับมากับคู่รัก กลุ่มเพื่อน หรือมาคนเดียวก็ยังได้ครับ</Text>
                </Layout>
              );
            })}
          </Layout>
        </Layout>
      </ScrollView>
      {/* modal */}
      <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => setVisible(false)}>
        <Card disabled={true} style={{ backgroundColor: "#101010", width: "100%" }}>
          <Layout style={{ width: "100%", flexDirection: "row", justifyContent: "end", backgroundColor: "transparent", marginLeft: -15 }}>
            <Button appearance="ghost" onPress={() => setVisible(false)}>
              <CloseIcon />
            </Button>
          </Layout>
          <Layout style={styles.modal}>
            <Layout style={{ backgroundColor: "transparent", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <Text style={{ fontSize: 15, marginRight: 15 }}>คะแนน</Text>
              <ButtonGroup style={styles.buttonGroup} appearance="ghost">
                <Button appearance="ghost" onPress={() => setScore(1)}>
                  <StarIcon />
                </Button>
                <Button appearance="ghost" onPress={() => setScore(2)}>
                  <StarIcon />
                </Button>
                <Button appearance="ghost" onPress={() => setScore(3)}>
                  <StarIcon />
                </Button>
                <Button appearance="ghost" onPress={() => setScore(4)}>
                  <StarIcon />
                </Button>
                <Button appearance="ghost" onPress={() => setScore(5)}>
                  <StarIcon />
                </Button>
              </ButtonGroup>
            </Layout>
            <Text style={{ fontSize: 15, marginBottom: 10 }}>รีวิว</Text>
            <Input
              onChangeText={(txt) => {
                setTextReview(txt);
              }}
              multiline={true}
              textStyle={{ minHeight: 100, width: 250 }}
              status="control"
              placeholder="ข้อความ"
            />
          </Layout>
          <Button status="control" size="small" onPress={submitReview}>
            รีวิว
          </Button>
        </Card>
      </Modal>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#101010",
    marginBottom: 20,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
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
    paddingHorizontal: "5%",
    backgroundColor: "#101010",
  },
  box: {
    marginTop: "5%",
    paddingTop: "5%",
    borderTopWidth: 2,
    borderTopColor: "white",
    width: "100%",
    backgroundColor: "#101010",
  },
});

export default BarDetailScreen;
