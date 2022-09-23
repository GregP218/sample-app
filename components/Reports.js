import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
//Report page to select either pre-trip checklist or transportation report. Both must be completed each trip.

export default class Reports extends React.Component {
    render() { 
      return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
      <Image
          source={require("../assets/list.png")}//display icon
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'white', alignSelf: 'center' }}
        />
    <Text style={styles.welcome}> Reports</Text>
      </View>
    <View style={styles.topButtonContainer}> 
        <TouchableOpacity onPress={() => this.props.navigation.navigate('PreTrip')}//on press navigate to pre-trip page
        style={styles.topButton}
         >
         <Text style={styles.buttonHeaderText}>Pre-Trip Checklist</Text>
         <Text style = {styles.buttonText}>Please complete a vehicle inspection and submit a pre-trip checklist before starting a new trip.</Text>
         <Image
          source={require("../assets/arrow.png")}//display icon
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'black', position: 'absolute', right: 0}}
        />
        </TouchableOpacity>
    </View>
    <Text></Text>
    <Text></Text>
    <View style={styles.bottomButtonContainer}> 
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Transport')}//on press navigate to transportation checklist page
        style={styles.bottomButton}
         >
         <Text style={styles.buttonHeaderText}>Transportation Report</Text>
         <Text style = {styles.buttonText}>Please submit a transportation report upon completion of each trip.</Text>
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
    topContainer: {
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