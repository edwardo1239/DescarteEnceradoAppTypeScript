import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  View,
} from 'react-native';
import {format} from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

type propsTypes = {
  historial: boolean;
};

type datosType = {
  data: dataType;
};

type dataType = [
  {
    enf: string;
    canastillas: number;
    fecha: Date;
    kilos: number;
    nombre: string;
  },
];

export default function Historial(props: propsTypes) {
  const [loading, setLoading] = useState<boolean>(false);
  const [datos, setDatos] = useState<datosType>({
    data: [{canastillas: 0, enf: '', fecha: new Date(), kilos: 0, nombre: ''}],
  });

  useEffect(() => {
    const getDatosHistorial = async () => {
      try {
        setLoading(true);
        let jsonValue: any = await AsyncStorage.getItem('historial');
        let datosJson = await JSON.parse(jsonValue);
        if (datosJson == null)
          return Alert.alert('No hay datos en el historial');

        while (datosJson.data.length > 200) {
          datosJson.data.pop();
          console.log(datosJson);
        }
        setDatos(datosJson);
        setLoading(false);

        const jsonValueI = JSON.stringify(datosJson);
        await AsyncStorage.setItem('historial', jsonValueI);
      } catch (e: any) {
        Alert.alert(e);
        setLoading(false);
      }
    };

    getDatosHistorial();
  }, [props.historial]);

  return (
    <>
      {loading == true ? (
        <ActivityIndicator size="large" color="#00ff00" style={styles.loader} />
      ) : (
        <View style={styles.container}>
                <FlatList
                  data={datos.data}
                  renderItem={({item}) => (
                    <View
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        gap:10,
                        alignItems:'center',
                        borderBottomWidth: 1,
                        margin:10
                      }}>
                      <Text style={styles.celdas}>{item.enf}</Text>
                      <Text style={styles.celdas}>{item.nombre}</Text>
                      <Text style={styles.celdas}>{item.kilos}</Text>
                      <Text style={styles.celdas}>{item.canastillas}</Text>
                      <Text style={styles.celdas}>
                        {format(new Date(item.fecha), 'dd/MM/yyyy')}
                      </Text>
                    </View>
                  )}
                  ListHeaderComponent={
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <Text style={styles.header}>ENF</Text>
                      <Text style={styles.header}>Nombre</Text>
                      <Text style={styles.header}>Kilos</Text>
                      <Text style={styles.header}>Canastillas</Text>
                      <Text style={styles.header}>Fecha</Text>
                    </View>
                  }
                />
        </View>
      )}
    </ >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    top: 30,
    backgroundColor: '#EEFBE5',
    paddingTop: 10,
    paddingBottom: 50,
    flexDirection: 'column',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginLeft: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
  celdas: {
    marginLeft: 10,
    marginTop: 10,
    minWidth: 50,
    maxWidth:100,
    overflow: 'hidden',
    justifyContent:'center',
    textAlign:'center',
    flex:4

  },
  containerh: {
    width: '100%',
    justifyContent: 'space-around',
    backgroundColor: '#EEFBE5',
    flexDirection: 'row',
  },
  containert: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#EEFBE5',
    flexDirection: 'row',
  },
});
