import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  role: null,
  tokenExpiration: null,
  otp:null,
  forgotPasswordOTP: () => {},
  login: () => {},
  logout: () => {},
});
