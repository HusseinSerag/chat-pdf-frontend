import { useAuth } from "@clerk/clerk-react";
import { ReactNode, createContext, useContext, useEffect } from "react";

type AuthContextValue = {
  isLoaded: boolean;
  userId: string | null | undefined;
  signOut: () => void;
  getToken(): Promise<string | null>;
  isSignedIn: boolean | undefined;
};

interface AuthContextProps {
  children: ReactNode;
}
const Auth = createContext<AuthContextValue>({} as AuthContextValue);

export default function AuthContext({ children }: AuthContextProps) {
  const { isLoaded, userId, signOut, getToken, isSignedIn } = useAuth();
  //const {user} = useUser()
  useEffect(
    function () {
      console.log("changing");
    },
    [isLoaded, userId]
  );
  return (
    <Auth.Provider
      value={{
        isLoaded,
        userId,
        signOut,
        getToken,
        isSignedIn,
      }}
    >
      {children}
    </Auth.Provider>
  );
}

export function useCustomAuth() {
  const context = useContext(Auth);
  if (!context) {
    throw new Error("Cannot use useCustomAuth outside the AuthContext");
  }
  return context;
}
