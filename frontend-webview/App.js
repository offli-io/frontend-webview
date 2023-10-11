import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        allowsBackForwardNavigationGestures
        style={styles.webview}
        source={{
          uri: "https://offli-dev-frontend-jurajpaska8.cloud.okteto.net",
        }}
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
