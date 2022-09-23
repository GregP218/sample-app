import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Clipboard, Alert, Linking, Platform } from 'react-native';
import Moment from 'react-moment';
import axios from 'axios';
import * as Location from 'expo-location';
//page to view additional information for an accepted day trip
//pressing phone numbers calls them and pressing addresses opens the GPS with that address

//generate url depending on whether user is iOS or Android
const scheme = Platform.select({ ios: 'http://maps.apple.com/?daddr=', android: 'geo:=' });//


export default class DayTripInfo extends React.Component {
  //create state to hold info from database
  state = {
    vehicleInfo: [],
    passInfo: [],
    destInfo: [],
    destOrder: [],
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

  componentDidMount(){//on mount get passenger, destination, and vehicle info from the database

    axios.get(route + '/passInfo', {
        params: {
          idtrip: this.props.navigation.state.params.trip.idtrip}})
        .then((response) => {
          console.log(response.data);
          console.log(response.status);
          this.setState({passInfo: response.data});
        }, (error) => {
            console.log(error);
      });

      axios.get(route + '/destInfo', {
        params: {
          idtrip: this.props.navigation.state.params.trip.idtrip}})
        .then((response) => {
          console.log(response.data);
          console.log(response.status);
          this.setState({destInfo: response.data});
          axios.get(route + '/destOrder', {
            params: {
              idtrip: this.props.navigation.state.params.trip.idtrip}})
            .then((response) => {
              console.log(response.data);
              console.log(response.status);
              this.setState({destOrder: response.data});
              for(let i = 0; i < this.state.destInfo.length; i++){
                this.state.destInfo[i].dest_active = this.state.destOrder[i].dest_num;
              }
              this.setState({destInfo: this.state.destInfo.sort((a, b) => a.dest_active > b.dest_active)});
              console.log(this.state.destInfo)

            }, (error) => {
                console.log(error);
          });
        }, (error) => {
            console.log(error);
      });


    axios.get(route + '/assignedVehicle', {
      params: {
              vehicle_id: this.props.navigation.state.params.trip.vehicle1_id}})
    .then((response) => {
      console.log(response.data);
      console.log(response.status);
      this.setState({vehicleInfo: response.data});
    }, (error) => {
        console.log(error);
  });

  }


    render() { //display all day trip information including all passengers and destinations
      const {navigation} = this.props;
      return (
        
    <View style={styles.container}>
        <View style={styles.containerTop}>
        <Image
          source={require("../assets/car.png")}
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'white', alignSelf: 'center' }}
        />
    <Text style={styles.welcome}> Day Trip Information</Text>
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
      <Text style = {styles.headers}>Vehicle:</Text>
      {this.state.vehicleInfo.map(vehicle => <Text key={vehicle.make}>{vehicle.year} {vehicle.make} {vehicle.model}</Text>)}
      </View>
      {this.state.passInfo.map(pass => 
      <View style = {styles.fields2} key={pass.passenger_list}>
      <Text style = {styles.headers}>Passenger Info: </Text>
      <Text>{pass.passenger_list}</Text>
      <Text onPress={()=> this.attemptGeocodeAsync(pass.address + ', ' + pass.citytown + ', ' + pass.state + ', ' + pass.zip)}>
        {pass.address}, {pass.citytown}, {pass.state}, {pass.zip}</Text>
      <Text onPress={() => this.dialCall(pass.pass_phone)}>{pass.pass_phone ? pass.pass_phone.slice(0,3) + '-' + pass.pass_phone.slice(3,6) + '-' + pass.pass_phone.slice(6,10) : '-'}</Text>
      {pass.wheelchair ? 
      (<Text>Wheelchair: Yes</Text>)
    :
      (<Text>Wheelchair: No</Text>)}
      </View>)}
      <View style = {styles.fields2}>
      <Text style = {styles.headers}>Day Trip Stops: </Text>
      {this.state.destInfo.map(dest => <Text key={dest.dest_name} onPress={()=> this.attemptGeocodeAsync(dest.dest_address1+ ',' + dest.dest_citytown + ',' + dest.dest_state + ',' + dest.dest_zip)}>
  {dest.dest_name}{"\n"}{dest.dest_address1} {dest.dest_address2}, {dest.dest_citytown}, {dest.dest_state}, {dest.dest_zip}{"\n"}</Text>)}
      </View>
      <View style = {styles.fields}>
      <Text style = {styles.headers}>Additional Notes: </Text>
      <Text>{this.props.navigation.state.params.trip.notes}</Text>
      </View>
    <View style={styles.buttonContainer}> 
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}//back button, on press navigate to home
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
    fields2: {
        justifyContent: 'center',
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        width: "100%",
        flex: 1,
        borderTopWidth: 0,
        height: 'auto',
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