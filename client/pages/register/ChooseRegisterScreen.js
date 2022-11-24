import AppLayout from "../../components/AppLayout";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Icon, Text, Layout, Button, TopNavigationAction, TopNavigation } from "@ui-kitten/components";
import Backbutton from "../../components/button/BackButton";
import Logo from "../../components/Svg/Logo";

const ChooseRegisterScreen = ({ navigation }) => {
  return (
    <AppLayout>
      <Backbutton navigation={navigation} />
      <Logo style={styles.logo} />
      <Layout style={styles.buttonGroup}>
        <Button style={styles.input} onPress={() => navigation.navigate("CustomerRegis")} size="large" status="control">
          สมัครสมาชิก
        </Button>
        <Button
          style={[styles.input, { backgroundColor: "black" }]}
          onPress={() => navigation.navigate("BarRegis")}
          size="large"
          appearance="outline"
          status="control"
        >
          ลงทะเบียนร้าน
        </Button>
      </Layout>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginVertical: "20%",
  },
  inputGroup: {
    flex: 1,
    width: "80%",
    marginTop: 2,
    rowGap: 20,
    backgroundColor: "#101010",
  },
  buttonGroup: {
    flex: 1,
    width: "80%",
    marginTop: 2,
    rowGap: 20,
    backgroundColor: "#101010",
  },
  input: {
    marginTop: "7%",
  },
});

export default ChooseRegisterScreen;
