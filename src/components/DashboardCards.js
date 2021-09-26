import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';

const DashboardCards = ({colors, Title, Amount, icon, Increment, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: '47%',
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        marginLeft: SIZES.radius,
        marginRight: SIZES.radius,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        ...styles.shadow,
      }}
      onPress={onPress}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 50,
            backgroundColor: colors,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={icon}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.white,
            }}
          />
        </View>

        <View style={{marginLeft: SIZES.base, alignItems: 'flex-end'}}>
          <Text style={{...FONTS.h4, color: COLORS.green}}>{Increment}</Text>
        </View>
      </View>
      <View style={{marginTop: SIZES.radius}}>
        <Text style={{...FONTS.h2}}>{Amount}</Text>
        <Text style={{color: COLORS.lightGray, ...FONTS.h3}}>{Title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default DashboardCards;
