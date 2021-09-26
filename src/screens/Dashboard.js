import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {DashboardCards} from '../components';

const Dashboard = props => {
  const HeaderBar = () => (
    <View
      style={{
        flexDirection: 'row',
        marginLeft: SIZES.padding,
        marginTop: SIZES.padding * 2,
        marginRight: SIZES.padding,
      }}>
      <View style={{flex: 1}}>
        <Text style={{...FONTS.h2}}>
          Hi <Text>Sadeep</Text>
        </Text>
        <Text style={{color: COLORS.gray, ...FONTS.body4}}>Sep 26 2021</Text>
      </View>

      <View
        style={{flexDirection: 'row', height: '100%', alignItems: 'center'}}>
        <Image
          source={{
            uri: 'https://st3.depositphotos.com/12985790/17379/i/600/depositphotos_173790436-stock-photo-happy-child.jpg',
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40,
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{}}>
        {HeaderBar()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding * 2,
              justifyContent: 'space-between',
              marginLeft: SIZES.padding,
              marginRight: SIZES.padding,
            }}>
            <Text style={{...FONTS.h3}}>Patients Analysis</Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              marginTop: SIZES.base,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: SIZES.padding,
                marginRight: SIZES.padding,
              }}>
              <DashboardCards
                colors={COLORS.green}
                Title="Current"
                Amount="20"
                Increment="-10"
                icon={icons.list}
                onPress={() => alert('Sold Items')}
              />
              <DashboardCards
                colors={COLORS.red}
                Title="Critical"
                Amount="6"
                Increment=""
                icon={icons.home}
                onPress={() => alert('Order Received')}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.padding,
                marginLeft: SIZES.padding,
                marginRight: SIZES.padding,
              }}>
              <DashboardCards
                colors={COLORS.yellow}
                Title="Tot. Patients"
                Amount="280"
                Increment=""
                icon={icons.home}
                onPress={() => alert('Gross Sales')}
              />
              <DashboardCards
                colors={COLORS.primary}
                Title="Discharge"
                Amount="260"
                Increment="+10"
                icon={icons.settings}
                onPress={() => alert('Earnings')}
              />
            </View>
          </View>
          <View
            style={{
              marginBottom: SIZES.padding * 2,
            }}>
            <View></View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default Dashboard;
