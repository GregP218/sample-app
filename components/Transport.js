import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DatePicker from 'react-native-datepicker';
//set of pages used to complete transportation report for completed trips.

export default class Transport extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appt_date: new Date(),
    };
  }

    render() { 
      return (

    <View style={styles.container}>
      <View style={styles.topContainer}>
      <Image
          source={require("../assets/list.png")}//display icon
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'white', alignSelf: 'center' }}
        />
    <Text style={styles.welcome}> Transportation Report</Text>
    </View>
    <View style={{flex:1, justifyContent:'space-around', padding:10}}>
     
    <DatePicker
        style={{width: 300, marginBottom: 30}}//date picker to select date of completed trip to report on
        date={this.state.appt_date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2020-01-01"
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
        onDateChange={(date) => {this.setState({appt_date: date})}}
      />
    </View>
        <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Transport2', {//next button, on press navigate to next transportation checklist page
        appt_date: this.state.appt_date,
      })}
      style={styles.button}
        >
        <Text style={styles.buttonText}>Next</Text>
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
    button: {
      backgroundColor: "#2E4277",
      height: 60,
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 1,
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