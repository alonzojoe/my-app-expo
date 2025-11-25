import React, { forwardRef, useImperativeHandle } from "react";
import {
  View,
  Animated,
  StatusBar,
  StyleSheet,
  Dimensions,
  PanResponder,
} from "react-native";

const DRAG_TRESH = 100;

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("screen");

const BOTTOM_SHEET_HEIGHT = {
  min: 54,
  max: WINDOW_HEIGHT * 0.7,
};

const BottomSheet = () => {
  return (
    <View>
      <Text>BottomSheet</Text>
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({});
