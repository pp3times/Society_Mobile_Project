import { AppLayout, Backbutton, StarIcon, CloseIcon } from "@/components/";
import { Text, Layout, Button, Avatar, Modal, Card, Input, ButtonGroup } from "@ui-kitten/components";
import { StyleSheet, ScrollView, Image, TouchableOpacity, View, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@env";
import * as SecureStore from "expo-secure-store";

const BarDetailScreen = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const { barDetail } = route.params;
  const [reviewList, setReviewList] = useState([]);
  // const reviewList = [
  //   { id: 2, review: 2 },
  //   { id: 1, review: 5 },
  // ];
  const [score, setScore] = useState();
  const [textReview, setTextReview] = useState("");

  const submitReview = async () => {
    try {
      const uid = await SecureStore.getItemAsync("uid");
      const data = {
        barId: Number(barDetail.id),
        userId: Number(uid),
        score: score,
        message: textReview,
      };
      const res = await axios.post(`${BACKEND_URL}/api/bar/review`, data);
      setReviewList([...reviewList, res.data.data]);
      setVisible(false);
      setScore(0);
      setTextReview("");
    } catch (error) {
      console.log(error);
    }
  };

  const getReview = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/bar/review/${barDetail.id}`);
      setReviewList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  const ReviewStar = ({ time }) => {
    let star = [];

    for (let index = 0; index < time; index++) {
      star.push(<StarIcon />);
    }

    return star;
  };

  return (
    <AppLayout>
      <ScrollView style={styles.container}>
        <Backbutton navigation={navigation} style={{ position: "absolute", zIndex: 99 }} />
        <Image
          style={styles.img}
          source={{
            uri: barDetail.bannerImage,
          }}
        />
        <Layout style={styles.content}>
          <Text style={{ fontSize: "18", color: "white" }}>{barDetail.name}</Text>
          <Layout
            style={{
              backgroundColor: "#171717",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: "20", fontWeight: "bold", color: "white" }}>
              ร้าน {barDetail.name} - {barDetail.district}
            </Text>
            <Layout
              style={{
                backgroundColor: "#171717",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: "12", color: "white" }}>จำนวนโต๊ะว่าง</Text>
              <Text style={{ fontSize: "30", color: "white" }}>{barDetail.tableCount}</Text>
              <Text style={{ fontSize: "12", color: "white" }}>ที่นั่ง</Text>
            </Layout>
          </Layout>
          <Text style={{ color: "white" }}>{barDetail.description}</Text>
          <Layout style={styles.box}>
            <Layout
              style={{
                backgroundColor: "#171717",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button
                onPress={() => setVisible(true)}
                style={[
                  {
                    backgroundColor: "#2e2e2e",
                    borderColor: "#2e2e2e",
                    width: "40%",
                  },
                ]}
              >
                รีวิวร้าน
              </Button>
              <Button
                onPress={() =>
                  navigation.navigate("Bars", {
                    id: barDetail.id,
                    name: barDetail.name,
                    image: barDetail.bannerImage,
                  })
                }
                style={{
                  width: "40%",
                  backgroundColor: "#fff",
                  borderColor: "#5c5c5c",
                  shadowColor: "#878787",
                  paddingLeft: 20,
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.55,
                  shadowRadius: 14.78,
                  elevation: 5,
                }}
                status="control"
              >
                จองตอนนี้❗️
              </Button>
            </Layout>
            {reviewList.map((review) => {
              return (
                <Layout
                  key={review.id}
                  style={{
                    borderRadius: "10%",
                    backgroundColor: "black",
                    padding: 15,
                    marginTop: 20,
                  }}
                >
                  <Layout
                    style={{
                      backgroundColor: "black",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ marginRight: 10 }}>คุณ thun</Text>
                    <ReviewStar time={review.score} />
                  </Layout>
                  <Text style={{ fontSize: 10, marginVertical: 10 }}>{review.createdAt}</Text>
                  <Text>{review.comment}</Text>
                </Layout>
              );
            })}
          </Layout>
        </Layout>
      </ScrollView>
      {/* modal */}
      <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => setVisible(false)}>
        <Card disabled={true} style={{ backgroundColor: "black", width: "100%" }}>
          <Layout
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "end",
              backgroundColor: "transparent",
              marginLeft: -15,
            }}
          >
            <Button appearance="ghost" onPress={() => setVisible(false)}>
              <CloseIcon />
            </Button>
          </Layout>
          <Layout style={styles.modal}>
            <Layout
              style={{
                backgroundColor: "transparent",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
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
    backgroundColor: "#171717",
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
    backgroundColor: "#171717",
    marginBottom: 20,
  },
  box: {
    marginTop: "5%",
    paddingTop: "5%",
    borderTopWidth: 2,
    borderTopColor: "black",
    width: "100%",
    backgroundColor: "#171717",
  },
});

export default BarDetailScreen;
