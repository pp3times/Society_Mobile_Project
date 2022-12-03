import { AppLayout, Backbutton, StarIcon, CloseIcon } from "@/components/";
import { Text, Layout, Button, Avatar, Modal, Card, Input, ButtonGroup } from "@ui-kitten/components";
import { StyleSheet, ScrollView, Image, TouchableOpacity, View, StatusBar } from "react-native";
import { useState } from "react";

const BarDetailScreen = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const { id, name, image } = route.params;
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
      <StatusBar barStyle="dark-content" translucent={true} />
      <ScrollView style={styles.container}>
        <Backbutton navigation={navigation} style={{ position: "absolute", zIndex: 99 }} />
        <Image
          style={styles.img}
          source={{
            uri: image,
          }}
        />
        <Layout style={styles.content}>
          <Text style={{ fontSize: "18", color: "black" }}>{name}</Text>
          <Layout style={{ backgroundColor: "#ececec", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ fontSize: "20", fontWeight: "bold", color: "black" }}>โสดซิง - ลาดกระบัง</Text>
            <Layout style={{ backgroundColor: "#ececec", flexDirection: "column", alignItems: "center" }}>
              <Text style={{ fontSize: "12", color: "black" }}>จำนวนโต๊ะว่าง</Text>
              <Text style={{ fontSize: "30", color: "black" }}>20</Text>
              <Text style={{ fontSize: "12", color: "black" }}>ที่นั่ง</Text>
            </Layout>
          </Layout>
          <Text style={{ color: "black" }}>รายละเอียดร้าน</Text>
          <Text style={{ marginTop: 10, color: "black" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s
          </Text>
          <Layout style={styles.box}>
            <Layout style={{ backgroundColor: "#ececec", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
              <Button onPress={() => setVisible(true)} style={[{ backgroundColor: "black", borderColor: "white", width: "40%" }]}>
                รีวิวร้าน
              </Button>
              <Button onPress={() => navigation.navigate("Bars", { id: id, name: name, image: image })} style={{ width: "40%" }} status="control">
                จอง
              </Button>
            </Layout>
            {reviewList.map((review) => {
              return (
                <Layout key={review.id} style={{ borderRadius: "10%", backgroundColor: "black", padding: 15, marginTop: 20 }}>
                  <Layout style={{ backgroundColor: "black", flexDirection: "row", alignItems: "center" }}>
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
        <Card disabled={true} style={{ backgroundColor: "black", width: "100%" }}>
          <Layout style={{ width: "100%", flexDirection: "row", justifyContent: "end", backgroundColor: "transparent", marginLeft: -15 }}>
            <Button appearance="ghost" onPress={() => setVisible(false)}>
              <CloseIcon />
            </Button>
          </Layout>
          <Layout style={styles.modal}>
            <Layout style={{ backgroundColor: "transparent", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <Text style={{ fontSize: 15, marginRight: 15 }}>คะแนน</Text>
              <ButtonGroup style={styles.buttonGroup} appearance="ghost">
                <Button appearance="ghost" style={{ backgroundColor: score == 1 ? "#303030" : "black" }} onPress={() => setScore(1)}>
                  <StarIcon />
                </Button>
                <Button appearance="ghost" style={{ backgroundColor: score == 2 ? "#303030" : "black" }} onPress={() => setScore(2)}>
                  <StarIcon />
                </Button>
                <Button appearance="ghost" style={{ backgroundColor: score == 3 ? "#303030" : "black" }} onPress={() => setScore(3)}>
                  <StarIcon />
                </Button>
                <Button appearance="ghost" style={{ backgroundColor: score == 4 ? "#303030" : "black" }} onPress={() => setScore(4)}>
                  <StarIcon />
                </Button>
                <Button appearance="ghost" style={{ backgroundColor: score == 5 ? "#303030" : "black" }} onPress={() => setScore(5)}>
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
    backgroundColor: "black",
    marginBottom: 20,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: "100%",
    backgroundColor: "#ececec",
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
    backgroundColor: "#ececec",
  },
  box: {
    marginTop: "5%",
    paddingTop: "5%",
    borderTopWidth: 2,
    borderTopColor: "black",
    width: "100%",
    backgroundColor: "#ececec",
  },
});

export default BarDetailScreen;
