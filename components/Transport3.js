import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, Image, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
//set of pages used to complete transportation report for completed trips.
export default class Transport3 extends React.Component {
    //state to hold values of transportation report
    state = {
      report_vid: "",
      report_date: "",
      report_day: "0",
      report_destination: "",
      report_starttime: "",
      report_endtime: "",
      report_odometerstart: "",
      report_odometerend: "",
      report_total_passengers: "",
      report_cash: "",
      user_id: user_id,
      vehicle_id: "",
      elder_ambul: "0",
      eld_nonamb: "0",
      noneld_amb: "0",
      noneld_nonamb: "0",
      transreport_note: "",
    }

    componentDidMount(){//on mount get various trip information to auto complete some of the report

        axios.get(route + '/getTransportTrip', {
          params: {
          idtrip: this.props.navigation.state.params.selectedTrip}})
          .then((response) => {
            console.log(response.data);
            console.log(response.status);
            this.setState({report_vid: response.data[0].vehicle1_id});
            this.setState({report_date: response.data[0].appt_date.slice(0,10)});
          }, (error) => {
              console.log(error);
        })
      }


    SubmitTransport(){//function to post transportation report info to database

      const Transport = this.state;
      
        axios.post(route + '/transport', {Transport})
          .then(res =>{
            console.log(res);
            console.log(res.data);
            if (res.data == 1){
              Alert.alert(//alert user of successful submission
                "Transportation Report Submitted!",
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

    render() { //display transportation report fields to be completed

      return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
    <View style={styles.container}>
      <View style={styles.topContainer}>
      <Image
          source={require("../assets/list.png")}
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'white', alignSelf: 'center' }}
        />
    <Text style={styles.welcome}> Transportation Report</Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
    <Text></Text>

        <TextInput 
        style={styles.input}
        placeholder="Destination" onChangeText={text => this.setState({report_destination: text})}
        />

        <DatePicker
          style={{width: 200}}//time picker to select trip start time
          date={this.state.report_starttime}
          mode="time"
          placeholder="select start time"
          format="HH:mm"
          iconSource={require("../assets/time.png")}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          is24Hour = {false}
          minuteInterval={5}
          customStyles={{
            dateInput: {
              borderColor: 'black',
            }
          }}
          onDateChange={(time) => {this.setState({report_starttime: time});}}
        />
<Text></Text>
        <DatePicker
          style={{width: 200}}//time picker to select trip end time
          date={this.state.report_endtime}
          mode="time"
          placeholder="select end time"
          format="HH:mm"
          iconSource={require("../assets/time.png")}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          is24Hour = {false}
          minuteInterval={5}
          customStyles={{
            dateInput: {
              borderColor: 'black',
            }
          }}
          onDateChange={(time) => {this.setState({report_endtime: time});}}
        />
<Text></Text>
        <TextInput keyboardType="numeric"//numerical entry spots for various fields
        style={styles.input}
        placeholder="Odometer End" onChangeText={text => this.setState({report_odometerend: text})}
        />
        <TextInput keyboardType="numeric"
        style={styles.input}
        placeholder="Odometer Start" onChangeText={text => this.setState({report_odometerstart: text})}
        />
        <TextInput 
        style={styles.input}
        placeholder="Passenger Names" onChangeText={text => this.setState({transreport_note: text})}
        />
        <TextInput keyboardType="numeric"
        style={styles.input}
        placeholder="Total Passengers" onChangeText={text => this.setState({report_total_passengers: text})}
        />
        <TextInput keyboardType="numeric"
        style={styles.input}
        placeholder="Cash Received" onChangeText={text => this.setState({report_cash: text})}
        />
        
        

    <View style={styles.buttonContainer}> 
        <TouchableOpacity onPress={() =>  this.SubmitTransport()}//submit button, on press try submittransport
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
      justifyContent: 'flex-start',
      backgroundColor: '#F4F4F4',
    },
    topContainer: {
      width: "100%",
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: "#2E4277",
    },
    welcome: {
        color: 'white',
        fontSize: 30,
        marginTop: 60,
        marginBottom: 40,
    },
    scrollContainer:{
      width: "90%",
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
      width: "100%",
      padding: 15,
      marginBottom: 10,
      borderColor: 'black',
      borderWidth: 1,
    },
  });