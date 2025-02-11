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
  Image,
  Platform,
  SafeAreaView,
  Modal,
  Button,
} from "react-native";
import { useAuth } from "../services/authService/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import DateTimePicker from "@react-native-community/datetimepicker";
import apiservice from "../services/apiservice";

const COLORS = {
  night: {
    background: "#0d1b2a",
    text: "#ffffff",
    buttonBackground: "rgba(0, 35, 66, 0.7)",
    cardBackground: "rgba(255, 255, 255, 0.2)",
  },
  day: {
    background: "#87CEEB",
    text: "#ffffff",
    buttonBackground: "rgba(70, 130, 180, 0.9)",
    cardBackground: "rgba(255, 255, 255, 0.7)",
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
    closeButton: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 1,
      padding: 8,
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
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
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

  // Picker visibility states
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Confirmed dates
  const [startSleep, setStartSleep] = useState<Date | null>(null);
  const [endSleep, setEndSleep] = useState<Date | null>(null);

  // Temporary dates for iOS modal selection
  const [tempStartDate, setTempStartDate] = useState(new Date());
  const [tempEndDate, setTempEndDate] = useState(new Date());

  const isNight = time.includes("PM");
  const styles = createStyles(isNight);

  const { user } = useAuth();

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

  const sendSleepData = async (payload: {
    startSleep: string;
    endSleep: string;
  }) => {
    try {
      await apiservice.post(`/sleep/${user.userId}`, payload);
      Alert.alert("Success", "Sleep data saved successfully");
    } catch (error) {
      console.error("Error sending sleep data", error);
      Alert.alert("Error", "Failed to save sleep data");
    }
  };

  // Android: inline pickers
  const onChangeStart = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      if (event.type === "set" && selectedDate) {
        setStartSleep(selectedDate);
        setShowStartPicker(false);
        setShowEndPicker(true);
      } else {
        setShowStartPicker(false);
      }
    }
  };

  const onChangeEnd = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      if (event.type === "set" && selectedDate) {
        setEndSleep(selectedDate);
        setShowEndPicker(false);
        if (startSleep) {
          const payload = {
            startSleep: startSleep.toISOString(),
            endSleep: selectedDate.toISOString(),
          };
          sendSleepData(payload);
        }
      } else {
        setShowEndPicker(false);
      }
    }
  };

  // iOS: use modals with confirm buttons
  const confirmStartIOS = () => {
    setStartSleep(tempStartDate);
    setShowStartPicker(false);
    setShowEndPicker(true);
  };

  const confirmEndIOS = () => {
    setEndSleep(tempEndDate);
    setShowEndPicker(false);
    if (startSleep) {
      const payload = {
        startSleep: startSleep.toISOString(),
        endSleep: tempEndDate.toISOString(),
      };
      sendSleepData(payload);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: isNight
          ? "https://i.pinimg.com/736x/e7/fd/7f/e7fd7f895a6569fe14b094f0eff5f1ef.jpg"
          : "https://i.pinimg.com/736x/08/45/3f/08453f5f82b8c1ac9dcf2fd26bef8f18.jpg",
      }}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {isNight ? "Good Night" : "Good Morning"}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View>

      <View style={styles.astronautContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chart")}
          style={styles.astronautCircle}
        >
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
        </TouchableOpacity>
      </View>

      {/* Button to start sleep selection */}
      <TouchableOpacity
        style={styles.sleepButton}
        onPress={() => {
          if (Platform.OS === "android") {
            setShowStartPicker(true);
          } else {
            // For iOS, open modal and initialize temporary date
            setTempStartDate(new Date());
            setShowStartPicker(true);
          }
        }}
      >
        <Text style={styles.sleepButtonText}>
          {isNight ? "START SLEEPING" : "START DAY"}
        </Text>
      </TouchableOpacity>

      {/* Android Start Picker */}
      {showStartPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={startSleep || new Date()}
          mode="datetime"
          display="default"
          onChange={onChangeStart}
        />
      )}

      {/* iOS Start Picker Modal */}
      {showStartPicker && Platform.OS === "ios" && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Botón de cerrar agregado */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowStartPicker(false)}
              >
                <MaterialIcons name="close" size={24} color="black" />
              </TouchableOpacity>

              <DateTimePicker
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
                value={tempStartDate}
                mode="datetime"
                display="spinner"
                themeVariant="light"
                onChange={(_, date) => {
                  if (date) setTempStartDate(date);
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#003566",
                  paddingVertical: 12,
                  paddingHorizontal: 25,
                  borderRadius: 25,
                  marginTop: 20,
                }}
                onPress={confirmStartIOS}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                >
                  Confirmar Hora de Inicio
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Android End Picker */}
      {showEndPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={endSleep || new Date()}
          mode="datetime"
          display="default"
          onChange={onChangeEnd}
          themeVariant="dark"
        />
      )}

      {showEndPicker && Platform.OS === "ios" && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Botón de cerrar agregado */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowEndPicker(false)}
              >
                <MaterialIcons name="close" size={24} color="black" />
              </TouchableOpacity>

              <DateTimePicker
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
                value={tempEndDate}
                mode="datetime"
                themeVariant="light"
                display="spinner"
                onChange={(_, date) => {
                  if (date) setTempEndDate(date);
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#003566",
                  paddingVertical: 12,
                  paddingHorizontal: 25,
                  borderRadius: 25,
                  marginTop: 20,
                }}
                onPress={confirmEndIOS}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                >
                  Confirmar Hora de Finalización
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.replace("Tracks")}>
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
        <TouchableOpacity onPress={() => navigation.replace("UserData")}>
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
              { text: "Cancel" },
              {
                text: "Confirm",
                onPress: async () => {
                  try {
                    await logout();
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
