import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import Header from "../components/Header";
import BarCards from "../components/BarCards";

const HomeScreen = () => {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <BarCards />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
