import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { envConfig } from "../config/environment";
import { useMqtt } from "../mqtt/MqttProvider";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

const STORAGE_KEY = "MQTT_READINGS";
const MAX_READINGS = 20;

type UserDataScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const MqttUserDataScreen = () => {
  const [readings, setReadings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { mqttData, subscribeToTopic } = useMqtt();
  const navigation = useNavigation<UserDataScreenNavigationProp>();

  // Load persisted data on mount
  const loadSensorData = async () => {
    try {
      const jsonValue = await SecureStore.getItemAsync(STORAGE_KEY);
      const data = jsonValue ? JSON.parse(jsonValue) : [];

      setReadings(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  // Reload data every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadSensorData();
    }, [])
  );

  useEffect(() => {
    subscribeToTopic(envConfig.MQTT_TOPICS, { qos: envConfig.MQTT_QOS });
    // Also load the data on initial mount
    loadSensorData();
  }, []);

  // Update stored data when a new MQTT message arrives
  useEffect(() => {
    if (mqttData?.message && mqttData?.topic) {
      try {
        const messageStr = mqttData.message.toString();
        const parsedData = JSON.parse(messageStr);
        // Save reading and then reload from SecureStore
        saveReading({
          timestamp: new Date().toISOString(),
          heartRate: parsedData.BPM,
          bloodOxygen: parsedData.SpO2,
        });
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [mqttData]);

  const saveReading = async (newReading) => {
    try {
      const jsonValue = await SecureStore.getItemAsync(STORAGE_KEY);
      const existingReadings = jsonValue ? JSON.parse(jsonValue) : [];
      let updatedReadings = [newReading, ...existingReadings];
      console.log(existingReadings.length);

      if (updatedReadings.length > MAX_READINGS) {
        updatedReadings = updatedReadings.slice(0, MAX_READINGS);
      }
      await SecureStore.setItemAsync(
        STORAGE_KEY,
        JSON.stringify(updatedReadings)
      );
      setReadings(updatedReadings);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.readingContainer}>
      <View style={styles.timeColumn}>
        <Text style={styles.dateText}>
          {new Date(item.timestamp).toLocaleDateString()}
        </Text>
        <Text style={styles.timeText}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </View>
      <View style={styles.dataColumn}>
        <Text style={styles.heartRateText}>♥ {item.heartRate} BPM</Text>
        <Text style={styles.oxygenText}>Ø {item.bloodOxygen}% SpO₂</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {/* Header with goBack icon */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial de Datos</Text>
      </View>

      <FlatList
        data={readings}
        renderItem={renderItem}
        keyExtractor={(item) => item.timestamp}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay datos disponibles</Text>
        }
        contentContainerStyle={
          readings.length === 0 && styles.flatListContainer
        }
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          setReadings([]);
          await SecureStore.deleteItemAsync(STORAGE_KEY);
          setRefreshing(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  headerContainer: {
    backgroundColor: "#2196F3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  readingContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  timeColumn: { flex: 1 },
  dataColumn: { flex: 1, alignItems: "flex-end" },
  dateText: { fontSize: 14, color: "#666" },
  timeText: { fontSize: 14, fontWeight: "bold", color: "#333", marginTop: 4 },
  heartRateText: { fontSize: 16, color: "#e74c3c", marginBottom: 4 },
  oxygenText: { fontSize: 16, color: "#2ecc71" },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 32,
    fontSize: 16,
  },
  flatListContainer: { flex: 1, justifyContent: "center" },
});

export default MqttUserDataScreen;
