import AppLayout from "../../components/AppLayout";
import Backbutton from "../../components/button/BackButton";
import { Text, Layout, Input, Button } from "@ui-kitten/components";
import { StyleSheet, Alert } from "react-native";
import { useState } from "react";
import Logo from "../../components/Svg/Logo";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { BACKEND_URL } from "@env";
import * as SecureStore from "expo-secure-store";

const CustomerRegisScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const Error = ({ name }) => {
    return errors[name] && <Text style={{ marginTop: 5, color: "red" }}>This is required.</Text>;
  };

  const onSubmit = async (data) => {
    console.log(data);
    if (data.password != data.confirmPassword) {
      Alert.alert("สมัครสามาชิกผิดพลาด", "รหัสผ่านไม่ตรงกัน โปรดลองอีกครั้ง", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
    } else {
      try {
        delete data.confirmPassword;
        const res = await axios.post(`${BACKEND_URL}/api/auth/register`, data);
        if (!res.data.status) {
          throw {
            message: res.data.message,
          };
        }
        const uid = String(res.data.message.id);
        await SecureStore.setItemAsync("uid", uid);
        navigation.navigate("user");
      } catch (error) {
        console.log(error);
        Alert.alert("สมัครสามาชิกผิดพลาด", error.message, [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]);
      }
    }
  };

  return (
    <AppLayout>
      <Backbutton navigation={navigation} />
      <Logo style={styles.logo} />
      <Layout style={styles.inputGroup}>
        <Layout style={{ backgroundColor: "#101010", width: "100%" }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={[styles.input, { backgroundColor: "black" }]}
                status="control"
                autoCapitalize="none"
                placeholder="ชื่อเล่น"
                vvalue={value}
                required
                onChangeText={onChange}
              />
            )}
            name="name"
          />
          <Error name="name" />
        </Layout>
        <Layout style={{ backgroundColor: "#101010", width: "100%" }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={[styles.input, { backgroundColor: "black" }]}
                status="control"
                autoCapitalize="none"
                placeholder="เบอร์โทรศัพท์"
                vvalue={value}
                required
                onChangeText={onChange}
              />
            )}
            name="phoneNumber"
          />
          <Error name="phoneNumber" />
        </Layout>
        <Layout style={{ backgroundColor: "#101010", width: "100%" }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={[styles.input, { backgroundColor: "black" }]}
                status="control"
                autoCapitalize="none"
                placeholder="อีเมล"
                vvalue={value}
                required
                onChangeText={onChange}
              />
            )}
            name="email"
          />
          <Error name="email" />
        </Layout>
        <Layout style={{ backgroundColor: "#101010", width: "100%" }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={[styles.input, { backgroundColor: "black" }]}
                status="control"
                autoCapitalize="none"
                placeholder="รหัสผ่าน"
                vvalue={value}
                required
                onChangeText={onChange}
              />
            )}
            name="password"
          />
          <Error name="password" />
        </Layout>
        <Layout style={{ backgroundColor: "#101010", width: "100%" }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={[styles.input, { backgroundColor: "black" }]}
                status="control"
                autoCapitalize="none"
                placeholder="ยืนยันรหัสผ่าน"
                vvalue={value}
                required
                onChangeText={onChange}
              />
            )}
            name="confirmPassword"
          />
          <Error name="confirmPassword" />
        </Layout>
        <Button style={{ marginVertical: "10%", width: "100%" }} onPress={handleSubmit(onSubmit)} status="control" autoCapitalize="none">
          สมัครสมาชิก
        </Button>
      </Layout>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    flex: 1,
    width: "80%",
    backgroundColor: "#101010",
    alignItems: "center",
  },
  input: {
    marginTop: "5%",
  },
});

export default CustomerRegisScreen;
