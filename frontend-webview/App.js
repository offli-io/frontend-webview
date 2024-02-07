import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const webViewRef = React.useRef(null);

  const provideDeviceInformation = () => {
    if (webViewRef?.current) {
      webViewRef?.current?.postMessage("Cauko mnaukoo");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        allowsBackForwardNavigationGestures
        style={styles.webview}
        source={{
          uri: "https://app.offli.eu",
        }}
        onLoadEnd={provideDeviceInformation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  webview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
