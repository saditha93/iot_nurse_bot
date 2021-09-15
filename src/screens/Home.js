import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import database from '@react-native-firebase/database';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    sendData();
    GetData();
  }, []);

  const GetData = () => {
    database()
      .ref('/users/123')
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
        setData(snapshot.val());
      });
  };

  const sendData = () => {
    database()
      .ref('/users/123')
      .set({
        temp: 10.03,
        time: 41,
        name: 'Sadeep',
      })
      .then(() => console.log('Data set.'));
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>
        {data?.name} {data?.temp}
      </Text>
    </View>
  );
};

export default Home;
