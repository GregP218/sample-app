import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import ModalSelector from 'react-native-modal-selector'
//set of pages used to complete transportation report for completed trips.

export default class Transport2 extends React.Component {
  //state to hold information from database
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      tripInfo: [],
      selectedTrip: '',
    };
  }
  
  componentDidMount(){//on mount get trips matching selected date and driver

    axios.get(route + '/getTrips', {
      params: {
      appt_date: this.props.navigation.state.params.appt_date,
      user_id: user_id}})
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        this.setState({tripInfo: response.data});
      }, (error) => {
          console.log(error);
    });
  }

    render() { 

      return (

    <View style={styles.container}>
      <View style={styles.topContainer}>
      <Image
          source={require("../assets/list.png")}
          style={{ width: 26, height: 26, marginTop: 20, tintColor: 'white', alignSelf: 'center' }}
        />
    <Text style={styles.welcome}> Transportation Report</Text>
    </View>

    <View style={{flex:1, justifyContent:'space-around', padding:10}}>

<ModalSelector
    data={this.state.tripInfo}//selector to pick which trip of the given date to report on.
    keyExtractor= {item => item.idtrip}
    labelExtractor= {item => item.pickup_street1 + ' ' + item.pickup_time}
    initValue="Select a trip"
    //selectStyle= {{color: 'black'}}
    onChange={(option)=>{ this.setState({selectedTrip: option.idtrip})}}
  />
      </View>
<View style={styles.buttonContainer}> 
<TouchableOpacity onPress={() => this.props.navigation.navigate('Transport3', {//next button, on press navigate to next transportation report page
        selectedTrip: this.state.selectedTrip,
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