import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
//page to complete pre-trip checklist. Mostly consisting of radio buttons
//made of multiple pages per client request due to length of checklist

//create variables to hold checklist info
var headlights = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var clearance_lights_front = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var id_lights_front = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var turn_signals = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var alt_flashing_front = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var sidemarker_lights_left = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var reflectors_left = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var er_door_left = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var tail_lights = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var stop_lights = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var clearance_lights_rear = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var id_lights_rear = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var reflectors_rear = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var alt_flashing_rear = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var er_door_rear = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var sidemarker_lights_right = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var reflectors_right = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var entrance_door = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var wheellug_6tires = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var secure_inside = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var secure_under = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];
var secure_around = [ {label: "Yes ", value: 1}, {label: "No", value: 0}];

export default class PreTrip2 extends React.Component {
//set states to unchecked at start
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
  }

    render() { //hold states from previous page
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
      return (
        //display radio buttons, change state when pressed
    <View style={styles.container}>
    <View style={styles.topContainer}>
      <Image
          source={require("../assets/list.png")}//display icon
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'white', alignSelf: 'center' }}
        />
    <Text style={styles.greet}> Pre-Trip Checklist</Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false} style = {styles.scrollContainer}>
    <View style={styles.radioContainer}>
        <Text style={styles.welcome} >Outside</Text>
        <Text style={styles.welcome}>Front</Text>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Headlights </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={headlights}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({headlights: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Clearance Lights </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={clearance_lights_front}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({clearance_lights_front: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Identification Lights </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={id_lights_front}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({id_lights_front: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Turn Signals + 4-Ways </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={turn_signals}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({turn_signals: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Alternative Flashing (Amber * Red Lights) </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={alt_flashing_front}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({alt_flashing_front: value})}}
        />
        </View>
        </View>
        <Text style={styles.welcome}>Left Side</Text>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Sidemarker Lights </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={sidemarker_lights_left}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({sidemarker_lights_left: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Reflectors </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={reflectors_left}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({reflectors_left: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Emergency Door (If so Equipped) </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={er_door_left}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({er_door_left: value})}}
        />
        </View>
        </View>
        <Text style={styles.welcome} >Rear</Text>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Tail-Lights </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={tail_lights}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({tail_lights: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Stop-Lights </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={stop_lights}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({stop_lights: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Clearance Lights </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={clearance_lights_rear}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({clearance_lights_rear: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Identification Lights </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={id_lights_rear}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({id_lights_rear: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Reflectors </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={reflectors_rear}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({reflectors_rear: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Alternately Flashing Red Lights </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={alt_flashing_rear}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({alt_flashing_rear: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Emergency Door or Window </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={er_door_rear}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({er_door_rear: value})}}
        />
        </View>
        </View>
        <Text style={styles.welcome}>Right Side</Text>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>SIdemarker Lights </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={sidemarker_lights_right}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({sidemarker_lights_right: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Reflectors </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={reflectors_right}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({reflectors_right: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Entrance Door </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={entrance_door}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({entrance_door: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Wheel Lugs + 6 Tires </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={wheellug_6tires}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({wheellug_6tires: value})}}
        />
        </View>
        </View>
        <Text style={styles.welcome}>Security Inspection</Text>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Inside Vehicle </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={secure_inside}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({secure_inside: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Under Vehicle </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={secure_under}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({secure_under: value})}}
        />
        </View>
        </View>
        <View style={styles.radioLines}>
        <View style={styles.radioText}>
       <Text>Around Vehicle </Text> 
       </View>
       <View style={styles.radioLabels}>
        <RadioForm
        radio_props={secure_around}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        onPress={(value) => {this.setState({secure_around: value})}}
        />
        </View>
        </View>
        </View>
   
    <View style={styles.buttonContainer}> 
        <TouchableOpacity onPress={() =>  this.props.navigation.navigate('PreTrip3', {//on press navigate to page 3 of checklist
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