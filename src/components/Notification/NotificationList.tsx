import React from 'react';
import {FlatList, FlatListProps} from 'react-native';
import notifications from '../../assets/data/notifications';
import NotificationItem from './NotificationItem';

const NotificationsList = (props: Partial<FlatListProps<any>>) => {
  return (
    <FlatList
      {...props}
      data={notifications}
      renderItem={({item}) => <NotificationItem data={item} />}
      keyExtractor={({id}) => id}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default NotificationsList;
