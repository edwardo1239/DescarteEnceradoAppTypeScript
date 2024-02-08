import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function Footer() {
  return (
    <View style={styles.container}>
       <Image source={require('../assets/CELIFRUT.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7D9F3A",
    height: 80,
    width: "100%",
    justifyContent: 'center',
    alignContent: 'center'
  },
  image:{
    
    width:60,
    height: 60
   
}
});
