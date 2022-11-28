import { AppLayout, UploadIcon } from "@/components/";
import { Text, Layout, Input, Button } from "@ui-kitten/components";
import { Image, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";

const BarRegisScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phonefirstName: "",
      lastName: "",
    },
  });
  const onSubmit = (data) => {
    // const datas = new FormData();

    // datas.append("images", {
    //   name: image.fileName,
    //   type: image.type,
    //   uri: Platform.OS === "android" ? selectedImage.uri : selectedImage.uri.replace("file://", ""),
    // });
    // axios({
    //   method: "POST",
    //   url: API_NO_PARAM_CONFIG.createCampaign,
    //   headers: {
    //     Authorization: `Bearer ${e}`,
    //     "Content-Type": "multipart/form-data", // add this
    //   },
    //   datas, //pass datas directly
    // });
    console.log(data);
    navigation.navigate("Home");
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

  return (
    <AppLayout>
      <Text style={{ fontSize: 25, fontWeight: "400", marginTop:10 }}>สมัครสมาชิกร้าน</Text>
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
                  style={[styles.input, { backgroundColor: "black" }]}
                  status="control"
                  placeholder="เบอร์โทร"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="phone"
            />
            {errors.phone && <Text>This is required.</Text>}
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
                  placeholder="รหัสผ่าน"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="phone"
            />
            {errors.phone && <Text>This is required.</Text>}
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
                  style={{ backgroundColor: "black", marginTop: 10 }}
                  status="control"
                  placeholder="ชื่อร้าน"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="barname"
            />
            {errors.barname && <Text>This is required.</Text>}
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
                    style={[{ backgroundColor: "black" }]}
                    status="control"
                    placeholder="เวลาเปิด-ปิด"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="time"
              />
              {errors.time && <Text>This is required.</Text>}
            </Layout>

            <Layout style={{ backgroundColor: "#101010", width: "48%" }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    style={[{ backgroundColor: "black" }]}
                    status="control"
                    placeholder="ที่นั่ง"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="seat"
              />
              {errors.seat && <Text>This is required.</Text>}
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
                  style={[{ backgroundColor: "black", width: "100%" }]}
                  status="control"
                  placeholder="รายละเอียดของร้าน"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="detail"
            />
            {errors.detail && <Text>This is required.</Text>}
          </Layout>
          <Layout style={{ backgroundColor: "#101010", marginTop: 20 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={[{ backgroundColor: "black", width: "100%" }]}
                  status="control"
                  placeholder="ที่อยู่"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="address"
            />
            {errors.address && <Text>This is required.</Text>}
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
                    style={[{ backgroundColor: "black" }]}
                    status="control"
                    placeholder="เขต/ตำบล"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="subdistrict"
              />
              {errors.subdistrict && <Text>This is required.</Text>}
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
                    style={[{ backgroundColor: "black" }]}
                    status="control"
                    placeholder="เบอร์โทรศัพท์"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="phone"
              />
              {errors.phone && <Text>This is required.</Text>}
            </Layout>
          </Layout>
          <Layout style={{ backgroundColor: "#101010", width: "100%", marginTop: 20 }}>
            <Button appearance="outline" status="basic" accessoryRight={UploadIcon} style={{ backgroundColor: "black" }} onPress={pickImage}>
              รูปภาพร้าน
            </Button>
            {image && <Image source={{ uri: image }} style={{ width: "100%", height: 200 }} />}
          </Layout>
          <Button style={{ marginTop: "5%", width: "100%" }} onPress={handleSubmit(onSubmit)} status="control">
            สร้างร้าน
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
