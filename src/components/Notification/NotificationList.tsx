import React from 'react';
import {FlatListProps} from 'react-native';
import notifications from '../../assets/data/notifications';
import NotificationItem from './NotificationItem';
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  withTiming,
} from 'react-native-reanimated';

interface NotificationListProps extends Partial<FlatListProps<any>> {
  footerVisibility: SharedValue<number>;
}

const NotificationsList = ({
  footerVisibility,
  ...flatListProps
}: NotificationListProps) => {
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const y = event.contentOffset.y;

      if (y < 10) {
        // Open the footer
        footerVisibility.value = withTiming(1);
      } else {
        // Close the footer
        footerVisibility.value = withTiming(0);
      }
    },
  });

  return (
    <Animated.FlatList
      {...flatListProps}
      data={notifications}
      renderItem={({item}) => <NotificationItem data={item} />}
      keyExtractor={({id}) => id}
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    />
  );
};

export default NotificationsList;
