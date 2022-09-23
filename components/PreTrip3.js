import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, Image, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector'
//page to complete pre-trip checklist. Mostly consisting of radio buttons
//made of multiple pages per client request due to length of checklist

export default class PreTrip3 extends React.Component {
    //set state as unchecked to start
    state = {
      parking_brake: "0",
      check_fuel_level: "0",
      wiper_washer: "0",
      heater_defroster: "0",
      mirrors: "0",
      instrument_panel: "0",
      horn: "0",
      er_door: "0",
      rear_wheelbrakes: "0",
      windows: "0",
      steering_wheel: "0",
      warning_devices: "0",
      wheelchair_clamps: "0",
      headlights: "0",
      clearance_lights_front: "0",
      id_lights_front: "0",
      turn_signals: "0",
      alt_flashing_front: "0",
      sidemarker_lights_left: "0",
      reflectors_left: "0",
      er_door_left: "0",
      tail_lights: "0",
      stop_lights: "0",
      clearance_lights_rear: "0",
      id_lights_rear: "0",
      reflectors_rear: "0",
      alt_flashing_rear: "0",
      er_door_rear: "0",
      sidemarker_lights_right: "0",
      reflectors_right: "0",
      entrance_door: "0",
      wheellug_6tires: "0",
      secure_inside: "0",
      secure_under: "0",
      secure_around:"0",
      vehicle_id: "",
      notes: "",
      date: new Date(),
      route_text: "-",
      mileage_start: "",
      last_oilchange_mileage: "",
      user_id: user_id,
      vehicleInfo: [],
    }

    componentDidMount(){//on mount get list of vehicles from database

      axios.get(route + '/vehicleList')
        .then((response) => {
          console.log(response.data);
          console.log(response.status);
          this.setState({vehicleInfo: response.data});
        }, (error) => {
            console.log(error);
      });
    }

    SubmitPreTrip(){//function to submit pre trip report

      const preTripReport = this.state;
      
        axios.post(route + '/pretrip', {preTripReport})//send state of each item to database to be stored
          .then(res =>{
            console.log(res);
            console.log(res.data);
            if (res.data == 1){
              Alert.alert(//alert user of successfully submission
                "Pre-Trip Checklist Submitted!",
                "Your report has been successfully submitted.",
                [
                  { text: "OK", onPress: () => this.props.navigation.navigate('Reports')}
                ],
                { cancelable: false }
              );
            }else{
              Alert.alert(//alert user of failed submission
                "Submission Failed!",
                "Your report has not been submitted. Please review the report and try again.",
                [
                  { text: "OK",}
                ],
                { cancelable: false }
              );
            }
          })
      }


    render() { //hold states of each item
      this.state.parking_brake = this.props.navigation.state.params.report.parking_brake;
      this.state.check_fuel_level = this.props.navigation.state.params.report.check_fuel_level;
      this.state.wiper_washer = this.props.navigation.state.params.report.wiper_washer;
      this.state.heater_defroster = this.props.navigation.state.params.report.heater_defroster;
      this.state.mirrors = this.props.navigation.state.params.report.mirrors;
      this.state.instrument_panel = this.props.navigation.state.params.report.instrument_panel;
      this.state.horn = this.props.navigation.state.params.report.horn;
      this.state.er_door = this.props.navigation.state.params.report.er_door;
      this.state.rear_wheelbrakes = this.props.navigation.state.params.report.rear_wheelbrakes;
      this.state.windows = this.props.navigation.state.params.report.windows;
      this.state.steering_wheel = this.props.navigation.state.params.report.steering_wheel;
      this.state.warning_devices = this.props.navigation.state.params.report.warning_devices;
      this.state.wheelchair_clamps = this.props.navigation.state.params.report.wheelchair_clamps;
      this.state.headlights = this.props.navigation.state.params.report.headlights;
      this.state.clearance_lights_front = this.props.navigation.state.params.report.clearance_lights_front;
      this.state.id_lights_front = this.props.navigation.state.params.report.id_lights_front;
      this.state.turn_signals = this.props.navigation.state.params.report.turn_signals;
      this.state.alt_flashing_front = this.props.navigation.state.params.report.alt_flashing_front;
      this.state.sidemarker_lights_left = this.props.navigation.state.params.report.sidemarker_lights_left;
      this.state.reflectors_left = this.props.navigation.state.params.report.reflectors_left;
      this.state.er_door_left = this.props.navigation.state.params.report.er_door_left;
      this.state.tail_lights = this.props.navigation.state.params.report.tail_lights;
      this.state.stop_lights = this.props.navigation.state.params.report.stop_lights;
      this.state.clearance_lights_rear = this.props.navigation.state.params.report.clearance_lights_rear;
      this.state.id_lights_rear = this.props.navigation.state.params.report.id_lights_rear;
      this.state.reflectors_rear = this.props.navigation.state.params.report.reflectors_rear;
      this.state.alt_flashing_rear = this.props.navigation.state.params.report.alt_flashing_rear;
      this.state.er_door_rear = this.props.navigation.state.params.report.er_door_rear;
      this.state.sidemarker_lights_right = this.props.navigation.state.params.report.sidemarker_lights_right;
      this.state.reflectors_right = this.props.navigation.state.params.report.reflectors_right;
      this.state.entrance_door = this.props.navigation.state.params.report.entrance_door;
      this.state.wheellug_6tires = this.props.navigation.state.params.report.wheellug_6tires;
      this.state.secure_inside = this.props.navigation.state.params.report.secure_inside;
      this.state.secure_under = this.props.navigation.state.params.report.secure_under;
      this.state.secure_around = this.props.navigation.state.params.report.secure_around;
      return (
       <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
    <View style={styles.container}>
    <View style={styles.topContainer}>
      <Image
          source={require("../assets/list.png")}//display icon
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'white', alignSelf: 'center' }}
        />
    <Text style={styles.greet}> Pre-Trip Checklist</Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false} style = {styles.scrollContainer}>
    
         <Text></Text>
         <Text>Date</Text>
    <DatePicker
        style={{width: '100%'}}//display date picker to select date of trip
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2019-11-26"
        maxDate="2040-12-31"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            borderColor: 'black',
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
          <View style={{flex:1, justifyContent:'space-around', padding:10}}>
<Text></Text>
<ModalSelector
    data={this.state.vehicleInfo}//populate selector with vehicles from database for user to choose from
    keyExtractor= {item => item.vehicle_id}
    labelExtractor= {item => item.year + ' ' + item.make + ' ' + item.model}
    initValue="Select a vehicle"
    onChange={(option)=>{ this.setState({vehicle_id: option.vehicle_id})}}
  />
      </View>

      <Text></Text>

        <TextInput keyboardType="numeric"//several numerical fields for checklist
        style={styles.input}
        placeholder="Starting Mileage" onChangeText={text => this.setState({mileage_start: text})}
        />
        <TextInput keyboardType="numeric"
        style={styles.input}
        placeholder="Last Oil Change" onChangeText={text => this.setState({last_oilchange_mileage: text})}
        />
        <TextInput
        style={styles.input}
        placeholder="Please enter any additional notes or issues here" onChangeText={text => this.setState({notes: text})}
        />
        
    <View style={styles.buttonContainer}> 
        <TouchableOpacity onPress={() =>  this.SubmitPreTrip()}//on press try submitpretrip function
        style={styles.button}
         >
         <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
    </View>
      </ScrollView>
      </View>
      </KeyboardAvoidingView> 
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F4F4F4',
    },
    topContainer: {
      width: "100%",
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: "#2E4277",
    },
    scrollContainer: {
      flex: 1,
    },
    radioContainer: {
      width: '90%',
      justifyContent: 'center',
      marginBottom: 30,
    },
    welcome: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 30,
        marginTop: 5,
        marginBottom: 5,
        textDecorationLine: 'underline',
    },
    greet: {
      color: 'white',
      fontSize: 30,
      marginTop: 60,
      marginBottom: 40,
  },
  button: {
    backgroundColor: "#2E4277",
    borderColor: 'black',
    borderWidth: 1,
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
  },
    input: {
      alignSelf: 'center',
      width: '100%',
      padding: 15,
      marginBottom: 10,
      borderColor: 'black',
      borderWidth: 1,
    },
    picker: {
      width: '100%',
      height: 50,
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      marginBottom: 10,
    },
    pickerItems: {
      height: 50,
      color: 'black'
    },
  });