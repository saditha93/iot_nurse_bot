import React from 'react';
import {View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dashboard, Control} from '../screens';
import {icons, COLORS, FONTS} from '../constants';
const Tab = createBottomTabNavigator();

const tabs = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text
              style={{
                color: focused ? COLORS.primary : COLORS.gray,
                ...FONTS.body6,
              }}>
              Dashboard
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.primary : COLORS.gray,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Bot Control"
        component={Control}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text
              style={{
                color: focused ? COLORS.primary : COLORS.gray,
                ...FONTS.body6,
              }}>
              Bot Control
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.list}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.primary : COLORS.gray,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default tabs;
