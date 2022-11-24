import React from "react";

import { Text } from "react-native";
import * as Permissions from "expo-permissions";

import { BarCodeScanner } from "expo-barcode-scanner";
import { Layout } from "@ui-kitten/components";

class Scanner extends React.Component {
  static navigationOptions = {
    header: null,
  };
  // Component State
  state = {
    hasCameraPermission: null, // if app has permissions to acess camera
    isScanned: false, // scanned
  };
  async componentDidMount() {
    // ask for camera permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({ hasCameraPermission: status === "granted" ? true : false });
  }

  handleBarCodeScanned = ({ type, data }) => {
    // Do something here
    console.log(type);
    console.log(data)
  };
  render() {
    const { hasCameraPermission, isScanned } = this.state;
    if (hasCameraPermission === null) {
      // requesting permission
      return <Text>request permission</Text>;
    }
    if (hasCameraPermission === false) {
      //permission denied
      return (
        <Layout>
          <Text>Please grant Camera permission</Text>
        </Layout>
      );
    }
    if (hasCameraPermission === true && !isScanned && this.props.navigation.isFocused()) {
      // we have permission and this screen is under focus
      return (
        <Layout
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Scan code inside window</Text>
          <BarCodeScanner onBarCodeScanned={isScanned ? undefined : this.handleBarCodeScanned}></BarCodeScanner>
        </Layout>
      );
    } else {
      return <Spinner />;
    }
  }
}
export default Scanner;
