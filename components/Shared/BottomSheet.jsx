import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import {
  View,
  Animated,
  StatusBar,
  StyleSheet,
  Dimensions,
  PanResponder,
} from "react-native";
import { overlay } from "react-native-paper";

const DRAG_TRESH = 100;

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("screen");

const BOTTOM_SHEET_HEIGHT = {
  min: 54,
  max: WINDOW_HEIGHT * 0.7,
};

const BottomSheet = forwardRef(({ children }, ref) => {
  const [expanded, setExpanded] = useState(false);
  const { current: opacity } = useRef(new Animated.Value(0));

  const { current: translateY } = useRef(
    new Animated.Value(WINDOW_HEIGHT - BOTTOM_SHEET_HEIGHT.min)
  );

  const close = () => {
    translateY.flattenOffset();

    const a1 = Animated.spring(translateY, {
      toValue: WINDOW_HEIGHT - BOTTOM_SHEET_HEIGHT.min,
      useNativeDriver: false,
    });

    const a2 = Animated.timing(opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    });

    const animations = Animated.parallel([a1, a2]);
    animations.start(() => setExpanded(false));
  };

  const open = () => {
    translateY.flattenOffset();
    setExpanded(true);

    const a1 = Animated.spring(translateY, {
      toValue: WINDOW_HEIGHT - BOTTOM_SHEET_HEIGHT.max,
      useNativeDriver: false,
    });

    const a2 = Animated.timing(opacity, {
      toValue: 0.1,
      duration: 100,
      useNativeDriver: false,
    });

    const animations = Animated.parallel([a1, a2]);
    animations.start(() => setExpanded(true));
  };

  const { current: panResponder } = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        translateY.extractOffset();
      },
      onPanResponderMove: Animated.event([null, { dy: translateY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_event, _gesture) => {
        const dy = translateY._value;

        if (Math.abs(dy) < DRAG_TRESH) {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }

        if (dy > 0) {
          close();
        } else {
          open();
        }
      },
    })
  );

  useImperativeHandle(ref, () => ({
    expand: open,
    collapse: close,
  }));

  return (
    <>
      {/* <StatusBar translucent backgroundColor={`transparent`} /> */}
      {expanded && <Animated.View style={[styles.overlay, { opacity }]} />}
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.handleWrapper} {...panResponder.panHandlers}>
          <View style={styles.handle} />
        </View>
        {children}
      </Animated.View>
    </>
  );
});

const styles = StyleSheet.create({
  bottomSheet: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    left: 0,
    position: "absolute",
    width: WINDOW_WIDTH,
    height: BOTTOM_SHEET_HEIGHT.max,
    shadow: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 15.19,
    elevation: 20,
  },

  overlay: {
    top: 0,
    left: 0,
    right: 0,
    elevation: 10,
    position: "absolute",
    backgroundColor: "#000000",
  },

  handle: {
    height: 8,
    width: 100,
    borderRadius: 4,
    alignSelf: "center",
    backgroundColor: "black",
  },

  handleWrapper: {
    marginTop: -24,
    paddingVertical: 24,
  },
});

BottomSheet.displayName = "BottomSheet";

export default BottomSheet;
