import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import DetailsAccount from '../components/DetailsAccount';
import OrderHistory from '../components/OrderHistory';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const FirstRoute = () => <DetailsAccount />;

const SecondRoute = () => <OrderHistory />;

const initialLayout = { width: Dimensions.get('window').width };

const renderTabBar = (props) => (
  <TabBar
    {...props}
    inactiveColor="#6E7191"
    activeColor="#5F2EEA"
    pressColor="#5F2EEA"
    indicatorStyle={{ backgroundColor: '#5F2EEA' }}
    style={{ backgroundColor: 'white' }}
  />
);

const ProfilePage = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Profile' },
    { key: 'second', title: 'Order History' }
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute
  });
  return (
    <TabView
      renderTabBar={renderTabBar}
      indicatorStyle={{ backgroundColor: 'pink' }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  tab: {
    paddingBottom: 10
  }
});
