import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';

import {COLORS, SIZES, FONTS, icons, images} from '../constants';

const SplashScreen = props => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      props.navigation.replace('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image
        source={images.banner}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      /> */}

      <Image
        animating={animating}
        source={images.logo}
        resizeMode="contain"
        style={{
          height: 200,
          width: 200,
        }}
      />

      <ActivityIndicator
        animating={animating}
        color={COLORS.red}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
