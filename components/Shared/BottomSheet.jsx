import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("screen");

const BottomSheet = forwardRef(
  (
    {
      children,
      snapPoints = ["25%", "50%", "90%"],
      index = -1,
      enablePanDownToClose = true,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(index >= 0);
    const [currentIndex, setCurrentIndex] = useState(index);
    const [currentHeight, setCurrentHeight] = useState(0);
    const isAnimating = useRef(false);

    const { bottom } = useSafeAreaInsets();
    const opacity = useRef(new Animated.Value(index >= 0 ? 0.5 : 0)).current;
    const translateY = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

    const snapValues = useRef(
      snapPoints.map((point) => {
        if (typeof point === "string" && point.includes("%")) {
          const percentage = parseFloat(point) / 100;
          return WINDOW_HEIGHT - WINDOW_HEIGHT * percentage;
        }
        return WINDOW_HEIGHT - point;
      })
    ).current;

    const close = useCallback(() => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      translateY.flattenOffset();

      const a1 = Animated.spring(translateY, {
        toValue: WINDOW_HEIGHT,
        useNativeDriver: true,
      });

      const a2 = Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      });

      Animated.parallel([a1, a2]).start(() => {
        isAnimating.current = false;
        setVisible(false);
        setCurrentIndex(-1);
      });
    }, [translateY, opacity]);

    const animateToSnapPoint = useCallback(
      (snapIndex, callback) => {
        if (snapIndex < 0) {
          close();
          return;
        }

        if (isAnimating.current) return;
        isAnimating.current = true;

        translateY.flattenOffset();

        const targetValue = snapValues[snapIndex];
        const newHeight = WINDOW_HEIGHT - snapValues[snapIndex];

        // Batch state updates
        if (!visible) {
          setVisible(true);
        }
        setCurrentIndex(snapIndex);
        setCurrentHeight(newHeight);

        const a1 = Animated.spring(translateY, {
          toValue: targetValue,
          useNativeDriver: true,
          damping: 20,
          stiffness: 90,
        });

        const a2 = Animated.timing(opacity, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        });

        Animated.parallel([a1, a2]).start(() => {
          isAnimating.current = false;
          callback?.();
        });
      },
      [translateY, opacity, snapValues, visible, close]
    );

    const findClosestSnapPoint = useCallback(
      (currentY) => {
        let closest = 0;
        let minDistance = Math.abs(snapValues[0] - currentY);

        snapValues.forEach((value, index) => {
          const distance = Math.abs(value - currentY);
          if (distance < minDistance) {
            minDistance = distance;
            closest = index;
          }
        });

        return closest;
      },
      [snapValues]
    );

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return Math.abs(gestureState.dy) > 5;
        },
        onPanResponderGrant: () => {
          translateY.extractOffset();
        },
        onPanResponderMove: (_, gestureState) => {
          const newValue = gestureState.dy;
          if (newValue < snapValues[snapValues.length - 1]) return;
          translateY.setValue(newValue);
        },
        onPanResponderRelease: (_, gestureState) => {
          const currentY = translateY._value + translateY._offset;
          const velocity = gestureState.vy;

          if (enablePanDownToClose && velocity > 1 && gestureState.dy > 50) {
            close();
            return;
          }

          if (enablePanDownToClose && currentY > WINDOW_HEIGHT * 0.75) {
            close();
            return;
          }

          const closestIndex = findClosestSnapPoint(currentY);
          animateToSnapPoint(closestIndex);
        },
      })
    ).current;

    useImperativeHandle(
      ref,
      () => ({
        expand: () => animateToSnapPoint(snapValues.length - 1),
        collapse: close,
        snapToIndex: (snapIndex) => animateToSnapPoint(snapIndex),
      }),
      [animateToSnapPoint, close, snapValues.length]
    );

    useEffect(() => {
      if (index >= 0 && index < snapValues.length) {
        // Use a microtask to avoid state updates during render
        Promise.resolve().then(() => {
          animateToSnapPoint(index);
        });
      }
    }, []);

    if (!visible) return null;

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={close}>
          <Animated.View style={[styles.overlay, { opacity }]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY }] }]}
        >
          <View style={styles.handleWrapper} {...panResponder.panHandlers}>
            <View style={styles.handle} />
          </View>

          <ScrollView
            style={{ maxHeight: currentHeight }}
            contentContainerStyle={{ paddingBottom: bottom + 200 }}
            showsVerticalScrollIndicator
          >
            <View style={styles.contentWrapper}>{children}</View>
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    zIndex: 9999,
  },
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: "absolute",
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    left: 0,
    top: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 20,
    zIndex: 2,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: "#000000",
    zIndex: 1,
  },
  handleWrapper: {
    paddingVertical: 12,
    alignItems: "center",
  },
  handle: {
    height: 4,
    width: 40,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
  },
  scrollContent: {
    paddingBottom: 200,
  },
  contentWrapper: {
    paddingHorizontal: 24,
  },
});

BottomSheet.displayName = "BottomSheet";

export default BottomSheet;
