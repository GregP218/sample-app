import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import Moment from 'react-moment';
import {NavigationEvents} from 'react-navigation';
//home page displays trips and day trips along with the most prudent information for each.
//fields can be pressed to view more information and can be scrolled through

export default class Home extends React.Component {
  //state to hold driver info and trip info
  state = {
    driverInfo: [],
    tripInfo: [],
  }

  componentDidMount(){//on mount get driver info and trip info from database

    axios.get(route + '/driver', {
      params: {
        user_id: user_id}})
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        this.setState({driverInfo: response.data});
      }, (error) => {
          console.log(error);
    });

    axios.get(route + '/displayTrip', {
      params: {
        user_id: user_id}})
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        this.setState({tripInfo: response.data});
      }, (error) => {
          console.log(error);
    });

  }

    render() { //display tabs, current is upcoming trips as well as a tab to view pending trips. On press navigate to pending trips page
      return (
    <View style={styles.container}>
      <NavigationEvents onDidFocus={() => this.componentDidMount()} />
      <View style={styles.topContainer}>
      <Image
          source={require("../assets/car.png")}//display icon
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'white', alignSelf: 'center' }}
        />
    <Text style={styles.welcome}> Upcoming Trips</Text>
        </View>
        <View style={styles.tabContainer}>
        <View style={styles.tabCurrent}>
        <TouchableOpacity >
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Upcoming Trips</Text>
      </TouchableOpacity>
        </View>
    <View style={styles.tabNext}>
    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home2')}>
        <Text style={{fontSize: 18}}>Pending Trips</Text>
      </TouchableOpacity>
    </View>
        </View>
    {this.state.driverInfo.map(driver => <Text style={styles.title} key={driver.user_id}>Welcome {driver.f_name}!</Text>)}


    <ScrollView showsVerticalScrollIndicator={false} overScrollMode={'never'} style={styles.scrollContainer}>
    
    {this.state.tripInfo.map(trip => //display info based on whether its a regular trip or a day trip
      <TouchableOpacity onPress={() => 
        {trip.trip_type == 0 ?
        this.props.navigation.navigate('TripInfo', {
        trip: trip,
      })
      :
      this.props.navigation.navigate('DayTripInfo', {
        trip: trip,
      })}}
      style={trip.active == 1 ?
        styles.button
      :
        styles.buttonX}
        key={trip.idtrip} 
        >
        <View>
        <Moment style={{fontWeight: 'bold',}} format="MM/DD/YYYY" element={Text}>{trip.appt_date}</Moment>
        <View  style = {{flexDirection: "row"}}>
        {trip.pickup_time.slice(0,2) > 12 ?
        <Text>Pick Up Time: {trip.pickup_time.slice(0,2) - 12}{trip.pickup_time.slice(2,5)}</Text>
        ://slice times and adjust to make them more readable
        <Text>Pick Up Time: {trip.pickup_time.slice(0,5)}</Text>}
        {trip.pickup_time.slice(0,2) > 11 ?
      <Text> PM</Text>
      :
      <Text> AM</Text>}
      </View>
        <Image
          source={require("../assets/arrow.png")}//display icon
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'black', position: 'absolute', right: 0}}
        />
        {trip.trip_type == 0 ?
        <Text>{trip.pickup_street1}, {trip.pickup_street2}{"\n"}{trip.pickup_city}</Text>
        ://display address or state that its a day trip
        <Text>Day Trip</Text>}
        </View>
      </TouchableOpacity>)}
    
    </ScrollView>
    </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#F4F4F4',
    },
    topContainer: {
      width: "100%",
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: "#2E4277",
    },
    tabContainer: {
      width: "100%",
      flexDirection: 'row',
      backgroundColor: "#F4F4F4",
    },
    tabCurrent: {
      width: "50%",
      alignItems: "center",
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      padding: 10,
    },
    tabNext: {
      width: "50%",
      alignItems: "center",
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      padding: 10,
    },
    scrollContainer: {
      flex: 1,
      width: 300,
    },
    welcome: {
      color: 'white',
      textAlign: 'center',
      fontSize: 30,
      marginTop: 60,
      marginBottom: 40,
    },
    title: {
      fontStyle: 'italic',
      fontSize: 18,
      marginTop: 10,
      marginBottom: 10,
  },
  button: {  
    backgroundColor: "#E3F2FD",
    padding: 15,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderRightWidth: 1,
    borderRightColor: 'gray',
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonX: {  
    backgroundColor: "#ff5e5e",
    padding: 15,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderRightWidth: 1,
    borderRightColor: 'gray',
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
  });