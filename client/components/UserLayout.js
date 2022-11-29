import { StatusBar } from "react-native";
const UserLayout = ({ children }) => {
  return (
    <>
      <StatusBar barStyle="dark-content" translucent={true} />
      {children}
    </>
  );
};



export default UserLayout;
