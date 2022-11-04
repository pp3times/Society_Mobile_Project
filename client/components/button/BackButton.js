import { BackIcon } from "../../components/GetIcon";
import { StyleSheet } from "react-native";
import { Layout, Button } from "@ui-kitten/components";

const Backbutton = ({ route, navigation }) => {
  return (
    <Layout style={styles.nav}>
      <Button accessoryLeft={BackIcon(styles.icon)} appearance="ghost" onPress={() => navigation.navigate(route)}>
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  nav: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "start",
    backgroundColor: "#101010",
  }
});

export default Backbutton;
