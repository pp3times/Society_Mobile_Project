import { AppLayout, UploadIcon } from "@/components/";
import { Text, Layout, Card, Input, Button } from "@ui-kitten/components";
import { Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";

const InfoBarScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  useEffect(() => {}, []);

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

  const Error = ({ name }) => {
    return errors[name] && <Text style={{ color: "red" }}>โปรดตรวจสอบข้อมูล</Text>;
  };

  const pickImage = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
      .then((res) => {
        console.log(res);
        setImage(res.uri);
      })
      .catch((err) => {});
  };

  return (
    <AppLayout>
      <Text style={{ fontSize: 25, fontWeight: "400", marginTop: 20 }}>แก้ไขข้อมูลร้าน</Text>
      <ScrollView style={{ width: "90%" }}>
        <Layout style={{ width: "100%", flexDirection: "column", alignItems: "center", backgroundColor: "#101010", marginTop: 30 }}>
          <Card style={{ width: "100%" }}>
            <Layout style={{ backgroundColor: "#101010", width: "100%" }}>
              <Button appearance="ghost" status="basic" accessoryRight={UploadIcon} onPress={pickImage}>
                รูปภาพร้าน
              </Button>
              {image && <Image source={{ uri: image }} style={{ width: "100%", height: 200 }} />}
            </Layout>
          </Card>
          <Text style={{ color: "white", textAlign: "center", marginTop: 20, fontWeight: "600" }}>ข้อมูลร้าน</Text>
          <Card style={{ marginTop: 10, width: "100%" }}>
            <Text style={{ color: "gray" }}>ชื่อร้าน</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={[{ backgroundColor: "black", width: "100%", marginTop: 10 }]}
                  status="control"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size="small"
                />
              )}
              name="barName"
            />
            <Error name="barName" />
          </Card>
          <Card style={{ marginTop: 10, width: "100%" }}>
            <Text style={{ color: "gray" }}>จำนวนที่นั่ง</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={[{ backgroundColor: "black", width: "100%", marginTop: 10 }]}
                  status="control"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size="small"
                />
              )}
              name="numberSeat"
            />
            <Error name="numberSeat" />
          </Card>
          <Card style={{ marginTop: 10, width: "100%" }}>
            <Text style={{ color: "gray" }}>รายละเอียด</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={[{ backgroundColor: "black", width: "100%", marginTop: 10 }]}
                  status="control"
                  placeholder="ชื่อร้าน"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size="small"
                />
              )}
              name="detail"
            />
            <Error name="detail" />
          </Card>
          <Card style={{ marginTop: 10, width: "100%" }}>
            <Text style={{ color: "gray" }}>เวลาเปิดปิด</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={[{ backgroundColor: "black", width: "100%", marginTop: 10 }]}
                  status="control"
                  placeholder="เวลาเปิดปิด"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size="small"
                />
              )}
              name="time"
            />
            <Error name="time" />
          </Card>
          {/* info account */}
          <Text style={{ color: "white", textAlign: "center", marginTop: 20, fontWeight: "600" }}>ข้อมูลบัญชี</Text>
          <Card style={{ marginTop: 10, width: "100%" }}>
            <Text style={{ color: "gray" }}>เบอร์โทรศัพท์ร้าน</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={[{ backgroundColor: "black", width: "100%", marginTop: 10 }]}
                  status="control"
                  placeholder="เบอร์โทรศัพท์ร้าน"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size="small"
                />
              )}
              name="barPhone"
            />
            <Error name="barPhone" />
          </Card>
          <Card style={{ marginTop: 10, width: "100%" }}>
            <Text style={{ color: "gray" }}>อีเมล</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={[{ backgroundColor: "black", width: "100%", marginTop: 10 }]}
                  status="control"
                  placeholder="อีเมล"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size="small"
                />
              )}
              name="email"
            />
            <Error name="email" />
          </Card>
          {/* info address */}
          <Text style={{ color: "white", textAlign: "center", marginTop: 20, fontWeight: "600" }}>ข้อมูลที่อยู่</Text>
          <Card style={{ marginTop: 10, width: "100%" }}>
            <Text style={{ color: "gray" }}>ที่อยู่</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={[{ backgroundColor: "black", width: "100%", marginTop: 10 }]}
                  status="control"
                  placeholder="ที่อยู่"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size="small"
                />
              )}
              name="address"
            />
            <Error name="address" />
          </Card>
          <Card style={{ marginTop: 10, width: "100%" }}>
            <Text style={{ color: "gray" }}>จังหวัด</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={[{ backgroundColor: "black", width: "100%", marginTop: 10 }]}
                  status="control"
                  placeholder="จังหวัด"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size="small"
                />
              )}
              name="province"
            />
            <Error name="province" />
          </Card>
          <Card style={{ marginTop: 10, width: "100%" }}>
            <Text style={{ color: "gray" }}>แขวง/ตำบล</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={[{ backgroundColor: "black", width: "100%", marginTop: 10 }]}
                  status="control"
                  placeholder="แขวง/ตำบล"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size="small"
                />
              )}
              name="district"
            />
            <Error name="district" />
          </Card>
          <Card style={{ marginTop: 10, width: "100%" }}>
            <Text style={{ color: "gray" }}>เบอร์โทรศัพท์</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={[{ backgroundColor: "black", width: "100%", marginTop: 10 }]}
                  status="control"
                  placeholder="แขวง/ตำบล"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  size="small"
                />
              )}
              name="phon"
            />
            <Error name="phon" />
          </Card>
          <Button style={{ marginTop: "5%", width: "100%" }} onPress={handleSubmit(onSubmit)} status="control">
            บันทึกข้อมูล
          </Button>
          <Button style={{ width: "100%" }} onPress={() => navigation.navigate("User")} appearance="ghost" status="control">
            ยกเลิก
          </Button>
        </Layout>
      </ScrollView>
    </AppLayout>
  );
};

export default InfoBarScreen;
