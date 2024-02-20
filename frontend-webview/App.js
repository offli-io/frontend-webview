import React from "react";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const webViewRef = React.useRef(null);
  const [mode, setMode] = React.useState();

  const provideDeviceInformation = () => {
    if (webViewRef?.current) {
      webViewRef?.current?.postMessage(
        Platform.OS === "ios" ? "MobileIos" : "MobileAndroid"
      );
    }
  };

  const debugging = `
  const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
  console = {
      log: (log) => consoleLog('log', log),
      debug: (log) => consoleLog('debug', log),
      info: (log) => consoleLog('info', log),
      warn: (log) => consoleLog('warn', log),
      error: (log) => consoleLog('error', log),
    };
`;

  const onMessage = (payload) => {
    // payload.nativeEvent.data contains either 'Dark' or 'Light'
    if (typeof payload.nativeEvent.data === "string") {
      setMode(payload.nativeEvent.data);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        mode === "Dark" ? { backgroundColor: "#1E1E1E" } : {},
      ]}
    >
      <WebView
        ref={webViewRef}
        allowsBackForwardNavigationGestures
        style={styles.webview}
        source={{
          uri: "https://app.offli.eu",
        }}
        mediaCapturePermissionGrantType="grant"
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
        cacheEnabled
        thirdPartyCookiesEnabled
        allowsProtectedMedia
        allowUniversalAccessFromFileURLs
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        onLoadEnd={provideDeviceInformation}
        onMessage={onMessage}
        webviewDebuggingEnabled={true}
        injectedJavaScript={debugging}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  webview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
