import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import apiservice from "../services/apiservice";
import { useAuth } from "../services/authService/AuthContext";

const { width } = Dimensions.get("window");

const ChartScreen = () => {
  const [data, setData] = useState([]);
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url =
        user.role === "admin"
          ? "/sleep/metrics/all"
          : `/sleep/metrics/${user.userId}`;
      const response = await apiservice.get(url);
      let fetchedData = response.data;

      fetchedData = fetchedData.filter(
        (item) => item.duration > 0 && item.duration <= 24
      );

      const groupedData = {};
      fetchedData.forEach((item) => {
        const key = item.userId;
        if (!groupedData[key]) {
          groupedData[key] = {
            userName: item.userName,
            totalDuration: 0,
            count: 0,
          };
        }
        groupedData[key].totalDuration += item.duration;
        groupedData[key].count++;
      });

      const chartData = Object.keys(groupedData).map((key) => ({
        id: key,
        label: groupedData[key].userName,
        value: groupedData[key].totalDuration / groupedData[key].count,
        color: "#3498db",
      }));

      setData(chartData);

      const anims = chartData.map(() => new Animated.Value(0));
      setAnimations(anims);

      anims.forEach((anim, index) => {
        Animated.timing(anim, {
          toValue: chartData[index].value * 10,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Métricas de Sueño</Text>
      <View style={styles.chartContainer}>
        {data.map((item, index) => (
          <View key={item.id} style={styles.barContainer}>
            <Text
              style={[
                styles.label,
                user.userId === item.id && {
                  color: "#ffc300",
                  fontWeight: "bold",
                },
              ]}
            >
              {item.label || user.name}
            </Text>
            <View style={styles.barBackground}>
              <Animated.View
                style={[
                  styles.bar,
                  {
                    height: animations[index],
                    backgroundColor: item.color,
                  },
                ]}
              />
            </View>
            <Text
              style={[
                styles.value,
                user.userId === item.id && {
                  color: "#ffc300",
                  fontWeight: "bold",
                },
              ]}
            >
              {item.value.toFixed(2)} hrs
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#26428b",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#26428b",
    padding: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#ffc300",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    width: "100%",
  },
  barContainer: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  label: {
    marginBottom: 8,
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
  },
  barBackground: {
    width: width / 5,
    height: 200,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    borderRadius: 8,
  },
  value: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
  },
});

export default ChartScreen;
