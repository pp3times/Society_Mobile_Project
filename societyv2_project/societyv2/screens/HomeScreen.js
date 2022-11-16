import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import Header from "../components/Header";
import BarCards from "../components/BarCards";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#E0E0E0", flex: 1 }}>
      <BarCards />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
