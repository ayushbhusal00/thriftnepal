import { View, Animated, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

const SkeletalLoader = () => {
  const fadeAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.item}>
          <Animated.View style={[styles.image, { opacity: fadeAnim }]} />
          <View style={styles.textContainer}>
            <Animated.View style={[styles.textLine, { opacity: fadeAnim }]} />
            <Animated.View
              style={[styles.textLine, { width: "60%", opacity: fadeAnim }]}
            />
            <Animated.View style={[styles.button, { opacity: fadeAnim }]} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  textLine: {
    height: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 8,
  },
  button: {
    height: 36,
    width: "50%",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
});

export default SkeletalLoader;
