import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import { RootStackParamList } from "../../App";
const playlistId = "6hKunMC88n6bdQcOz9x1Dw";
const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=1`;

type TracksScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Tracks"
>;

const SpotifyTopTrackScreen = () => {
  const navigation = useNavigation<TracksScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        onPress={() => {
          navigation.preload("Dashboard");
          navigation.navigate("Dashboard");
        }}
        style={{
          alignItems: "flex-start",
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.container}>
        <WebView
          cacheEnabled
          cacheMode="LOAD_CACHE_ONLY"
          source={{ uri: embedUrl }}
          style={styles.webview}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          allowsPictureInPictureMediaPlayback={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
    paddingHorizontal: 10,
  },
  webview: {
    flex: 1,
    borderRadius: 16,
  },
});

export default SpotifyTopTrackScreen;
