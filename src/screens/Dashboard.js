import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  COLORS,
  FONTS,
  icons,
  SIZES,
  images,
  VictoryCustomTheme,
} from "../constants";
import { DashboardCards } from "../components";
import {
  VictoryScatter,
  VictoryAxis,
  VictoryLine,
  VictoryChart,
} from "victory-native";
import database from "@react-native-firebase/database";
import { Modalize } from "react-native-modalize";

const Dashboard = props => {
  const modalizeRef = React.useRef(null);

  const [chartData, setChartData] = useState([
    { x: 1, y: 2.6 },
    { x: 1.5, y: 2.2 },
    { x: 2, y: 2 },
    { x: 2.5, y: 2.2 },
    { x: 3, y: 1.6 },
    { x: 3.5, y: 2.1 },
    { x: 4, y: 2.5 },
    { x: 5, y: 1.6 },
    { x: 3.5, y: 2.1 },
    { x: 6, y: 1.6 },
    { x: 7, y: 3.5 },
  ]);

  const [data, setData] = useState([]);
  const [dataAnalysis, setDataAnalysis] = useState([]);
  const [temper, setTemper] = useState([]);
  const [Patients, setPatients] = useState([]);

  useEffect(() => {
    sendData();
    GetData();
  }, []);

  const GetData = () => {
    database()
      .ref("/users/admin")
      .on("value", snapshot => {
        console.log("User data: ", snapshot.val());
        setData(snapshot.val());
      });

    database()
      .ref("/users/Analysis")
      .on("value", snapshot => {
        console.log("User data: ", snapshot.val());
        //setData(snapshot.val());
        setDataAnalysis(snapshot.val());
      });

    database()
      .ref("/users/Temperature")
      .on("value", snapshot => {
        console.log("User data: ", snapshot.val());
        //setData(snapshot.val());
        setTemper(snapshot.val());
      });
    database()
      .ref("/users/Patients")
      .on("value", snapshot => {
        var list = [];
        snapshot.forEach(child => {
          const childData = child.val();
          list.push({
            key: child.key,
            id: childData.id,
            name: childData.name,
            status: childData.status,
            updateOn: childData.updateOn,
          });
        });

        console.log("User data: ", list);
        //setData(snapshot.val());
        setPatients(list);
      });
  };

  const sendData = () => {
    database()
      .ref("/users/Temperature")
      .set({
        temp: 10.03,
        weight: 1.5,
      })
      .then(() => console.log("Data set."));

    //       #import requests
    // #import json

    // #from firebase import firebase

    // #firebase = firebase.FirebaseApplication('https://nurse-bot-4ed5f-default-rtdb.firebaseio.com/', None)
    // #result = firebase.get('/users/admin', None)
    // #print (result)

    // #results = firebase.post('/users/admin', {'temp':10.23,'weight':2})
    // #print (results)

    database()
      .ref("/users/Analysis")
      .set({
        Current: 20,
        TotPatients: 280,
        Discharge: 260,
        Critical: 6,
      })
      .then(() => console.log("Data set."));

    // database()
    //   .ref('users/Patients')
    //   .push({
    //     id: '003',
    //     name: 'Saditha Udayanga',
    //     status: 'Good',
    //     updateOn: '2021/11/01',
    //   })
    //   .then(data => {
    //     //success callback
    //     console.log('data ', data);
    //   })
    //   .catch(error => {
    //     //error callback
    //     console.log('error ', error);
    //   });
  };

  // modalizeRef.current?.close();

  const HeaderBar = () => (
    <View
      style={{
        flexDirection: "row",
        marginLeft: SIZES.padding,
        marginTop: SIZES.padding * 2,
      }}>
      <View style={{ flex: 1 }}>
        <Text style={{ ...FONTS.h2 }}>
          <Text>Welcome!</Text>
        </Text>
        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>Nov 06 2021</Text>
      </View>

      <View style={{ flexDirection: "row", height: "100%", marginRight: -20 }}>
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

  const PatientSelection = item => {
    modalizeRef.current?.close();
    props.navigation.navigate("PatientDetails");
  };

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
              shadowColor: data?.spo2 > 96 ? "red" : "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: data?.spo2 > 96 ? 0.5 : 0.1,
              shadowRadius: 6.65,
              elevation: 3,
            }}>
            <Text style={{ ...FONTS.h3 }}>Live Data</Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: SIZES.base,
                flex: 1,
              }}>
              <Text style={{ ...FONTS.body4, flex: 1 }}>Pulse Rate</Text>
              <Text style={{ ...FONTS.body4, flex: 1, textAlign: "center" }}>
                :
              </Text>
              <Text style={{ ...FONTS.body4, flex: 1, textAlign: "right" }}>
                {data?.bpm?.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: SIZES.base,
                flex: 1,
              }}>
              <Text style={{ ...FONTS.body4, flex: 1 }}>Oxygen level</Text>
              <Text style={{ ...FONTS.body4, flex: 1, textAlign: "center" }}>
                :
              </Text>
              <Text style={{ ...FONTS.body4, flex: 1, textAlign: "right" }}>
                {data?.spo2?.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: SIZES.base,
                flex: 1,
              }}>
              <Text style={{ ...FONTS.body4, flex: 1 }}>Temperature</Text>
              <Text style={{ ...FONTS.body4, flex: 1, textAlign: "center" }}>
                :
              </Text>
              <Text style={{ ...FONTS.body4, flex: 1, textAlign: "right" }}>
                {temper?.temp?.toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: SIZES.base,
                flex: 1,
              }}>
              <Text style={{ ...FONTS.body4, flex: 1 }}>Weight</Text>
              <Text style={{ ...FONTS.body4, flex: 1, textAlign: "center" }}>
                :
              </Text>
              <Text style={{ ...FONTS.body4, flex: 1, textAlign: "right" }}>
                {temper?.weight?.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 10,
                margin: SIZES.padding,
                padding: SIZES.base,
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
              }}
              onPress={() => {
                modalizeRef.current?.open();
              }}>
              <Text style={{ textAlign: "center", color: COLORS.primary }}>
                Add Patients Details
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 10,
                margin: SIZES.padding,
                padding: SIZES.base,
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
              }}
              onPress={() => {
                props.navigation.navigate("RegisterForm");
              }}>
              <Text style={{ textAlign: "center", color: COLORS.primary }}>
                New Patients Register
              </Text>
            </TouchableOpacity>

          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.padding,
              justifyContent: "space-between",
              marginLeft: SIZES.padding,
              marginRight: SIZES.padding,
            }}>
            <Text style={{ ...FONTS.h3 }}>Patients Analysis</Text>
          </View>

          <View
            style={{
              alignItems: "center",
              marginTop: SIZES.base,
            }}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: SIZES.padding,
                marginRight: SIZES.padding,
              }}>
              <DashboardCards
                colors={COLORS.green}
                Title="Current"
                Amount="20"
                Increment="-10"
                icon={icons.list}
                onPress={() => {
                  alert("Current");
                  props.navigation.navigate("Control");
                }}
              />
              <DashboardCards
                colors={COLORS.red}
                Title="Critical"
                Amount="6"
                Increment=""
                icon={icons.home}
                onPress={() => alert("Critical")}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
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
                onPress={() => alert("Tot. Patients")}
              />
              <DashboardCards
                colors={COLORS.primary}
                Title="Discharge"
                Amount="260"
                Increment="+10"
                icon={icons.settings}
                onPress={() => alert("Discharge")}
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
                  flexDirection: "row",
                  marginTop: SIZES.padding,
                  justifyContent: "space-between",
                  marginLeft: SIZES.padding,
                  marginRight: SIZES.padding,
                }}>
                <Text style={{ ...FONTS.h3 }}>Week Analysis</Text>
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
                        border: "1px solid #CCC",
                      },
                    }}
                    data={chartData}
                    categories={{
                      x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                      y: ["75", "150", "225", "250"],
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
          <Modalize
            ref={modalizeRef}
            withReactModal={true}
            adjustToContentHeight={true}
            disableScrollIfPossible={true}>
            <View
              style={{ marginLeft: SIZES.padding, marginRight: SIZES.padding }}>
              <Text
                style={{
                  ...FONTS.h2,
                  textAlign: "center",
                  marginTop: SIZES.base * 2,
                  marginBottom: SIZES.base,
                }}>
                Patients List
              </Text>
              <View style={{ height: 235 }}>
                <ScrollView>
                  {Patients.map((item, index) => (
                    <View key={index}>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingVertical: SIZES.base,
                        }}
                        onPress={() => PatientSelection(item)}>
                        <Image
                          source={icons.dot}
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.green,
                          }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                          <Text style={{ ...FONTS.h3 }}>{item.name}</Text>
                          <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
                            Patient ID : {item.id}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            height: "100%",
                            alignItems: "center",
                          }}>
                          <Text
                            style={{
                              color:
                                item.type == "B" ? COLORS.green : COLORS.black,
                              ...FONTS.h3,
                            }}>
                            {item.status}
                          </Text>
                          {/* <Image
                          source={icons.right_arrow}
                          style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray,
                          }}
                        /> */}
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          width: "100%",
                          height: 1,
                          backgroundColor: COLORS.lightGray,
                        }}></View>
                    </View>
                  ))}
                </ScrollView>
              </View>

              {/* <View
            style={{
              marginTop: SIZES.padding,
              marginBottom: SIZES.padding * 1.5,
            }}>
            <TextButton
              lable="Patient List"
              onPress={() => {
                modalizeRef.current?.close();
              }}
            />
          </View> */}
            </View>
          </Modalize>
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
    shadowColor: "#000",
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
