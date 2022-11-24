import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { Header, BarCards } from "@/components/";

const HomeScreen = () => {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <BarCards />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
