import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView} from 'react-native';
import axios from 'axios';

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'TabNavigator' })],
  });

export default class Login extends React.Component {

  state = {username: "", password: ""}
/*
post login info to back, then query from backend with selection after hashing,
return true or false
*/
  checkLogin(){
    const {username, password} = this.state
    
    axios.post(route + '/auth', {username,password})//check login credentials
          .then(res =>{
            console.log(res);
            console.log(res.data);
            if (res.data != 0){
              //ok you're logged in
              user_id = res.data;
              ;
              this.props.navigation.dispatch(resetAction);//set navigation to enter app on success
            }else{
              // not logged in
                Alert.alert(
                  "Login Failed",
                  "Incorrect username or password",
                  [
                    { text: "OK",}
                  ],
                  { cancelable: false }
              )
            }
          })
        }

    render() {
      return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <View style={styles.container}>
          <Image style={styles.logo} source={require('../assets/logo.jpeg')} />
        <Text style={styles.welcome}>Driver Dispatch</Text>
        <TextInput 
        style={styles.input}
        placeholder="Username" onChangeText={text => this.setState({username: text})}//change state of username after entered
        />
        <TextInput 
        style={styles.input}
        placeholder="Password" onChangeText={text => this.setState({password: text})}//change state of password after entered
        secureTextEntry
        />
      <View style={styles.buttonContainer}> 
        <TouchableOpacity onPress={() => this.checkLogin()}//on press try checklogin function
        style={styles.button}
         >
         <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      </View>
      </KeyboardAvoidingView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: -50,
      backgroundColor: '#F4F4F4',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    logo:{
      width: 350,
      height: 350,
      resizeMode: 'contain',
    },
    welcome: {
      fontSize: 30,
      marginTop: -80,
      marginBottom: 40,
    },
    input: {
      width: "90%",
      padding: 15,
      marginBottom: 10,
      borderColor: 'black',
      borderWidth: 1,
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
    }
  });