import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import { StatusBar, SafeAreaView } from "react-native";

const AppLayout = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "15%",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#101010",
  },
});

export default AppLayout;
