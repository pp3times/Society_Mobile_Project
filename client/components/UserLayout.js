import { StatusBar } from "react-native";
const UserLayout = ({ children }) => {
  return (
    <>
      <StatusBar barStyle="ligth-content" translucent={true} />
      {children}
    </>
  );
};



export default UserLayout;
