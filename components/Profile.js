import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Moment from 'react-moment';
import {NavigationEvents} from 'react-navigation';
//Display basic profile info to driver. By admin request, info cannot be edited in mobile app

export default class Profile extends React.Component {
    //create state to hold driver info
    state = {
      driverInfo: [],
    }

    componentDidMount() {//on mount get driver info from database based on driver id
      axios.get(route + '/driver', {
          params: {
            user_id: user_id
          }
        })
        .then((response) => {
          console.log(response.data);
          console.log(response.status);
          this.setState({
            driverInfo: response.data
          });
        }, (error) => {
          console.log(error);
        });
    }

    render() { //Display various info in profile including training dates and expirations
      return (
    <View style={styles.container}>
            <NavigationEvents onDidFocus={() => this.componentDidMount()} />
    <View style={styles.containerTop}>
    <Image
          source={require("../assets/person.png")}
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'white', alignSelf: 'center' }}
        />
    <Text style={styles.welcome}> Driver Profile</Text>
    </View>
    <View style={styles.profile}>
    <View style = {styles.fields}>
    <Text style = {styles.headers}>Name:</Text>
    {this.state.driverInfo.map(driver => <Text key={driver.user_id}>{driver.f_name} {driver.l_name}</Text>)}
    </View>
    <View style = {styles.fields}>
    <Text style = {styles.headers}>Email:</Text>
    {this.state.driverInfo.map(driver => <Text key={driver.user_id}>{driver.email}</Text>)}
    </View>
    <View style = {styles.fields}>
    <Text style = {styles.headers}>Cell Phone:</Text>
    {this.state.driverInfo.map(driver => <Text key={driver.user_id}>{driver.phone_cell ? driver.phone_cell.slice(0,3) + '-' + driver.phone_cell.slice(3,6) + '-' + driver.phone_cell.slice(6,10) : '-'}</Text>)}
    </View>
    <View style = {styles.fields}>
    <Text style = {styles.headers}>Home Phone:</Text>
    {this.state.driverInfo.map(driver => <Text key={driver.user_id}>{driver.phone_home ? driver.phone_home.slice(0,3) + '-' + driver.phone_home.slice(3,6) + '-' + driver.phone_home.slice(6,10) : '-'}</Text>)}
    </View>
    <View style = {styles.fields}>
    <Text style = {styles.headers}>Date of Wheelchair Training:</Text>
    {this.state.driverInfo.map(driver => <Moment format="MM/DD/YYYY" key={driver.user_id} element={Text}>{driver.wheelchair_cert}</Moment>)}
    </View>
    <View style = {styles.fields}>
    <Text style = {styles.headers}>Wheelchair Training Expiration Date:</Text>
    {this.state.driverInfo.map(driver => <Moment format="MM/DD/YYYY" key={driver.user_id} element={Text}>{driver.wheelchair_due}</Moment>)}
    </View>
    <View style = {styles.fields}>
    <Text style = {styles.headers}>Date of CPR Training:</Text>
    {this.state.driverInfo.map(driver => <Moment format="MM/DD/YYYY" key={driver.user_id} element={Text}>{driver.cpr_cert}</Moment>)}
    </View>
    <View style = {styles.fieldsBottom}>
    <Text style = {styles.headers} >CPR Training Expiration Date:</Text>
    {this.state.driverInfo.map(driver => <Moment format="MM/DD/YYYY" key={driver.user_id} element={Text}>{driver.cpr_due}</Moment>)}
    </View>
    </View>
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
    fields: {
      justifyContent: 'center',
      paddingLeft: 10,
      borderWidth: 1,
      borderColor: 'gray',
      width: "100%",
      height: "11%",
      borderTopWidth: 0,
    },
    fieldsBottom: {
      justifyContent: 'center',
      paddingLeft: 10,
      borderWidth: 1,
      borderColor: 'gray',
      width: "100%",
      height: "11%",
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },
    headers: {
      color: 'gray',
    },
  });