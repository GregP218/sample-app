import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
//page to complete pre-trip checklist. Mostly consisting of radio buttons
//made of multiple pages per client request due to length of checklist

//create variables to hold checklist info
var parking_brake = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var check_fuel_level = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var wiper_washer = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var heater_defroster = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var mirrors = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var instrument_panel = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var horn = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var er_door = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var rear_wheelbrakes = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var windows = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var steering_wheel = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var warning_devices = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var wheelchair_clamps = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];

export default class PreTrip extends React.Component {
    //set state to unchecked for all buttons
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
    }

    render() { //display radio buttons, on press switch state
      return (
    <View style={styles.container}>
    <View style={styles.topContainer}>
      <Image
          source={require("../assets/list.png")}
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'white', alignSelf: 'center' }}
        />
    <Text style={styles.greet}> Pre-Trip Checklist</Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false} style = {styles.scrollContainer}>
    <View style={styles.radioContainer}>
        <Text style={styles.welcome}>Inside</Text>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Parking Brake </Text> 
       </View>
       <View style={styles.radioLabels}>
       <RadioForm
        radio_props={parking_brake}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({parking_brake: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Check Fuel Level </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={check_fuel_level}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({check_fuel_level: value})}}
        />
        </View>
        </View>
        <Text style={styles.welcome}>RT Engine</Text>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Windsheild Wiper and Washer </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={wiper_washer}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({wiper_washer: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Heater - Defroster </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={heater_defroster}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({heater_defroster: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Mirrors </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={mirrors}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({mirrors: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Instrument Panel (Tail Lights or Buzzers) </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={instrument_panel}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({instrument_panel: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text >Horn </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={horn}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({horn: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Emergency Door (Buzzer) </Text>
       </View>
       <View style={styles.radioLabels}> 
        <RadioForm
        radio_props={er_door}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({er_door: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Apply Rear Wheel Brakes in Emergency (Driver's Manual) Controls for Air Brakes </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={rear_wheelbrakes}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({rear_wheelbrakes: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Windows </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={windows}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({windows: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Steering Wheel - Play </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={steering_wheel}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({steering_wheel: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Warning Device Fire Extinguisher, First Aid Kit, Fuses Reflectors, Turn on All Lights, Including 4-Way Flasher </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={warning_devices}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({warning_devices: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Check Wheelchair Clamps </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={wheelchair_clamps}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({wheelchair_clamps: value})}}
        />
        </View>
        </View>
        </View>
    <View style={styles.buttonContainer}> 
        <TouchableOpacity onPress={() =>  this.props.navigation.navigate('PreTrip2', {//on press navigate to pretrip page 2
        report: this.state,
      })}
        style={styles.button}
         >
         <Text style={styles.buttonText}>Next</Text>
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
      alignItems: 'center',
      backgroundColor: '#F4F4F4',
    },
    topContainer: {
      width: "100%",
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: "#2E4277",
    },
    radioLines: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
    },
    radioText: {
        flex: 1, 
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    radioLabels: {
        flex: 1, 
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
    },
    scrollContainer: {
        width: "100%",
    },
    radioContainer: {
      width: '100%',
      alignItems: 'flex-end',
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
  });