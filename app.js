import React from 'react';
import {Image} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Login from './components/Login'
import Home from './components/Home'
import Home2 from './components/Home2'
import Profile from './components/Profile'
import Reports from './components/Reports'
import Availability from './components/Availability'
import PreTrip from './components/PreTrip'
import Transport from './components/Transport'
import TripInfo from './components/TripInfo'
import TripInfo2 from './components/TripInfo2'
import RequestTime from './components/RequestTime'
import ViewTime from './components/ViewTime'
import Transport2 from './components/Transport2'
import Transport3 from './components/Transport3'
import PreTrip2 from './components/PreTrip2'
import PreTrip3 from './components/PreTrip3'
import DayTripInfo from './components/DayTripInfo'
import DayTripInfo2 from './components/DayTripInfo2'

global.route = 'http://192.168.1.139:3000';
global.user_id = '';
//global.route = 'http://633c341c.ngrok.io'


export const TabNavigator = createBottomTabNavigator({
  Home: { // visible TabBar item
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require("./assets/car.png")}
          style={{ width: 26, height: 26, tintColor: tintColor }}
        />
      )
    }
  },
  Reports: {
    screen: Reports,
    navigationOptions: {
      tabBarLabel: "Reports",
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require("./assets/list.png")}
          style={{ width: 26, height: 26, tintColor: tintColor }}
        />
      )
    }
  },
  Availability: {
    screen: Availability,
    navigationOptions: {
      tabBarLabel: "Time Off",
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require("./assets/clock.png")}
          style={{ width: 26, height: 26, tintColor: tintColor }}
        />
      )
    }
  },
  Profile: { // visible TabBar item
    screen: Profile,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require("./assets/person.png")}
          style={{ width: 26, height: 26, tintColor: tintColor }}
        />
      )
    }
  },
},
{
  tabBarOptions:{
    activeTintColor: '#2E4277',
    //inactiveTintColor: 'purple',
    //activeBackgroundColor: '#FAFAFA',
    //inactiveBackgroundColor: '#FAFAFA',
    style:{
      backgroundColor: '#FFFFFF',
      borderTopColor: 'transparent',
    }
  },
}
);

export const MainScreenNavigator = createStackNavigator({
    Login: { // invisible TabBar item
        screen: Login,
        navigationOptions : {
            header: null 
        }
    },
    TabNavigator: { 
        screen: TabNavigator,
        navigationOptions : {
            header: null ,
        }
    },
    PreTrip: { // invisible TabBar item
      screen: PreTrip,
      navigationOptions : {
          header: null 
      }
    },
    PreTrip2: { // invisible TabBar item
      screen: PreTrip2,
      navigationOptions : {
          header: null 
      }
    },
    PreTrip3: { // invisible TabBar item
      screen: PreTrip3,
      navigationOptions : {
          header: null 
      }
    },
    Transport: { // invisible TabBar item
      screen: Transport,
      navigationOptions : {
          header: null 
      }
    },
    Transport2: { // invisible TabBar item
      screen: Transport2,
      navigationOptions : {
          header: null 
      }
    },
    Transport3: { // invisible TabBar item
      screen: Transport3,
      navigationOptions : {
          header: null 
      }
    },
    TripInfo: { // invisible TabBar item
      screen: TripInfo,
      navigationOptions : {
          header: null 
      }
    },
    TripInfo2: { // invisible TabBar item
      screen: TripInfo2,
      navigationOptions : {
          header: null 
      }
    },
    ViewTime: { // invisible TabBar item
      screen: ViewTime,
      navigationOptions : {
          header: null 
      }
    },
    RequestTime: { // invisible TabBar item
      screen: RequestTime,
      navigationOptions : {
          header: null 
          
      }
    },
    Home2: { // invisible TabBar item
      screen: Home2,
      navigationOptions : {
          header: null, 
      }
    },
    DayTripInfo: { // invisible TabBar item
      screen: DayTripInfo,
      navigationOptions : {
          header: null 
      }
    },
    DayTripInfo2: { // invisible TabBar item
      screen: DayTripInfo2,
      navigationOptions : {
          header: null 
      }
    },
});


const AppContainer = createAppContainer(MainScreenNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

