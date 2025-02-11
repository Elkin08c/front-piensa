import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useLayoutEffect } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { RootStackParamList } from "../../App";

const playlistsId = [
  "6hKunMC88n6bdQcOz9x1Dw",
  "6sPkDFYJLQ1eNNjURZbAoZ",
  "5FI8rn340FgsOB7B8Ic0DZ",
  "6bGe4ekNk4E4h9vVkuItul",
  "0eauB3J6H5sVxKdjgJm12B",
  "0U6T1NcTGlxJpUFbSkCmTw",
  "0UJ5qDOZb1zlJJ23b54bRg",
  "3awrQW1EBtxCody2D4dwg4",
  "37i9dQZF1DWYcDQ1hSjOpY",
  "5oTivqYnXregOTMKlVhWxi",
  "6hKunMC88n6bdQcOz9x1Dw",
  "6sPkDFYJLQ1eNNjURZbAoZ",
  "5FI8rn340FgsOB7B8Ic0DZ",
  "6bGe4ekNk4E4h9vVkuItul",
  "0eauB3J6H5sVxKdjgJm12B",
  "0U6T1NcTGlxJpUFbSkCmTw",
  "0UJ5qDOZb1zlJJ23b54bRg",
  "3awrQW1EBtxCody2D4dwg4",
  "37i9dQZF1DWYcDQ1hSjOpY",
  "5oTivqYnXregOTMKlVhWxi",
  "37i9dQZF1E4BnSRMPVBIP9",
  "6RJLltagJ19zQCkpCPUjjY",
  "0bKjQCSL9hnD3slLkaU83D",
  "37i9dQZF1DX3Ogo9pFvBkY",
  "37i9dQZF1DX2sUQwD7tbmL",
  "37i9dQZF1DX4sWSpwq3LiO",
  "37i9dQZF1DX1s9knjP51Oa",
  "37i9dQZF1DX0SM0LYsmbMT",
  "37i9dQZF1DX9wC1KYhH1e7",
  "37i9dQZF1DX5OJs9uHiL9p",
  "37i9dQZF1DWV0gynK7G6pD",
  "37i9dQZF1DX7gIoKXt0gmx",
  "37i9dQZF1DX9D9L5xRr2Zg",
  "37i9dQZF1DX7F6T3nq2v9H",
  "37i9dQZF1DX3s2d8O39Gd8",
  "37i9dQZF1DWVtWTt6Ha1cX",
  "37i9dQZF1DXbY8pQG2YlRj",
  "37i9dQZF1DX7DT2i8Kdi0H",
  "37i9dQZF1DX1sHnNwN4c2A",
  "37i9dQZF1DX0h0mYBbnL1L",
];

const randomPlaylist = Math.floor(Math.random() * playlistsId.length - 1);

const embedUrl = `https://open.spotify.com/embed/playlist/${playlistsId[randomPlaylist]}?utm_source=generator&theme=1`;
type TracksScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Tracks"
>;

const SpotifyPlaylists = () => {
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
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  webview: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: "#121212",
  },
});

export default SpotifyPlaylists;
