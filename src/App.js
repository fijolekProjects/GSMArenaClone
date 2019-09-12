import React, {} from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Brands from './components/Brands'
import Device from './components/Device'
import DeviceList from './components/DeviceList'
import Search from './components/Search'

const AppNavigator = createStackNavigator(
  {
    Brands: Brands,
    DeviceList: DeviceList,
    Device: Device
  },
  {
    initialRouteName: 'Brands',
  }
);

const TabsNavigator = createBottomTabNavigator({
  App: AppNavigator,
  Search: Search
}, {
  initialRouteName: 'App',
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      const iconName =
        routeName === 'App' ? 'home' :
          routeName === 'Search' ? 'cellphone' 
          : 'none'
      return (
        <Icon name={iconName} style={{fontSize: 20}}/>
      )
    }
  }),
})

const AppContainer = createAppContainer(TabsNavigator);

const App = () => {
  return <AppContainer />;
}

export default App;


