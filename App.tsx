import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from './src/utils/images';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationsList from './src/components/Notification/NotificationList';
import dayjs, {Dayjs} from 'dayjs';

/* Header Component*/
const ListHeaderComponent = ({date}: {date: Dayjs}) => (
  <View style={styles.header}>
    <IonIcons name="lock-closed" size={20} color="white" />
    <Text style={styles.date}>{date.format('dddd, DD MMMM')}</Text>
    <Text style={styles.time}>{date.format('hh:mm')}</Text>
  </View>
);

const App = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(dayjs());
    }, 1000 * 60);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ImageBackground source={Images.wallpaper_icon} style={styles.container}>
      <StatusBar barStyle={'default'} />

      {/* Notification list */}
      <NotificationsList
        ListHeaderComponent={<ListHeaderComponent date={date} />}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="flashlight" size={24} color="white" />
        </View>

        <View style={styles.icon}>
          <IonIcons name="camera" size={24} color="white" />
        </View>
      </View>
    </ImageBackground>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },

  header: {
    alignItems: 'center',
    height: 250,
    justifyContent: 'center',
  },

  date: {
    fontSize: 20,
    fontWeight: '500',
    color: '#C3FFFE',
    marginTop: 20,
  },

  time: {
    fontSize: 82,
    fontWeight: 'bold',
    color: '#C3FFFE',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 30,
    height: 100,
  },

  icon: {
    backgroundColor: '#00000050',
    width: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
