import { ClerkProvider } from "@clerk/clerk-react";
import { Route, Routes, useNavigate } from "react-router";
import Home from "./pages/home";
import AuthContext from "./contexts/auth-context";
import LoadUser from "./layouts/load-user";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Chat from "./pages/chat";
import ProtectedRoutes from "./layouts/protected-routes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
export default function App() {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      afterSignOutUrl={"/"}
      publishableKey={PUBLISHABLE_KEY}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      <AuthContext>
        <LoadUser>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/chat/:id?" element={<Chat />} />
            </Route>
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
          </Routes>
        </LoadUser>
      </AuthContext>
    </ClerkProvider>
  );
}
