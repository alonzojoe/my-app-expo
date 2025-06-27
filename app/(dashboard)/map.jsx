import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import WebView from "react-native-webview";
import SafeView from "../../components/SafeView";

const Map = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    error: "",
    httpError: "",
  });

  // Simplified HTML with explicit dimensions
  const mapHtml = `
    <!DOCTYPE html>
    <html style="height: 100%;">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
          }
          .map-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
          iframe {
            width: 100%;
            height: 100%;
            border: 0;
          }
        </style>
      </head>
      <body style="height: 100%;">
        <div class="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3853.245419818105!2d120.68207157511469!3d15.034535785504893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f70c14d9eb5b%3A0xbc011e5cf37c9b51!2sJose%20B.%20Lingad%20Memorial%20General%20Hospital!5e0!3m2!1sen!2sph!4v1750995075934!5m2!1sen!2sph"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </body>
    </html>
  `;

  return (
    <SafeView safe={true} style={[styles.container, { paddingBottom: 0 }]}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {error.error ? <Text style={styles.error}>{error.error}</Text> : null}
      {error.httpError ? (
        <Text style={styles.error}>{error.httpError}</Text>
      ) : null}

      <WebView
        originWhitelist={["*"]}
        source={{ html: mapHtml }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="compatibility"
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        onLoadEnd={() => setLoading(false)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setLoading(false);
          setError({
            error: "WebView error",
            httpError: nativeEvent.description,
          });
          console.log("WebView error: ", nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setLoading(false);
          setError({
            error: "HTTP error",
            httpError: nativeEvent.description,
          });
          console.log("HTTP error: ", nativeEvent);
        }}
        onMessage={(event) => {
          console.log("WebView message: ", event.nativeEvent.data);
        }}
      />
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    height: "100%",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    zIndex: 1000,
  },
  error: {
    color: "red",
    padding: 10,
    textAlign: "center",
    backgroundColor: "#ffeeee",
  },
});

export default Map;
