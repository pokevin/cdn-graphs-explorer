import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import { AuthContextProvider } from "./utils/auth/AuthContext";
import { RequireAuth } from "./utils/auth/RequireAuth";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="/login">
              <p>Logged</p>
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
