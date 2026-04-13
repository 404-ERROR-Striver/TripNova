import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export function HelloWave() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(25, { duration: 400 }),
      4,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.Text
      style={[
        {
          fontSize: 50,      // 🔥 increased size
          lineHeight: 60,    // 🔥 adjusted height
          marginTop: -10,    // 🔥 spacing tweak
        },
        animatedStyle,
      ]}
    >
      👋
    </Animated.Text>
  );
}