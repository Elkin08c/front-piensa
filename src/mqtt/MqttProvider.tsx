import React, { createContext, useContext, useState } from "react";
import { emitStateError } from "../services/mqttService/errorHandler";
import useMqttConnection from "../hooks/useMqttConnection";
import useAppStateBackground from "../hooks/useAppStateReconnect";

const MqttContext = createContext(null);

export const MqttProvider = ({ children }) => {
  const [doMqttConnection, setDoMqttConnection] = useState(true);
  const {
    mqttClient,
    mqttData,
    mqttStatus,
    mqttError,
    setMqttError,
    setMqttStatus,
  } = useMqttConnection(doMqttConnection);

  useAppStateBackground(mqttClient);
  const subscribeToTopic = (topics, { qos = 1 } = {}) => {
    if (!mqttClient) return;

    for (const topic of topics) {
      mqttClient.subscribe(topic, { qos }, (error, granted) => {
        if (error) {
          setMqttStatus("Error");
          emitStateError(setMqttError, "MqttTopic", error);
        }
      });
    }
  };

  return (
    <MqttContext.Provider
      value={{
        mqttClient,
        mqttData,
        mqttStatus,
        mqttError,
        subscribeToTopic,
        setDoMqttConnection,
      }}
    >
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = () => useContext(MqttContext);
