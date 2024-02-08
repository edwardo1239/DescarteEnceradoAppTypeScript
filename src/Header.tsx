import React, {useState} from 'react';
import {Image, StyleSheet, View, Button} from 'react-native';

type HeaderType = {
  changeMain: () => void;
};

export default function Header(props: HeaderType) {
  const [menu, setMenu] = useState<boolean>(false);

  const actionButton = (): void => {
    props.changeMain();
    setMenu(!menu);
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          title={menu == false ? 'Historial' : 'Volver'}
          color="#9E3C29"
          onPress={actionButton}
        />
      </View>
      <Image source={require('../assets/CELIFRUT.png')} style={styles.image} />
      <View style={styles.buttons}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    top: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 90,
    paddingBottom: 50
  },
  image: {
    top: 20,
    width: 60,
    height: 60,
  },
  buttons: {
    height: '100%',
    marginTop: 60,
    marginRight: '20%',
    flex: 0.5,
  },
});
