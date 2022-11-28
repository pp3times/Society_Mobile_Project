import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { Header, BarCards } from "@/components/";
import UserLayout from "../../components/UserLayout";

const HomeScreen = () => {
  return (
    <UserLayout>
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <BarCards />
      </View>
    </UserLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
