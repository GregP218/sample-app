import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
//access pages to request time off or view previously entered time off requests.

export default class Availability extends React.Component {

    render() { 
      return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
      <Image
          source={require("../assets/clock.png")}//display icon
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'white', alignSelf: 'center' }}
        />
    <Text style={styles.welcome}> Time Off</Text>
        </View>
        <View style={styles.topButtonContainer}> 
        <TouchableOpacity onPress={() => this.props.navigation.navigate('RequestTime')}//button to navigate to time off request
        style={styles.topButton}
         >
         <Text style={styles.buttonHeaderText}>Request Time Off</Text>
         <Text style = {styles.buttonText}>Enter dates that you are unable to work.</Text>
         <Image
          source={require("../assets/arrow.png")}//display icon
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'black', position: 'absolute', right: 0}}
        />
        </TouchableOpacity>
    </View>
    <Text></Text>
    <Text></Text>
    <View style={styles.bottomButtonContainer}> 
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewTime')}//button to navigate to view time off requests page
        style={styles.bottomButton}
         >
         <Text style={styles.buttonHeaderText}>View/Edit Requests</Text>
         <Text style = {styles.buttonText}>View and edit time off requests.</Text>
         <Image
          source={require("../assets/arrow.png")}//display icon
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'black', position: 'absolute', right: 0}}
        />
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
    topButton: {
      backgroundColor: '#FFFFFF',
      padding: 15,
      width: "90%",
      borderRadius: 15,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      borderRightWidth: 1,
      borderRightColor: 'gray',
    },
    bottomButton: {
      backgroundColor: '#FFFFFF',
      padding: 15,
      width: "90%",
      borderRadius: 15,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      borderRightWidth: 1,
      borderRightColor: 'gray',
    },
    buttonHeaderText: {
      fontSize: 30,
      textAlign: "center",
    },
    buttonText: {
      fontSize: 14,
      textAlign: "center",
    },
    topButtonContainer: {
      marginTop: 60,
      height: '20%',
      flexDirection: "row",
      justifyContent: "space-between",
    },
    bottomButtonContainer: {
      height: '20%',
      flexDirection: "row",
      justifyContent: "space-between",
    }
  });