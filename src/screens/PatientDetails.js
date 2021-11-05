import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import database from '@react-native-firebase/database';
import {COLORS, FONTS, SIZES} from '../constants';
import {Modalize} from 'react-native-modalize';

const PatientDetails = () => {
  const modalizeRef = React.useRef(null);
  const [Patients, setPatients] = useState([]);

  const [PatientsDetails, setPatientsDetails] = useState([]);

  useEffect(() => {
    //sendData();
    GetData();
  }, []);

  const GetData = () => {
    database()
      .ref('/users/Patients')
      .on('value', snapshot => {
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

        console.log('User data: ', list);
        //setData(snapshot.val());
        setPatients(list);
      });
  };

  const PatientSelection = item => {
    setPatientsDetails(item);
    alert(JSON.stringify(item));
    modalizeRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginLeft: SIZES.padding,
          marginRight: SIZES.padding,
          marginTop: SIZES.padding,
        }}>
        <Text
          style={{
            ...FONTS.h3,
            textAlign: 'center',
            marginTop: SIZES.base * 3,
            marginBottom: SIZES.base,
          }}>
          Patients List
        </Text>
        <View style={{height: 235}}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: SIZES.base,
                backgroundColor: COLORS.primary,
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
              }}>
              <View
                style={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: COLORS.gray,
                    ...FONTS.body5,
                    flex: 1,
                    color: COLORS.white,
                  }}>
                  Patient ID
                </Text>
                <Text
                  style={{
                    color: COLORS.gray,
                    ...FONTS.body5,
                    flex: 1,
                    textAlign: 'center',
                    color: COLORS.white,
                    color: COLORS.white,
                  }}>
                  Name
                </Text>
                <Text
                  style={{
                    color: COLORS.gray,
                    ...FONTS.body5,
                    flex: 1,
                    textAlign: 'center',
                    color: COLORS.white,
                  }}>
                  Status
                </Text>
                <Text
                  style={{
                    color: COLORS.gray,
                    ...FONTS.body5,
                    flex: 1,
                    textAlign: 'right',
                    color: COLORS.white,
                  }}>
                  Update On
                </Text>
              </View>
            </View>
            {Patients.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => PatientSelection(item)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: SIZES.base,
                    padding: SIZES.padding,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      marginLeft: SIZES.radius,
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: COLORS.gray, ...FONTS.body5, flex: 1}}>
                      {item.id}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.gray,
                        ...FONTS.body5,
                        flex: 1,
                        textAlign: 'center',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.gray,
                        ...FONTS.body5,
                        flex: 1,
                        textAlign: 'center',
                      }}>
                      {item.status}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.gray,
                        ...FONTS.body5,
                        flex: 1,
                        textAlign: 'right',
                      }}>
                      {item.updateOn}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: COLORS.lightGray,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <Modalize
        ref={modalizeRef}
        withReactModal={true}
        adjustToContentHeight={true}
        disableScrollIfPossible={true}>
        <View style={{marginLeft: SIZES.padding, marginRight: SIZES.padding}}>
          <Text
            style={{
              ...FONTS.h3,
              textAlign: 'center',
              marginTop: SIZES.base * 2,
              marginBottom: SIZES.base,
            }}>
            Details
          </Text>

          <View style={{height: 150}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.base,
                flex: 1,
              }}>
              <Text style={{...FONTS.body4, flex: 1}}>Pulse Rate</Text>
              <Text style={{...FONTS.body4, flex: 1, textAlign: 'center'}}>
                :
              </Text>
              <Text style={{...FONTS.body4, flex: 1, textAlign: 'right'}}>
                {PatientsDetails?.status}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.base,
                flex: 1,
              }}>
              <Text style={{...FONTS.body4, flex: 1}}>Oxygen level</Text>
              <Text style={{...FONTS.body4, flex: 1, textAlign: 'center'}}>
                :
              </Text>
              <Text style={{...FONTS.body4, flex: 1, textAlign: 'right'}}>
                eee
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.base,
                flex: 1,
              }}>
              <Text style={{...FONTS.body4, flex: 1}}>Temperature</Text>
              <Text style={{...FONTS.body4, flex: 1, textAlign: 'center'}}>
                :
              </Text>
              <Text style={{...FONTS.body4, flex: 1, textAlign: 'right'}}>
                eee
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.base,
                flex: 1,
                marginBottom: SIZES.padding,
              }}>
              <Text style={{...FONTS.body4, flex: 1}}>Weight</Text>
              <Text style={{...FONTS.body4, flex: 1, textAlign: 'center'}}>
                :
              </Text>
              <Text style={{...FONTS.body4, flex: 1, textAlign: 'right'}}>
                tt
              </Text>
            </View>
          </View>
        </View>
      </Modalize>
    </View>
  );
};

export default PatientDetails;

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
