import { StatusBar } from "react-native";
const UserLayout = ({ children }) => {
  return (
    <>
      <StatusBar barStyle="light-content" translucent={true} />
      {children}
    </>
  );
};



export default UserLayout;
