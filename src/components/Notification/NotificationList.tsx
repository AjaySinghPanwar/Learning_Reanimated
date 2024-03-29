import React from 'react';
import {FlatListProps} from 'react-native';
import notifications from '../../assets/data/notifications';
import NotificationItem from './NotificationItem';
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface NotificationListProps extends Partial<FlatListProps<any>> {
  footerVisibility: SharedValue<number>;
  footerHeight: SharedValue<number>;
}

const NotificationsList = ({
  footerVisibility,
  footerHeight,
  ...flatListProps
}: NotificationListProps) => {
  const listVisibility = useSharedValue(1);
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const y = event.contentOffset.y;
      scrollY.value = y;

      if (y < 10) {
        // Open the footer
        footerVisibility.value = withTiming(1);
      } else {
        // Close the footer
        footerVisibility.value = withTiming(0);
      }
    },
    onBeginDrag: _event => {
      if (listVisibility.value < 1) {
        listVisibility.value = withSpring(1);
      }
    },
    onEndDrag: event => {
      if (event.contentOffset.y <= 0) {
        listVisibility.value = withTiming(0);
      }
    },
  });

  return (
    <Animated.FlatList
      {...flatListProps}
      data={notifications}
      renderItem={({item, index}) => (
        <NotificationItem
          data={item}
          index={index}
          listVisibility={listVisibility}
          scrollY={scrollY}
          footerHeight={footerHeight}
        />
      )}
      keyExtractor={({id}) => id}
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    />
  );
};

export default NotificationsList;
