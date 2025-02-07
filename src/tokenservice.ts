import * as SecureStore from "expo-secure-store";

export const tokenservice = {
  async setToken(token: string) {
    await SecureStore.setItemAsync("token", token);
  },
  async getToken() {
    return await SecureStore.getItemAsync("token");
  },
  async removeToken() {
    await SecureStore.deleteItemAsync("token");
  },
};
