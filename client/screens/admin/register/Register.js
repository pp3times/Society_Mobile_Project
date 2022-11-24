import { AppLayout, UploadIcon } from "@/components/";
import { Text, Layout, Input, Button } from "@ui-kitten/components";
import { Image } from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";

const Register = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
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
      <Text style={{ fontSize: 40, fontWeight: "400" }}>กรอกข้อมูลร้าน</Text>
      <Text style={{ fontSize: 20, marginTop: 10 }}>(กรอกเพียงครั้งแรก)</Text>
      <Layout style={{ width: "80%", flexDirection: "row", marginTop: 30, backgroundColor: "#101010", justifyContent: "space-between" }}>
        <Layout style={{ backgroundColor: "#101010", width: "48%" }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="large"
                style={[{ backgroundColor: "black" }]}
                status="control"
                placeholder="เวลาเปิด-ปิด"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text>This is required.</Text>}
        </Layout>

        <Layout style={{ backgroundColor: "#101010", width: "48%" }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="large"
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
              size="large"
              style={[{ backgroundColor: "black", width: "80%" }]}
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
              size="large"
              style={[{ backgroundColor: "black", width: "80%" }]}
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

      <Layout style={{ width: "80%", flexDirection: "row", backgroundColor: "#101010", justifyContent: "space-between" }}>
        <Layout style={{ backgroundColor: "#101010", width: "48%", marginTop: 20 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="large"
                style={[{ backgroundColor: "black" }]}
                status="control"
                placeholder="แขวง/ตำบล"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text>This is required.</Text>}
        </Layout>
        <Layout style={{ backgroundColor: "#101010", width: "48%", marginTop: 20 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="large"
                style={[{ backgroundColor: "black" }]}
                status="control"
                placeholder="Place your Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text>This is required.</Text>}
        </Layout>
      </Layout>
      <Layout style={{ width: "80%", flexDirection: "row", marginTop: 20, backgroundColor: "#101010", justifyContent: "space-between" }}>
        <Layout style={{ backgroundColor: "#101010", width: "48%" }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="large"
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
          {errors.firstName && <Text>This is required.</Text>}
        </Layout>
        <Layout style={{ backgroundColor: "#101010", width: "48%" }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="large"
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
          {errors.firstName && <Text>This is required.</Text>}
        </Layout>
      </Layout>
      <Layout style={{ backgroundColor: "#101010", width: "80%", marginTop: 20 }}>
        <Button appearance="outline" status="basic" accessoryRight={UploadIcon} style={{ backgroundColor: "black" }} onPress={pickImage}>
          รูปภาพร้าน
        </Button>
        {image && <Image source={{ uri: image }} style={{ width: "100%", height: 200 }} />}
      </Layout>
      <Button style={{ marginTop: "5%", width: "80%" }} onPress={handleSubmit(onSubmit)} status="control">
        สร้างร้าน
      </Button>
    </AppLayout>
  );
};

export default Register;
