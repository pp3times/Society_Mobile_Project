import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import { SettingIcon, BookIcon, UserIcon } from '../../components/GetIcon';

const { Navigator, Screen } = createBottomTabNavigator();



const UsersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>USERS</Text>
  </Layout>
);

const OrdersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>ORDERS</Text>
  </Layout>
);
const UserInfo = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>UserInfo</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    style={styles.bottomNavigation}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='จัดการร้าน' icon={SettingIcon}/>
    <BottomNavigationTab title='การจอง' icon={BookIcon}/>
    <BottomNavigationTab title='ข้อมูลส่วนตัว' icon={UserIcon}/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={UsersScreen}/>
    <Screen name='Book' component={OrdersScreen}/>
    <Screen name='UserInfo' component={UserInfo}/>
  </Navigator>
);

const AdminScreen = () => (
  <NavigationContainer>
    <TabNavigator/>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 10,
  },
});

export default AdminScreen;