import { BackIcon } from "../../components/GetIcon";
import { StyleSheet } from "react-native";
import { Layout, Button } from "@ui-kitten/components";

const Backbutton = ({ route, navigation, style }) => {
  return (
    <Layout style={[styles.nav, style]}>
      <Button appearance="ghost" onPress={() => navigation.navigate(route)}>
        <BackIcon />
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  nav: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "start",
    backgroundColor: "transparent",
    marginLeft:10
  },
});

export default Backbutton;
