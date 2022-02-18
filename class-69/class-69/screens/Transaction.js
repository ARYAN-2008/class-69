import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner"

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: ""
    };
  }
    getCamerPermissions=async domState=>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);

      this.setState({
        /*status=== "granted" is true when a user has granted permissions
        status=== "granted" is false when user has not granted permissions*/
        hasCameraPermissions:status==="granted",
        domState:domState,
        scanned:false
      });
    };

    handleBarCodeScanned=async ({type,data})=>{
      this.setState({
        scannedData:data,
        domState:"normal",
        scanned:true
      });
    };
  
  render() {
   
    const{domState, hasCameraPermissions, scannedData, scanned}=this.state;
    if(domState==="scanner"){
      return(
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
      )
    }

    

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
        {hasCameraPermissions ? scannedData : "request for camera permissions"}
        </Text>
        <TouchableOpacity style={[styles.button , {marginTop: 35}]}
        onPress={()=>this.getCamerPermissions("scanner")}
        > 
        <Text style={styles.buttonText}>Scan Qr Code</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 15
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 15
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF"
  }
});