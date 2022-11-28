import { StatusBar } from "react-native";
const UserLayout = ({ children }) => {
  return (
    <>
      {children}
      <StatusBar barStyle="dark-content" translucent={true} />
    </>
  );
};

export default UserLayout;
