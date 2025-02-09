import { useState, useEffect } from "react";
import { JwtPayload, LoginRes, RegisterRes, User } from "../../interfaces/Auth";
import apiservice from "../apiservice";
import { tokenservice } from "../../tokenservice";
import { AuthContext } from "./AuthContext";

function parseJwt(token: string): JwtPayload | null {
  try {
    // Separamos el token por puntos y tomamos el segundo elemento (payload)
    const base64Url = token.split(".")[1];
    // Convertimos de Base64URL a Base64
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // Decodificamos la cadena Base64
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error al decodificar el token JWT:", error);
    return null;
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (loginData: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiservice.post<LoginRes>(
        "/auth/login",
        loginData
      );

      const { accessToken, ...userData } = response.data;
      await tokenservice.setToken(accessToken);

      setUser({ ...userData, accessToken });
      setIsAuthenticated(true);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (registerData: {
    name: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      await apiservice.post<RegisterRes>("/auth/register", registerData);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await tokenservice.removeToken();

    setUser(null);
    setIsAuthenticated(false);
  };

  const loadUser = async () => {
    setIsLoading(true);
    try {
      const accessToken = await tokenservice.getToken();
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      const decoded = parseJwt(accessToken);
      if (decoded && decoded.exp * 1000 < Date.now()) {
        await logout();
        return;
      }

      setUser({
        userId: decoded!.id,
        name: decoded!.name,
        email: decoded!.email,
        role: decoded!.role,
        accessToken,
      });
      setIsAuthenticated(true);
    } catch (error) {
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
