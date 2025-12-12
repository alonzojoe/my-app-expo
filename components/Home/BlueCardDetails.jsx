import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import BlueF from "../../assets/image/bluef.jpg";
import QRCode from "react-native-qrcode-svg";
import useBluecardInfo from "../../hooks/features/useBluecardInfo";
import { captureRef } from "react-native-view-shot";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BlueCardDetails = ({
  captureWidth = 353.45,
  captureHeight = 221.09,
  renderAsImage = false,
  className = "",
}) => {
  const viewRef = useRef();
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const PatientInfo = useBluecardInfo();
  const [cardSize, setCardSize] = React.useState({ width: 0, height: 0 });

  const cardWidth = captureWidth;
  const cardHeight = captureHeight;

  const scaleFontSize = (size) => (cardWidth / 335) * size;
  const qrSize = cardWidth * 0.24;

  useEffect(() => {
    if (renderAsImage && imageLoaded && !capturedImage && !isCapturing) {
      setIsCapturing(true);

      setTimeout(() => {
        captureCardAsImage();
      }, 100);
    }
  }, [renderAsImage, imageLoaded, capturedImage]);

  const captureCardAsImage = async () => {
    try {
      if (!viewRef.current) {
        console.error("View ref is not attached");
        setIsCapturing(false);
        return;
      }

      const uri = await captureRef(viewRef.current, {
        format: "png",
        quality: 1,
        result: "tmpfile",
        pixelRatio: 3,
      });

      setCapturedImage(uri);
      setIsCapturing(false);
    } catch (error) {
      console.error("Failed to capture card:", error);
      setIsCapturing(false);
    }
  };

  const handleCardPress = () => {
    setIsFullscreen(true);
    Animated.spring(rotateAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  };

  const handleCloseFullscreen = () => {
    // Reset rotation immediately BEFORE closing
    rotateAnim.setValue(0);
    setIsFullscreen(false);
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  // When rotated 90°, the card's height becomes the visual width
  // So we need to fit the card's height into the screen width
  const fullscreenHeight = SCREEN_WIDTH * 0.85;
  const fullscreenWidth = fullscreenHeight * (captureWidth / captureHeight);

  if (renderAsImage && capturedImage) {
    return (
      <>
        <TouchableOpacity
          style={styles.imgcontainer}
          onPress={handleCardPress}
          activeOpacity={0.9}
        >
          <Image
            source={{ uri: capturedImage }}
            style={[
              {
                width: captureWidth,
                height: captureHeight,
                borderRadius: 12,
                alignSelf: "center",
              },
              className,
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Modal
          visible={isFullscreen}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCloseFullscreen}
          onDismiss={() => rotateAnim.setValue(0)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={handleCloseFullscreen}
          >
            <Animated.View
              style={[
                styles.fullscreenContainer,
                { transform: [{ rotate: rotation }] },
              ]}
            >
              <Image
                source={{ uri: capturedImage }}
                style={{
                  width: fullscreenWidth,
                  height: fullscreenHeight,
                  borderRadius: 12,
                }}
                resizeMode="contain"
              />
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  }

  return (
    <>
      <TouchableOpacity
        style={styles.imgcontainer}
        onPress={handleCardPress}
        activeOpacity={0.9}
      >
        <View
          ref={viewRef}
          collapsable={false}
          style={[
            styles.cardContainer,
            {
              width: cardWidth,
              height: cardHeight,
              opacity: renderAsImage && !capturedImage ? 0 : 1,
            },
          ]}
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setCardSize({
              width: parseFloat(width).toFixed(2),
              height: parseFloat(height).toFixed(2),
            });
          }}
        >
          <Image
            source={BlueF}
            style={styles.cardImage}
            onLoad={() => setImageLoaded(true)}
            onError={(error) => {
              console.error("Image failed to load:", error);
              setImageLoaded(true);
            }}
          />
          <View style={styles.overlayContainer}>
            <QRCode value={PatientInfo.qrcontent} size={80} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.patientno}>{PatientInfo.patientno}</Text>
            <Text style={styles.name}>{PatientInfo.name}</Text>
            <Text style={styles.bday}>
              {PatientInfo.birthdate?.toUpperCase()}
            </Text>
            <Text style={styles.address}>{PatientInfo.address}</Text>
            <Text style={styles.gender}>{PatientInfo.gender}</Text>
            <Text style={styles.civil}>{PatientInfo.civilstatus}</Text>
            <Text style={styles.issued}>DIGITAL COPY ONLY</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isFullscreen}
        transparent={true}
        animationType="none"
        onRequestClose={handleCloseFullscreen}
        onDismiss={() => rotateAnim.setValue(0)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleCloseFullscreen}
        >
          <Animated.View
            style={[
              styles.fullscreenContainer,
              { transform: [{ rotate: rotation }] },
            ]}
          >
            <View
              style={[
                styles.cardContainer,
                {
                  width: fullscreenWidth,
                  height: fullscreenHeight,
                },
              ]}
            >
              <Image source={BlueF} style={styles.cardImage} />
              <View style={styles.overlayContainer}>
                <QRCode value={PatientInfo.qrcontent} size={80} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.patientno}>{PatientInfo.patientno}</Text>
                <Text style={styles.name}>{PatientInfo.name}</Text>
                <Text style={styles.bday}>{PatientInfo.birthdate}</Text>
                <Text style={styles.address}>{PatientInfo.address}</Text>
                <Text style={styles.gender}>{PatientInfo.gender}</Text>
                <Text style={styles.civil}>{PatientInfo.civilstatus}</Text>
                <Text style={styles.issued}>{PatientInfo.dateissued}</Text>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default BlueCardDetails;

const styles = StyleSheet.create({
  imgcontainer: {
    marginTop: 5,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  hiddenCapture: {
    position: "absolute",
    left: -9999,
    opacity: 0,
  },
  cardContainer: {
    position: "relative",
    width: "90%",
    aspectRatio: 1.6,
    alignSelf: "center",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlayContainer: {
    position: "absolute",
    top: "3%",
    right: "2%",
    zIndex: 10,
    backgroundColor: "white",
    padding: 4,
    borderRadius: 4,
  },
  textContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  patientno: {
    position: "absolute",
    bottom: "58%",
    left: "19.5%",
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  name: {
    position: "absolute",
    bottom: "42.5%",
    left: "21%",
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  bday: {
    position: "absolute",
    bottom: "34.5%",
    left: "21%",
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  address: {
    position: "absolute",
    bottom: "26.5%",
    left: "21%",
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  gender: {
    position: "absolute",
    bottom: "18.5%",
    left: "21%",
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  civil: {
    position: "absolute",
    bottom: "10.5%",
    left: "21%",
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  issued: {
    position: "absolute",
    bottom: "1.5%",
    left: "21%",
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
