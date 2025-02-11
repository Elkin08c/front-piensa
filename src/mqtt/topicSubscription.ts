// hooks/useMqttSubscription.js
import { useEffect } from "react";
import { useMqtt } from "./MqttProvider";

export const useMqttSubscription = (topic) => {
  const { subscribe, unsubscribe, messages } = useMqtt();

  useEffect(() => {
    if (topic) {
      subscribe(topic);
    }

    return () => {
      if (topic) {
        unsubscribe(topic);
      }
    };
  }, [topic]);

  return messages[topic] || null;
};
