import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { Image } from "react-native";
import { useAuth } from "../services/authService/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import useSpotifySleepTracks from "../hooks/useSpotify";

const COLORS = {
  night: {
    background: "#0d1b2a",
    text: "#ffffff",
    buttonBackground: "rgba(0, 035, 066, 0.7)",
    cardBackground: "rgba(255, 255, 255, 0.2)",
    overlay: "width: 100,  90,1005, 0.5)",
  },
  day: {
    background: "#87CEEB",
    text: "#ffffff",
    buttonBackground: "rgba(70, 130, 180, 0.9)",
    cardBackground: "rgba(255, 255, 255, 0.7)",
    overlay: "rgba(70, 130, 180, 0.5)",
  },
};

const SIZES = {
  padding: 16,
  margin: 12,
  borderRadius: 75,
  fontSize: 24,
  titleFontSize: 48,
  cardPadding: 20,
};

const createStyles = (isNight: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: isNight
        ? COLORS.night.background
        : COLORS.day.background,
    },
    header: {
      alignItems: "center",
      marginTop: 100,
    },
    greeting: {
      fontSize: SIZES.fontSize,
      color: isNight ? COLORS.night.text : COLORS.day.text,
      fontWeight: "bold",
    },
    time: {
      fontSize: SIZES.titleFontSize,
      color: isNight ? COLORS.night.text : COLORS.day.text,
      fontWeight: "bold",
      marginTop: 10,
    },
    astronautContainer: {
      alignItems: "center",
    },
    astronautCircle: {
      width: 150,
      height: 150,
      borderRadius: SIZES.borderRadius,
      backgroundColor: isNight
        ? COLORS.night.cardBackground
        : COLORS.day.cardBackground,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    timer: {
      fontSize: SIZES.fontSize,
      color: isNight ? COLORS.night.text : COLORS.day.text,
    },
    sleepButton: {
      backgroundColor: isNight
        ? COLORS.night.buttonBackground
        : COLORS.day.buttonBackground,
      paddingVertical: SIZES.padding,
      paddingHorizontal: 40,
      borderRadius: 30,
    },
    sleepButtonText: {
      fontSize: 18,
      color: "#ffffff",
      fontWeight: "bold",
    },
    navigationBar: {
      paddingBottom: 30,
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      paddingVertical: 20,
      backgroundColor: isNight
        ? "rgba(0, 0, 0, 0.7)"
        : "rgba(255, 255, 255, 0.7)",
    },
  });

type DashBoardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const SleepTracker = () => {
  const navigation = useNavigation<DashBoardScreenNavigationProp>();
  const { logout } = useAuth();

  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const isNight = time.includes("PM");

  const styles = createStyles(isNight);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={{
        uri: isNight
          ? "https://i.pinimg.com/736x/e7/fd/7f/e7fd7f895a6569fe14b094f0eff5f1ef.jpg"
          : "https://i.pinimg.com/736x/08/45/3f/08453f5f82b8c1ac9dcf2fd26bef8f18.jpg",
      }}
      style={styles.container}
    >
      <StatusBar style={"light"} />
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {isNight ? "Good Night" : "Good Morning"}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View>

      <View style={styles.astronautContainer}>
        <View style={styles.astronautCircle}>
          {isNight ? (
            <Image
              source={require("../../assets/icons/moon.png")}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <Image
              source={require("../../assets/icons/sun.png")}
              style={{ width: 100, height: 100 }}
            />
          )}
        </View>
        <Text style={styles.timer}></Text>
      </View>

      <TouchableOpacity style={styles.sleepButton}>
        <Text style={styles.sleepButtonText}>
          {isNight ? "START SLEEPING" : "START DAY"}
        </Text>
      </TouchableOpacity>

      <View style={styles.navigationBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.replace("Tracks");
          }}
        >
          <MaterialIcons
            name="music-note"
            size={36}
            color={
              isNight
                ? COLORS.day.buttonBackground
                : COLORS.night.buttonBackground
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UserData");
          }}
        >
          <MaterialIcons
            name={isNight ? "nightlight" : "light-mode"}
            size={36}
            color={
              isNight
                ? COLORS.day.buttonBackground
                : COLORS.night.buttonBackground
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
              {
                text: "Cancel",
              },
              {
                text: "Confirm",
                onPress: async () => {
                  try {
                    await logout();
                    navigation.pop(1);
                    navigation.replace("Login");
                  } catch (error) {
                    console.error("Error logging out", error);
                  }
                },
              },
            ]);
          }}
        >
          <MaterialIcons
            name="exit-to-app"
            size={36}
            color={
              isNight
                ? COLORS.day.buttonBackground
                : COLORS.night.buttonBackground
            }
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SleepTracker;
