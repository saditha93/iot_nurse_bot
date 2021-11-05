import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES, images} from '../constants';
import {DashboardCards} from '../components';

import database from '@react-native-firebase/database';

const Control = () => {
  const [data, setData] = useState([]);
  const [status1, setStatus1] = useState([]);
  const [status2, setStatus2] = useState([]);

  useEffect(() => {}, []);

  const Drawer1 = () => {
    value = 0;

    if (status1 == true) {
      setStatus1(false);
      value = 0;
    } else {
      setStatus1(true);
      value = 90;
    }

    database()
      .ref('/users/Motor1')
      .set({
        value: value,
        //90
      })
      .then(() => console.log('Data set.'));
  };

  const Drawer2 = () => {
    value = 0;

    if (status2 == true) {
      setStatus2(false);
      value = 90;
    } else {
      setStatus2(true);
      value = 0;
    }

    database()
      .ref('/users/Control')
      .set({
        value: value,
        //90
      })
      .then(() => console.log('Data set.'));
  };

  const BotDrive = driveSide => {
    var left = false;
    var right = false;
    var up = false;
    var down = false;

    if (driveSide == 'left') {
      left = true;
    } else if (driveSide == 'right') {
      right = true;
    } else if (driveSide == 'up') {
      up = true;
    } else {
      down = true;
    }

    database()
      .ref('/users/Control')
      .set({
        left: left,
        right: right,
        down: down,
        up: up,
        //90
      })
      .then(() => console.log('Data set.'));
  };

  return (
    <View style={styles.container}>
      <Image
        source={images.robot}
        style={{
          width: '100%',
          height: 300,
        }}
      />
      <View
        style={{
          marginTop: -100,
          height: 170,
          borderRadius: 8,
          padding: SIZES.padding,
          margin: SIZES.padding,
          backgroundColor: COLORS.white,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6.65,

          elevation: 3,
        }}>
        <View>
          <View
            style={{
              backgroundColor: COLORS.lightGreen,
              padding: SIZES.base,

              borderRadius: 3,
            }}>
            <Text
              style={{
                color: COLORS.green,
                fontWeight: 'bold',
                ...FONTS.h3,
              }}>
              Status : Connected
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: SIZES.base,
          }}>
          <View
            style={{
              backgroundColor: COLORS.lightPurple,
              padding: SIZES.base,

              borderRadius: 3,
            }}>
            <Text
              style={{
                color: COLORS.purple,
                fontWeight: 'bold',
                ...FONTS.h3,
              }}>
              Drawer 1 : <Text>{status1 ? 'Opened' : 'Closed'}</Text>
            </Text>
          </View>
          <View
            style={{
              backgroundColor: COLORS.lightPurple,
              padding: SIZES.base,
              marginTop: SIZES.base,
              borderRadius: 3,
            }}>
            <Text
              style={{
                color: COLORS.purple,
                fontWeight: 'bold',
                ...FONTS.h3,
              }}>
              Drawer 2 : <Text>{status2 ? 'Opened' : 'Closed'}</Text>
            </Text>
          </View>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={{
            width: 70,
            height: 70,
            backgroundColor: COLORS.green,
            borderRadius: 80,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: SIZES.padding * 2,
            alignItems: 'center',
          }}
          onPress={() => BotDrive('up')}>
          <Image
            source={icons.Aup}
            style={{
              width: 45,
              height: 45,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              width: 70,
              height: 70,
              backgroundColor: COLORS.green,
              borderRadius: 80,
              justifyContent: 'center',
              marginLeft: SIZES.padding * 4,
              alignItems: 'center',
            }}
            onPress={() => BotDrive('left')}>
            <Image
              source={icons.Aleft}
              style={{
                width: 45,
                height: 45,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 70,
              height: 70,
              backgroundColor: COLORS.green,
              borderRadius: 80,
              justifyContent: 'center',
              marginRight: SIZES.padding * 4,
              alignItems: 'center',
            }}
            onPress={() => BotDrive('right')}>
            <Image
              source={icons.Aright}
              style={{
                width: 45,
                height: 45,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: 70,
            height: 70,
            backgroundColor: COLORS.green,
            borderRadius: 80,
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}
          onPress={() => BotDrive('down')}>
          <Image
            source={icons.Adown}
            style={{
              width: 45,
              height: 45,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: SIZES.padding,
          }}>
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: COLORS.primary,
              margin: SIZES.padding,
              borderRadius: 10,
              justifyContent: 'center',
              paddingLeft: SIZES.padding,
              paddingRight: SIZES.padding,
            }}
            onPress={() => Drawer1()}>
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.body3,
                color: COLORS.white,
              }}>
              Drawer 1 <Text>{status1 ? 'Opened' : 'Closed'}</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: COLORS.primary,
              margin: SIZES.padding,
              borderRadius: 10,
              justifyContent: 'center',
              paddingLeft: SIZES.padding,
              paddingRight: SIZES.padding,
            }}
            onPress={() => Drawer2()}>
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.body3,
                color: COLORS.white,
              }}>
              Drawer 2 <Text>{status2 ? 'Opened' : 'Closed'}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Control;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.65,

    elevation: 3,
  },
});
