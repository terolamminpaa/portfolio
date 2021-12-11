import React from "react";
import { User } from "firebase/auth";

export interface AuthState {
  user: User | null
}

const AuthContext = React.createContext<AuthState>({ user: null });
export default AuthContext;