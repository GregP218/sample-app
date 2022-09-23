import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Clipboard, Alert, Linking, Platform } from 'react-native';
import Moment from 'react-moment';
import axios from 'axios';
import * as Location from 'expo-location';
//page to view additional information for an accepted trip
//pressing phone numbers calls them and pressing addresses opens the GPS with that address

//generate url depending on whether user is iOS or Android
const scheme = Platform.select({ ios: 'http://maps.apple.com/?daddr=', android: 'geo:=' });

export default class TripInfo extends React.Component {
  //create state to hold info from database
  state = {
    clientInfo: [],
    vehicleInfo: [],
    result: '',
    inProgress: false,
  }
  //open map app with pressed address depending on whether user is on iOS or Android
  openMap(){
    const result = this.state.result[0].latitude + ',' + this.state.result[0].longitude;
    console.log(result)
    const url = Platform.select({
      ios: `${scheme}@${result}`,
      android: `${scheme}${result}`
    });
    console.log(url)
    
    Linking.openURL(url); 
  }


dialCall(num){//function to open phone app on android or iOS and call number using *67.
  console.log(num);
  let phoneNumber = '';

  if (Platform.OS === 'android') {
    phoneNumber = 'tel:${' + '*67' + num + '}';
  }
  else {
    phoneNumber = 'telprompt:${' + '*67' + num + '}';
  }

  Linking.openURL(phoneNumber);
};

attemptGeocodeAsync = async (address) => {
  this.setState({ inProgress: true, error: null });
  console.log(address)
  try {
    console.log('trying')
  let result = await Location.geocodeAsync(address);
  this.setState({ result });
  console.log(this.state.result)
  } catch (e) {
    console.log(e.message)
  this.setState({ error: e.message });
  } finally {
  this.setState({ inProgress: false });
  this.openMap()
  }
  };

  componentDidMount(){//on mount get client and vehicle info from the database
    axios.get(route + '/clientInfo', {
      params: {
        idclient: this.props.navigation.state.params.trip.client_id}})
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        this.setState({clientInfo: response.data});
      }, (error) => {
          console.log(error);
    });

    axios.get(route + '/assignedVehicle', {
      params: {
              vehicle_id: this.props.navigation.state.params.trip.vehicle1_id
              }
      })
    .then((response) => {
      console.log(response.data);
      console.log(response.status);
      this.setState({vehicleInfo: response.data});
    }, (error) => {
        console.log(error);
  });
  }

    render() { //display all information for trip including client info and destination/pickup info
      const {navigation} = this.props;
      return (
    <View style={styles.container}>
        <View style={styles.containerTop}>
        <Image
          source={require("../assets/car.png")}
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'white', alignSelf: 'center' }}
        />
    <Text style={styles.welcome}> Trip Information</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style = {styles.scrollContainer}>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Pick Up Date: </Text>
      <Text><Moment format="MM/DD/YYYY" element={Text}>{this.props.navigation.state.params.trip.appt_date}</Moment></Text>
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Pick Up Time: </Text>
      <View  style = {{flexDirection: "row"}}>
      {this.props.navigation.state.params.trip.pickup_time.slice(0,2) > 12 ?
      <Text>{this.props.navigation.state.params.trip.pickup_time.slice(0,2) - 12}{this.props.navigation.state.params.trip.pickup_time.slice(2,5)}</Text>
      ://slice times and adjust to make them more readable
      <Text>{this.props.navigation.state.params.trip.pickup_time.slice(0,5)}</Text>}
      {this.props.navigation.state.params.trip.pickup_time.slice(0,2) > 11 ?
      <Text> PM</Text>
      :
      <Text> AM</Text>}
      </View>
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Appointment Time: </Text>
      <View  style = {{flexDirection: "row"}}>
      {this.props.navigation.state.params.trip.appt_time.slice(0,2) > 12 ?
      <Text>{this.props.navigation.state.params.trip.appt_time.slice(0,2) - 12}{this.props.navigation.state.params.trip.appt_time.slice(2,5)}</Text>
      :
      <Text>{this.props.navigation.state.params.trip.appt_time.slice(0,5)}</Text>}
      {this.props.navigation.state.params.trip.appt_time.slice(0,2) > 11 ?
      <Text> PM</Text>
      :
      <Text> AM</Text>}
      </View>
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Pick Up Address: </Text>

      <Text onPress={()=> this.attemptGeocodeAsync(this.props.navigation.state.params.trip.pickup_street1 + ', ' + this.props.navigation.state.params.trip.pickup_city + ', ' + this.props.navigation.state.params.trip.pickup_state + ', ' + this.props.navigation.state.params.trip.pickup_zip)}>
        {this.props.navigation.state.params.trip.pickup_street1} {this.props.navigation.state.params.trip.pickup_street2}, {this.props.navigation.state.params.trip.pickup_city}, {this.props.navigation.state.params.trip.pickup_state}, {this.props.navigation.state.params.trip.pickup_zip}</Text>
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Drop Off Address: </Text>
      <Text onPress={()=> this.attemptGeocodeAsync(this.props.navigation.state.params.trip.appt_street1 + ', ' + this.props.navigation.state.params.trip.appt_city + ', ' + this.props.navigation.state.params.trip.appt_state + ', ' + this.props.navigation.state.params.trip.appt_zip)}>
        {this.props.navigation.state.params.trip.appt_street1} {this.props.navigation.state.params.trip.appt_street2}, {this.props.navigation.state.params.trip.appt_city}, {this.props.navigation.state.params.trip.appt_state}, {this.props.navigation.state.params.trip.appt_zip}</Text>
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Appointment Duration: </Text>
      <Text>{this.props.navigation.state.params.trip.appt_duration} minutes</Text>
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Vehicle:</Text>
      {this.state.vehicleInfo.map(vehicle => <Text key={vehicle.make}>{vehicle.year} {vehicle.make} {vehicle.model}</Text>)}
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Client Name:</Text>
      {this.state.clientInfo.map(client => <Text key={client.fname}>{client.fname} {client.lname}</Text>)}
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Client Cell Phone:</Text>
      {this.state.clientInfo.map(client => 
      <Text onPress={() => this.dialCall(client.phone_cell)} key={client.fname}>{client.phone_cell ? client.phone_cell.slice(0,3) + '-' + client.phone_cell.slice(3,6) + '-' + client.phone_cell.slice(6,10) : '-'}</Text>)}
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Client Home Phone:</Text>
      {this.state.clientInfo.map(client => 
      <Text onPress={() => this.dialCall(client.phone_cell)} key={client.fname}>{client.phone_home ? client.phone_home.slice(0,3) + '-' + client.phone_home.slice(3,6) + '-' + client.phone_home.slice(6,10) : '-'}</Text>)}
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Wheelchair: </Text>
      {this.props.navigation.state.params.trip.wheelchair ? 
      (<Text>Yes</Text>)
    :
      (<Text>No</Text>)}
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Companion: </Text>
      {this.props.navigation.state.params.trip.companion ? 
      (<Text>Yes</Text>)
    :
      (<Text>No</Text>)}
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Anesthesia: </Text>
      {this.props.navigation.state.params.trip.anesthesia ? 
      (<Text>Yes</Text>)
    :
      (<Text>No</Text>)}
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Doctor/Dentist: </Text>
      <Text>{this.props.navigation.state.params.trip.doctor_dentist}</Text>
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Additional Notes: </Text>
      <Text>{this.props.navigation.state.params.trip.notes}</Text>
      </View>
    <View style={styles.buttonContainer}> 
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}//back buttons navigates back to home page
        style={styles.button}
         >
         <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F4F4',
    },
    containerTop: {
      width: '100%',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: "#2E4277",
    },
    scrollContainer:{
     flex: 1,
     backgroundColor: '#F4F4F4',
    },
    welcome: {
      color: 'white',
      textAlign: 'center',
      fontSize: 30,
      marginTop: 60,
      marginBottom: 40,
    },
    fields: {
      justifyContent: 'center',
      paddingLeft: 10,
      borderWidth: 1,
      borderColor: 'gray',
      width: "100%",
      flex: 1,
      borderTopWidth: 0,
      height: 60,
      backgroundColor: '#F4F4F4',
    },
    headers: {
      color: 'gray',
    },
    button: {
      backgroundColor: "#2E4277",
      borderColor: 'black',
      borderWidth: 1,
      borderTopColor: 'transparent',
      height: 60,
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 24,
      textAlign: 'center',
    },
    buttonContainer: {
      height: 60,
      width: '100%',
    }
  });