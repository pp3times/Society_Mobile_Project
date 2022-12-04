import { AppLayout, UploadIcon, Backbutton } from "@/components/";
import { Text, Layout, Input, Button } from "@ui-kitten/components";
import { Image, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { BACKEND_URL } from "@env";

const BarRegisScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [timeOpen, setTimeOpen] = useState(new Date(1598051730000));
  const [timeClose, setTimeClose] = useState(new Date(1598051730000));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data) => {
    try {
      data.openTime = timeOpen;
      data.closeTime = timeClose;
      if (data.password !== data.confirmPassword) {
        Alert.alert("สมัครสามาชิกผิดพลาด", "รหัสผ่านไม่ตรงกัน โปรดลองอีกครั้ง", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]);
      } else {
        delete data.confirmPassword;
        const datas = new FormData();
        datas.append("images", {
          name: image.fileName,
          type: image.type,
          uri: Platform.OS === "android" ? selectedImage.uri : selectedImage.uri.replace("file://", ""),
        });

        axios({
          method: "POST",
          url: `${BACKEND_URL}/api/bar/create`,
          headers: {
            "Content-Type": "multipart/form-data", // add this
          },
          datas, //pass datas directly
        });
        const res = await axios.post(`${BACKEND_URL}/api/bar/create`, data);
        const uid = res.data.data.id;
        await SecureStore.setItemAsync("uid", uid);
        navigation.navigate("admin");
      }
    } catch (e) {
      console.log(e.response);
    }
    // navigation.navigate("Home");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log();
    }
  };

  const onChangeTimeOpen = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTimeOpen(currentDate);
  };
  const onChangeTimeClose = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTimeClose(currentDate);
  };

  return (
    <AppLayout>
      <Backbutton navigation={navigation} style={{ position: "absolute", zIndex: 99, top: "10%" }} />
      <Text style={{ fontSize: 25, fontWeight: "400", marginTop: 10 }}>สมัครสมาชิกร้าน</Text>
      <Layout style={{ width: "80%", flexDirection: "column", alignItems: "center", backgroundColor: "#101010", marginBottom: "30%" }}>
        <ScrollView style={{ width: "100%" }}>
          <Layout style={{ backgroundColor: "#101010", width: "100%" }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize="none"
                  style={[styles.input, { backgroundColor: "black" }]}
                  status="control"
                  placeholder="อีเมล"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="email"
            />
            {errors.email && <Text>This is required.</Text>}
          </Layout>
          <Layout style={{ backgroundColor: "#101010", width: "100%" }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize="none"
                  style={[styles.input, { backgroundColor: "black" }]}
                  status="control"
                  placeholder="รหัสผ่าน"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="password"
            />
            {errors.password && <Text>This is required.</Text>}
          </Layout>
          <Layout style={{ backgroundColor: "#101010", width: "100%" }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize="none"
                  style={[styles.input, { backgroundColor: "black" }]}
                  status="control"
                  placeholder="ยืนยันรหัสผ่าน"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && <Text>This is required.</Text>}
          </Layout>
          <Text style={{ width: "100%", textAlign: "center", marginTop: 20 }}>ส่วนของร้าน</Text>
          <Layout style={{ backgroundColor: "#101010", width: "100%" }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize="none"
                  style={{ backgroundColor: "black", marginTop: 10 }}
                  status="control"
                  placeholder="ชื่อร้าน"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="name"
            />
            {errors.name && <Text>This is required.</Text>}
          </Layout>
          <Layout style={{ width: "100%", flexDirection: "row", marginTop: 20, backgroundColor: "#101010", justifyContent: "space-between" }}>
            <Layout style={{ backgroundColor: "#101010", width: "24%" }}>
              <DateTimePicker
                style={{ borderWidth: 0.5, borderRadius: 4, color: "white", borderColor: "white", backgroundColor: "black" }}
                testID="dateTimePicker"
                value={timeOpen}
                themeVariant="dark"
                mode="time"
                is24Hour="true"
                onChange={onChangeTimeOpen}
              />
            </Layout>
            <Layout style={{ backgroundColor: "#101010", width: "24%" }}>
              <DateTimePicker
                style={{ borderWidth: 0.5, borderRadius: 4, color: "#ffffff", textColor: "white", borderColor: "white", backgroundColor: "black" }}
                testID="dateTimePicker"
                value={timeClose}
                themeVariant="dark"
                mode="time"
                is24Hour="true"
                onChange={onChangeTimeClose}
              />
            </Layout>

            <Layout style={{ backgroundColor: "#101010", width: "48%" }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    autoCapitalize="none"
                    style={[{ backgroundColor: "black" }]}
                    status="control"
                    placeholder="ที่นั่ง"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="tableCount"
              />
              {errors.tableCount && <Text>This is required.</Text>}
            </Layout>
          </Layout>
          <Layout style={{ backgroundColor: "#101010", marginTop: 20 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize="none"
                  style={[{ backgroundColor: "black", width: "100%" }]}
                  status="control"
                  placeholder="รายละเอียดของร้าน"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="description"
            />
            {errors.description && <Text>This is required.</Text>}
          </Layout>
          <Layout style={{ backgroundColor: "#101010", marginTop: 20 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize="none"
                  style={[{ backgroundColor: "black", width: "100%" }]}
                  status="control"
                  placeholder="ที่อยู่"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="Address"
            />
            {errors.Address && <Text>This is required.</Text>}
          </Layout>

          <Layout style={{ width: "100%", flexDirection: "row", backgroundColor: "#101010", justifyContent: "space-between" }}>
            <Layout style={{ backgroundColor: "#101010", width: "48%", marginTop: 20 }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    autoCapitalize="none"
                    style={[{ backgroundColor: "black" }]}
                    status="control"
                    placeholder="แขวง/อำเภอ"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="district"
              />
              {errors.district && <Text>This is required.</Text>}
            </Layout>
            <Layout style={{ backgroundColor: "#101010", width: "48%", marginTop: 20 }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    autoCapitalize="none"
                    style={[{ backgroundColor: "black" }]}
                    status="control"
                    placeholder="เขต/ตำบล"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="sub_district"
              />
              {errors.sub_district && <Text>This is required.</Text>}
            </Layout>
          </Layout>
          <Layout style={{ width: "100%", flexDirection: "row", marginTop: 20, backgroundColor: "#101010", justifyContent: "space-between" }}>
            <Layout style={{ backgroundColor: "#101010", width: "48%" }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    autoCapitalize="none"
                    style={[{ backgroundColor: "black" }]}
                    status="control"
                    placeholder="จังหวัด"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="province"
              />
              {errors.province && <Text>This is required.</Text>}
            </Layout>
            <Layout style={{ backgroundColor: "#101010", width: "48%" }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    autoCapitalize="none"
                    style={[{ backgroundColor: "black" }]}
                    status="control"
                    placeholder="เบอร์โทรศัพท์"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="phoneNumber"
              />
              {errors.phoneNumber && <Text>This is required.</Text>}
            </Layout>
          </Layout>
          <Layout style={{ backgroundColor: "#101010", width: "100%", marginTop: 20 }}>
            <Button appearance="outline" status="basic" accessoryRight={UploadIcon} style={{ backgroundColor: "black" }} onPress={pickImage}>
              รูปภาพร้าน
            </Button>
            {image && <Image source={{ uri: image }} style={{ width: "100%", height: 200 }} />}
          </Layout>
          <Button style={{ marginTop: "5%", width: "100%" }} onPress={handleSubmit(onSubmit)} status="control">
            สมัครสมาชิกร้าน
          </Button>
        </ScrollView>
      </Layout>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    backgroundColor: "#101010",
    alignItems: "center",
  },
  input: {
    marginTop: "7%",
  },
});

export default BarRegisScreen;
