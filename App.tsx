/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
 StyleSheet,
  StatusBar,
  View
} from 'react-native';
import Header from './src/Header';
import Form from './src/Form';
import Footer from './src/Footer';
import Historial from './src/Historial';



function App(): JSX.Element {
  const [historial, setHistorial] = useState<boolean>(false);

  const changeMain = ():void => {
    setHistorial(!historial);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} />
      <Header changeMain={changeMain} />
      {historial == false ? <Form /> : <Historial historial={historial}/> }
      <Footer /> 
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});