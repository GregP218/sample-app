import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Moment from 'react-moment';
//page to view list of previously requests time off dates

export default class ViewTime extends React.Component {
//store info from database
    state = {
      timeInfo: []
    }

    componentDidMount() {//request info from database
      axios.get(route + '/viewTime', {
          params: {
            user_id: user_id
          }
        })
        .then((response) => {
          console.log(response.data);
          console.log(response.status);
          this.setState({
            timeInfo: response.data
          });
        }, (error) => {
          console.log(error);
        });
    }

    render() { 
      return (
    <View style={styles.container}>
    <View style={styles.containerTop}>
    <Image
          source={require("../assets/clock.png")}//display icon
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'white', alignSelf: 'center' }}
        />
    <Text style={styles.welcome}> View Time Off</Text>
    </View>

    <Text></Text>

    <ScrollView showsVerticalScrollIndicator={false} overScrollMode={'never'} style={styles.scrollContainer}>
    {this.state.timeInfo.map(time => 
      <TouchableOpacity 
      style={styles.button}//on press confirm cancellation of time off request
      key={time.vacation_id} 
      onPress={() => Alert.alert(
        "Cancel Request?",
        "Would you like to remove this time off request?",
        [
          { text: "Yes",
          onPress:() => 
          axios.delete(route + '/cancelTime', {data: {time: time}})//on yes remove request from database and return to previous page
          .then(res =>{
            console.log(res);
            console.log(res.data);
          }) && this.props.navigation.navigate('Availability')
        },
          {
            text: "No",
          }
        ],
        { cancelable: false }
      )}//Display date range that has been requested off
        >
        <View>
        <Text>Unavailable</Text>
        <View style={{flexDirection: 'row'}}>
        <Text>From: </Text>
        <Moment format="MM/DD/YYYY" element={Text}>{time.day_off_start}</Moment>
        </View>
        <View style={{flexDirection: 'row'}}>
        <Text>To: </Text>
        <Moment format="MM/DD/YYYY" element={Text}>{time.day_off_end}</Moment>
        </View>
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
      backgroundColor: '#F4F4F4',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    containerTop: {
      width: "100%",
      backgroundColor: "#2E4277",
      justifyContent: 'center',
      flexDirection: 'row',
    },
    welcome: {
      color: 'white',
      textAlign: 'center',
      fontSize: 30,
      marginTop: 60,
      marginBottom: 40,
    },
    scrollContainer: {
      flex: 1,
      width: 300,
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
  });