import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./libs/auth/AuthContext";
import { RequireAuth } from "./libs/auth/RequireAuth";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="/login">
              <HomePage />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
