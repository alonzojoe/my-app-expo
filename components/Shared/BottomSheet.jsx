import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
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

    const { bottom } = useSafeAreaInsets();
    const { current: opacity } = useRef(
      new Animated.Value(index >= 0 ? 0.5 : 0)
    );
    const { current: translateY } = useRef(new Animated.Value(WINDOW_HEIGHT));

    const snapValues = snapPoints.map((point) => {
      if (typeof point === "string" && point.includes("%")) {
        const percentage = parseFloat(point) / 100;
        return WINDOW_HEIGHT - WINDOW_HEIGHT * percentage;
      }
      return WINDOW_HEIGHT - point;
    });

    const animateToSnapPoint = (snapIndex, callback) => {
      if (snapIndex < 0) {
        close();
        return;
      }

      translateY.flattenOffset();

      requestAnimationFrame(() => {
        setVisible(true);
        setCurrentIndex(snapIndex);
        setCurrentHeight(WINDOW_HEIGHT - snapValues[snapIndex]); // set height dynamically
      });

      const targetValue = snapValues[snapIndex];

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

      Animated.parallel([a1, a2]).start(callback);
    };

    const close = () => {
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
        requestAnimationFrame(() => {
          setVisible(false);
          setCurrentIndex(-1);
        });
      });
    };

    const findClosestSnapPoint = (currentY) => {
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
    };

    const { current: panResponder } = useRef(
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
    );

    useImperativeHandle(ref, () => ({
      expand: () => animateToSnapPoint(snapValues.length - 1),
      collapse: close,
      snapToIndex: (snapIndex) => animateToSnapPoint(snapIndex),
    }));

    useEffect(() => {
      if (index >= 0 && index < snapValues.length) {
        setTimeout(() => {
          animateToSnapPoint(index);
        }, 0);
      }
    }, []);

    if (!visible) return null;

    return (
      <>
        <TouchableWithoutFeedback onPress={close}>
          <Animated.View style={[styles.overlay, { opacity, zIndex: 999 }]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.bottomSheet,
            { transform: [{ translateY }], zIndex: 1000 },
          ]}
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
      </>
    );
  }
);

const styles = StyleSheet.create({
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
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000000",
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
