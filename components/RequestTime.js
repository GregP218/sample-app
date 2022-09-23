import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';
import moment from 'moment';
//Page to enter time off requests

export default class RequestTime extends React.Component {
//set starting values for day off start and day off end
  state = {
    day_off_start: new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate(), 
    day_off_end: new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate()
  }

SubmitTime(){//function to submit request when button is pressed

const timeOff = {
  day_off_start: this.state.day_off_start,
  day_off_end: this.state.day_off_end,
  user_id: user_id,
};

if(moment(timeOff.day_off_end).isSameOrAfter(timeOff.day_off_start))//check if end date is same or after start date
{

  axios.post(route + '/time_off', {timeOff})//post time off dates to database
    .then(res =>{
      console.log(res);
      console.log(res.data);
    })
    Alert.alert(//alert user of successful request
      "Request Submitted!",
      "Your availability has been changed for the requested dates.",
      [
        { text: "OK",
        onPress:() => this.props.navigation.navigate('Availability')}
      ],
      { cancelable: false }
    );
}else{
  Alert.alert(//alert user of failed request and reason for failure
    "Request Failed!",
    "Your end date can't be before your start date.",
    [
      { text: "OK",}
    ],
    { cancelable: false }
  );
}
}
  
    render() { 
      return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
      <Image
          source={require("../assets/clock.png")}//display icon
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'white', alignSelf: 'center' }}
        />
    <Text style={styles.welcome}> Request Time Off</Text>
        </View>
        <Text style={{marginTop: 30}}></Text>
    <Text>Start Date</Text>
    <DatePicker
        style={{width: 300,}}//display date picker for start date starting at todays date
        date={this.state.day_off_start}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={new Date()}
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
        onDateChange={(date) => {this.setState({day_off_start: date}) && this.setState({day_off_end: date})}}
      />
<Text></Text>
<Text>End Date</Text>
<DatePicker
        style={{width: 300}}//display date picker for end date starting after start date
        date={this.state.day_off_end}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate= {this.state.day_off_start}
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
        onDateChange={(date) => {this.setState({day_off_end: date})}}
      />
      <Text></Text>
      <View style={styles.buttonContainer}> 
        <TouchableOpacity onPress={() => this.SubmitTime()}//on press try submittime function
        style={styles.button}
         >
         <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
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
    containerTop: {
      width: "100%",
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: "#2E4277",
    },
    welcome: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        marginTop: 60,
        marginBottom: 40,
    },
    button: {
      backgroundColor: "#2E4277",
      padding: 15,
      width: "45%",
      borderRadius: 50,
      borderColor: 'black',
      borderWidth: 1,
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      textAlign: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 30,
    },
  });