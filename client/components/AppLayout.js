import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";

const AppLayout = ({ children }) => <Layout style={styles.container}>{children}</Layout>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:'15%',
    justifyContent: "start",
    alignItems: "center",
    flexDirection:"column"
  },
});

export default AppLayout;
