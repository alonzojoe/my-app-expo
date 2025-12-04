import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";

const QRScanner = ({ onScan, onClose }) => {
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [facing, setFacing] = useState(CameraType?.back);
  const [permission, requestPermission] = useCameraPermissions();

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setScannedData(data);
    onScan(data);
    // Alert.alert("QR Code Scanned: ", data, [
    //   {
    //     text: "OK",
    //     onPress: async () => {
    //       setScanned(false);
    //       await onScan(data);
    //       // onClose();
    //     },
    //   },
    // ]);

    setScanned(false);
    await onScan(data);
  };

  const toggleCameraFacing = () => {
    setFacing((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Loading camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Camera access is required</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Allow Camera Access</Text>
        </TouchableOpacity>

        {Platform.OS === "ios" && (
          <TouchableOpacity
            style={[styles.button, { marginTop: 10, backgroundColor: "#555" }]}
            onPress={() => Linking.openSettings()}
          >
            <Text style={styles.buttonText}>Open Settings</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {scanned ? (
        <View style={styles.content}>
          <Text style={styles.title}></Text>
          {/* <Text style={styles.title}>Or Scan QR Instead</Text> */}
          {/* <View style={styles.resultBox}>
            <Text style={styles.resultText}>{scannedData}</Text>
          </View> */}
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => setScanned(false)}
          >
            <Ionicons name="qr-code" size={24} color="white" />
            <Text style={styles.scanButtonText}>Scan QR</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <CameraView
            style={[styles.camera, { borderRadius: 5 }]}
            facing={facing}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            <View style={styles.overlay}>
              <View style={styles.scanFrame} />
              <Text style={styles.scanText}>Align QR code within frame</Text>
              {/* <TouchableOpacity
                style={styles.flipButton}
                onPress={toggleCameraFacing}
              >
                <Ionicons name="camera-reverse" size={28} color="white" />
              </TouchableOpacity> */}
            </View>
          </CameraView>
          {/* <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setScanned(true);
              onClose();
            }}
          >
            <Ionicons name="close" size={24} color="white" />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity> */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    flex: 1,
    // backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  scanText: {
    color: "white",
    marginVertical: 10,
    fontSize: 16,
  },
  resultBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    width: "90%",
  },
  resultText: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  scanButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  scanButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  cancelButton: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#FF2245",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    textAlign: "center",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  flipButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 50,
  },
});

export default QRScanner;
