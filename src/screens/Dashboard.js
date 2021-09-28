import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {
  COLORS,
  FONTS,
  icons,
  SIZES,
  images,
  VictoryCustomTheme,
} from '../constants';
import {DashboardCards} from '../components';
import {
  VictoryScatter,
  VictoryAxis,
  VictoryLine,
  VictoryChart,
} from 'victory-native';
import database from '@react-native-firebase/database';

const Dashboard = props => {
  const [chartData, setChartData] = useState([
    {x: 1, y: 2.6},
    {x: 1.5, y: 2.2},
    {x: 2, y: 2},
    {x: 2.5, y: 2.2},
    {x: 3, y: 1.6},
    {x: 3.5, y: 2.1},
    {x: 4, y: 2.5},
    {x: 5, y: 1.6},
    {x: 3.5, y: 2.1},
    {x: 6, y: 1.6},
    {x: 7, y: 3.5},
  ]);

  const [data, setData] = useState([]);
  const [dataAnalysis, setDataAnalysis] = useState([]);

  useEffect(() => {
    //sendData();
    GetData();
  }, []);

  const GetData = () => {
    database()
      .ref('/users/admin')
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
        setData(snapshot.val());
      });

    database()
      .ref('/users/Analysis')
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
        //setData(snapshot.val());
        setDataAnalysis(snapshot.val());
      });
  };

  const sendData = () => {
    database()
      .ref('/users/admin')
      .set({
        temp: 10.03,
        weight: 1.5,
      })
      .then(() => console.log('Data set.'));

    database()
      .ref('/users/Analysis')
      .set({
        Current: 20,
        TotPatients: 280,
        Discharge: 260,
        Critical: 6,
      })
      .then(() => console.log('Data set.'));
  };

  const HeaderBar = () => (
    <View
      style={{
        flexDirection: 'row',
        marginLeft: SIZES.padding,
        marginTop: SIZES.padding * 2,
      }}>
      <View style={{flex: 1}}>
        <Text style={{...FONTS.h2}}>
          <Text>Welcome!</Text>
        </Text>
        <Text style={{color: COLORS.gray, ...FONTS.body4}}>Sep 26 2021</Text>
      </View>

      <View style={{flexDirection: 'row', height: '100%', marginRight: -20}}>
        <Image
          source={images.logo}
          style={{
            width: 160,
            height: 50,
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
              marginLeft: SIZES.padding,
              marginRight: SIZES.padding,
              marginTop: SIZES.padding,
              borderRadius: 10,
              backgroundColor: COLORS.white,
              padding: SIZES.padding,
              shadowColor: data?.weight > 1.5 ? 'red' : '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: data?.weight > 1.5 ? 0.5 : 0.1,
              shadowRadius: 6.65,
              elevation: 3,
            }}>
            <Text style={{...FONTS.h3}}>Live Data</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.base,
                justifyContent: 'space-between',
              }}>
              <Text style={{...FONTS.body4}}>Temperature</Text>
              <Text style={{...FONTS.body4}}>:</Text>
              <Text style={{...FONTS.body4}}>{data?.temp} ℃</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.base,
                justifyContent: 'space-between',
              }}>
              <Text style={{...FONTS.body4}}>Bot weight</Text>
              <Text style={{...FONTS.body4}}>:</Text>
              <Text style={{...FONTS.body4}}>{data?.weight}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding,
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
                onPress={() => alert('Current')}
              />
              <DashboardCards
                colors={COLORS.red}
                Title="Critical"
                Amount="6"
                Increment=""
                icon={icons.home}
                onPress={() => alert('Critical')}
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
                onPress={() => alert('Tot. Patients')}
              />
              <DashboardCards
                colors={COLORS.primary}
                Title="Discharge"
                Amount="260"
                Increment="+10"
                icon={icons.settings}
                onPress={() => alert('Discharge')}
              />
            </View>
          </View>
          <View
            style={{
              marginBottom: SIZES.padding * 2,
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.padding,
                  justifyContent: 'space-between',
                  marginLeft: SIZES.padding,
                  marginRight: SIZES.padding,
                }}>
                <Text style={{...FONTS.h3}}>Week Analysis</Text>
              </View>
              <View
                style={{
                  marginLeft: SIZES.padding,
                  marginBottom: SIZES.padding * 3,
                }}>
                <VictoryChart
                  theme={VictoryCustomTheme}
                  height={220}
                  width={SIZES.width - 10}>
                  <VictoryLine
                    style={{
                      data: {
                        stroke: COLORS.secondary,
                      },
                      parent: {
                        border: '1px solid #CCC',
                      },
                    }}
                    data={chartData}
                    categories={{
                      x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                      y: ['75', '150', '225', '250'],
                    }}
                  />
                  <VictoryScatter
                    data={chartData}
                    size={6}
                    style={{
                      data: {
                        fill: COLORS.primary,
                      },
                    }}
                  />
                </VictoryChart>
              </View>
            </View>
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
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.65,

    elevation: 3,
  },
});

export default Dashboard;
