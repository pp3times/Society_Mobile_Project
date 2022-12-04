import { AppLayout } from "@/components/";
import { Text, Layout, Toggle, Input, Button } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@env";
import * as SecureStore from "expo-secure-store";

const ManageScreen = () => {
  const [table, setTable] = useState([
    {
      id: 1,
      type: "โต๊พหน้าเวที",
      numChair: "8-10",
      numTable: "10",
    },
    {
      id: 2,
      type: "โต๊พหน้าเวที",
      numChair: "8-10",
      numTable: "10",
    },
    {
      id: 3,
      type: "โต๊พหน้าเวที",
      numChair: "8-10",
      numTable: "10",
    },
  ]);
  const [checked, setChecked] = useState(false);

  const [type, setType] = useState("");
  const [numChair, setNumChair] = useState("");
  const [numTable, setNumTable] = useState("");
  const [uid, setUid] = useState("");

  const setDefault = async () => {
    try {
      const uid = await SecureStore.getItemAsync("uid");
      setUid(uid);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTable = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/bar/Table/${uid}`);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setDefault();
    fetchTable();
  }, []);

  const onCheckedChange = async (isChecked) => {
    try {
      const uid = await SecureStore.getItemAsync("uid");
      const data = {
        isOpen: isChecked,
      };
      const res = await axios.post(`${BACKEND_URL}/api/bar/openBar/${uid}`, data);
      console.log(res);
      setChecked(isChecked);
    } catch (e) {
      console.log(e);
    }
  };

  const handlerAddTable = async () => {
    try {
      const data = {
        type: type,
        numChair: numChair,
        numTable: numTable,
      };
      const res = await axios.post(`${BACKEND_URL}/api/bar/Table`, data);
      console.log(res);
      fetchTable();
    } catch (e) {
      console.log(e);
    }
  };

  const handlerDeleteTable = async (id) => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/api/bar/Table/${id}`);
      console.log(res);
      fetchTable();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppLayout>
      <Layout style={{ backgroundColor: "#101010", flexDirection: "column", width: "90%" }}>
        <Layout style={{ borderBottomWidth: 1, borderBottomColor: "white", backgroundColor: "#101010", width: "100%", marginBottom: 20 }}>
          <Text style={{ fontSize: 40, fontWeight: "500", marginVertical: 20, textAlign: "center" }}>จัดการร้าน</Text>
        </Layout>
        <Layout style={{ flexDirection: "row", backgroundColor: "#101010", alignItems: "center", justifyConetent: "start", width: "100%" }}>
          <Toggle status="control" checked={checked} onChange={onCheckedChange} />
          <Text style={{ marginLeft: 10 }}>เปิด / ปิดร้าน</Text>
        </Layout>
        <Layout style={{ backgroundColor: "#101010" }}>
          <Text style={{ marginTop: 20, marginBottom: 10 }}>เพิ่มโต๊ะ</Text>
          <Layout
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
            }}
          >
            <Layout style={{ width: "75%", backgroundColor: "#101010" }}>
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
                  style={{ backgroundColor: "black", width: "48%" }}
                  size="medium"
                  status="control"
                  placeholder="จำนวนเก้าอี้"
                  value={numChair}
                  onChangeText={(nextValue) => setNumChair(nextValue)}
                />
                <Input
                  style={{ backgroundColor: "black", width: "48%" }}
                  size="medium"
                  status="control"
                  placeholder="จำนวนโต๊ะ"
                  value={numTable}
                  onChangeText={(nextValue) => setNumTable(nextValue)}
                />
              </Layout>
            </Layout>
            <Button status="control" onPress={handlerAddTable} style={{ height: "100%" }}>
              เพิ่ม
            </Button>
          </Layout>
        </Layout>
        <ScrollView style={{ marginTop: 10 }}>
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
                    {table.type}
                  </Text>
                  <Text size="medium" status="control">
                    จำนวนเก้าอี้ : {table.numChair}
                  </Text>
                  <Text size="medium" status="control">
                    จำนวนโต๊ะ : {table.numTable}
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
