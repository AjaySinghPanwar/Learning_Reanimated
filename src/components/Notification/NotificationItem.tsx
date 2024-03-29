import React from 'react';
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import notifications from '../../assets/data/notifications';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

export const NOTIFICATION_HEIGHT = 80;

interface NotificationItemProps {
  data: (typeof notifications)[0];
  index: number;
  listVisibility: SharedValue<number>;
  scrollY: SharedValue<number>;
  footerHeight: SharedValue<number>;
}

const NotificationItem = ({
  data,
  index,
  listVisibility,
  scrollY,
  footerHeight,
}: NotificationItemProps) => {
  const startPosition = NOTIFICATION_HEIGHT * index;
  const {height} = useWindowDimensions();
  const containerHeight = useDerivedValue(
    () => height - 250 - footerHeight.value,
  );

  const animatedStyle = useAnimatedStyle(() => {
    const pos1 = startPosition - containerHeight.value;
    const pos2 = startPosition + NOTIFICATION_HEIGHT - containerHeight.value;

    if (listVisibility.value >= 1) {
      // We are animating the last visible item
      return {
        opacity: interpolate(scrollY.value, [pos1, pos2], [0, 1]),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              [pos1, pos2],
              [-NOTIFICATION_HEIGHT / 2, 0],
              Extrapolation.CLAMP,
            ),
          },
          {
            scale: interpolate(
              scrollY.value,
              [pos1, pos2],
              [0.85, 1],
              Extrapolation.CLAMP,
            ),
          },
        ],
      };
    } else {
      // Animate all items to hide them
      return {
        transform: [
          {
            translateY: interpolate(
              listVisibility.value,
              [0, 1],
              [containerHeight.value - startPosition, 0],
            ),
          },
          {scale: interpolate(listVisibility.value, [0, 1], [0.5, 1])},
        ],
        opacity: listVisibility.value,
      };
    }
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image source={data.icon} style={styles.icon} />
      <View style={{flex: 1}}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {data.subtitle}
        </Text>
      </View>
      <Text style={styles.time}>{data.createdAt} ago</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: NOTIFICATION_HEIGHT - 10,
    backgroundColor: '#00000075',
    margin: 5,
    marginHorizontal: 10,
    padding: 13,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  time: {
    color: 'lightgray',
    fontSize: 12,
    position: 'absolute',
    right: 10,
    top: 10,
  },

  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },

  title: {
    color: 'white',
    fontWeight: '500',
    letterSpacing: 0.2,
  },

  subtitle: {
    color: 'white',
    lineHeight: 18,
    letterSpacing: 0.2,
  },
});

export default NotificationItem;
