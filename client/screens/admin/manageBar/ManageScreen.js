import { AppLayout } from "@/components/";
import { Text, Layout, Toggle, Input, Button } from "@ui-kitten/components";
import { ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@env";
import * as SecureStore from "expo-secure-store";

const ManageScreen = () => {
  const [table, setTable] = useState([]);
  const [checked, setChecked] = useState(false);
  const [barName, setBarName] = useState("");

  const [type, setType] = useState("");
  const [minSeat, setMinSeat] = useState("");
  const [maxSeat, setMaxSeat] = useState("");
  const [numTable, setNumTable] = useState("");

  const fetchTable = async () => {
    try {
      const uid = await SecureStore.getItemAsync("uid");
      const res = await axios.get(`${BACKEND_URL}/api/bar/table/${uid}`);
      console.log(res.data.data);
      setTable(res.data.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  const gerBarName = async () => {
    const name = await SecureStore.getItemAsync("name");
    setBarName(name);
  };

  useEffect(() => {
    gerBarName();
    fetchTable();
  }, []);

  const onCheckedChange = async (isChecked) => {
    try {
      const uid = await SecureStore.getItemAsync("uid");
      const data = {
        status: isChecked,
      };
      const res = await axios.post(`${BACKEND_URL}/api/bar/status/${uid}`, data);
      console.log(res.data.data);
      setChecked(isChecked);
    } catch (e) {
      console.log(e);
    }
  };

  const handlerAddTable = async () => {
    try {
      if (!type & !minSeat & !maxSeat & !numTable) {
        Alert.alert("กรอกข้อมูลไม่ครบ", "", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]);
      } else {
        const uid = await SecureStore.getItemAsync("uid");
        const data = {
          barId: Number(uid),
          name: type,
          available: Number(numTable),
          minSeat: Number(minSeat),
          maxSeat: Number(maxSeat),
        };
        const res = await axios.post(`${BACKEND_URL}/api/bar/table`, data);
        console.log(res.data.data);
        setTable([...table, res.data.data]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlerDeleteTable = async (id) => {
    try {
      let data = {
        tableId: Number(id),
      };
      const res = await axios.delete(`${BACKEND_URL}/api/bar/table`, { data: data });
      console.log(res.data.data);
      fetchTable();
      setType("");
      setMinSeat("");
      setMaxSeat("");
      setNumTable("");
    } catch (e) {
      console.log(e.response);
      Alert.alert("มีการจองโต๊ะนี้อยู่", "", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <AppLayout>
      <Layout style={{ backgroundColor: "#101010", flexDirection: "column", width: "90%", paddingBottom: 200 }}>
        <Layout style={{ borderBottomWidth: 1, borderBottomColor: "white", backgroundColor: "#101010", width: "100%", marginBottom: 20 }}>
          <Text style={{ fontSize: 40, fontWeight: "500", marginVertical: 20, textAlign: "center" }}>ร้าน {barName}</Text>
        </Layout>
        <Layout style={{ flexDirection: "row", backgroundColor: "#101010", alignItems: "center", justifyConetent: "start", width: "100%" }}>
          <Toggle status="control" checked={checked} onChange={onCheckedChange} />
          <Text style={{ marginLeft: 10 }}>ปิด / เปิดร้าน</Text>
        </Layout>
        <ScrollView>
          <Layout style={{ backgroundColor: "#101010", marginBottom: 10 }}>
            <Text style={{ marginTop: 20, marginBottom: 10 }}>เพิ่มโต๊ะ</Text>
            <Layout
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: "#101010",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                borderRadius: "10%",
              }}
            >
              <Layout style={{ width: "100%", backgroundColor: "#101010" }}>
                <Input
                  style={{ backgroundColor: "black", width: "100%" }}
                  size="medium"
                  status="control"
                  placeholder="ชื่อประเภทโต๊ะ(โต๊ะริม โต๊ะกลาง โต๊ะหน้าเวที)"
                  value={type}
                  onChangeText={(nextValue) => setType(nextValue)}
                />
                <Layout style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#101010", width: "100%", marginTop: 10 }}>
                  <Input
                    style={{ backgroundColor: "black", width: "100%" }}
                    size="medium"
                    status="control"
                    placeholder="จำนวนโต๊ะ"
                    value={numTable}
                    onChangeText={(nextValue) => setNumTable(nextValue)}
                  />
                </Layout>
                <Layout style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#101010", width: "100%", marginTop: 10 }}>
                  <Input
                    style={{ backgroundColor: "black", width: "48%" }}
                    size="medium"
                    status="control"
                    placeholder="ที่นั่งต่ำสุด"
                    value={minSeat}
                    onChangeText={(nextValue) => setMinSeat(nextValue)}
                  />
                  <Input
                    style={{ backgroundColor: "black", width: "48%" }}
                    size="medium"
                    status="control"
                    placeholder="ที่นั่งสูงสุด"
                    value={maxSeat}
                    onChangeText={(nextValue) => setMaxSeat(nextValue)}
                  />
                </Layout>
              </Layout>
              <Button status="control" onPress={handlerAddTable} style={{ width: "100%", marginTop: 10 }}>
                เพิ่ม
              </Button>
            </Layout>
          </Layout>
          {table.map((table) => {
            return (
              <Layout
                key={table.id}
                style={{
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "white",
                  backgroundColor: "#101010",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                  borderRadius: "10%",
                  marginBottom: 10,
                }}
              >
                <Layout style={{ width: "60%", backgroundColor: "#101010" }}>
                  <Text size="medium" status="control">
                    ชื่อประเภทโต๊ะ: {table.name}
                  </Text>
                  <Text size="medium" status="control">
                    จำนวนที่นั่ง: {table.minSeat} - {table.maxSeat}
                  </Text>
                  <Text size="medium" status="control">
                    จำนวนโต๊ะ : {table.available}
                  </Text>
                </Layout>
                <Button
                  status="danger"
                  onPress={() => {
                    handlerDeleteTable(table.id);
                  }}
                  size="small"
                  style={{ width: "30%" }}
                >
                  ลบ
                </Button>
              </Layout>
            );
          })}
        </ScrollView>
      </Layout>
    </AppLayout>
  );
};

export default ManageScreen;
