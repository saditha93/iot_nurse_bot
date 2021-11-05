import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button, Picker,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

import database from "@react-native-firebase/database";

const RegisterForm = () => {

  const [nic_id, setNicId] = useState();
  const [name, setName] = useState();
  const [address, setAdress] = useState([]);
  const [phone_number, setPhoneNumber] = useState([]);
  const [gender, setGender] = useState([]);
  const [remarks, setRemarks] = useState([]);

  const onChangeNic = (val) => {
    setNicId(val);
  };

  const onChangeName = (val) => {
    setName(val);
  };

  const onChangeAddress = (val) => {
    setAdress(val);
  };

  const onChangePhoneNumber = (val) => {
    setPhoneNumber(val);
  };

  const onChangeGender = (val) => {
    setGender(val);
  };

  const onChangeRemarks = (val) => {
    setRemarks(val);
  };

  const savePatients = async () => {
    try {
      database()
        .ref("/users/Patients")
        .set({
          nic_id: nic_id,
          name: name,
          address: address,
          phone_number: phone_number,
          gender: gender,
          remarks: remarks,
        })
        .then(() => console.log("Data set."));

      console.log("patients successfully signed up!: ");
    } catch (err) {
      console.log("error signing up: ", err);
    }
  };


  return (
    <View style={{ marginTop: SIZES.padding * 2 }}>
      <Text style={{ ...FONTS.h2, textAlign: "center" }}>Add New Patients</Text>
      <Text>NIC ID No</Text>
      <TextInput
        style={styles.input}
        placeholder="NIC Id No"
        autoCapitalize="none"
        placeholderTextColor="grey"
        onChangeText={val => onChangeNic(val)}
      />
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        autoCapitalize="none"
        placeholderTextColor="grey"
        onChangeText={val => onChangeName(val)}
      />
      <Text>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        autoCapitalize="none"
        placeholderTextColor="grey"
        onChangeText={val => onChangeAddress(val)}
      />
      <Text>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        autoCapitalize="none"
        placeholderTextColor="grey"
        onChangeText={val => onChangePhoneNumber(val)}
      />
      <Text>Gender</Text>
      <TextInput
        style={styles.input}
        placeholder="Gender"
        autoCapitalize="none"
        placeholderTextColor="grey"
        onChangeText={val => onChangeGender(val)}
      />
      <Text>Remarks</Text>
      <TextInput
        style={styles.input}
        placeholder="Remarks"
        autoCapitalize="none"
        placeholderTextColor="grey"
        onChangeText={val => onChangeRemarks(val)}
      />
      <Button
        title="Save Patients"
        onPress={savePatients}
      />
    </View>
  );
};
export default RegisterForm;

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
