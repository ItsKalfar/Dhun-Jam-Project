import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { useGlobalContext } from "./context/GlobalContext";

function App() {
  const { token, user } = useGlobalContext();

  return (
    <Routes>
      <Route
        path="/"
        element={
          token && user?.id ? (
            <Navigate to={`/admin/${user.id}`} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path={`/admin/${user?.id}`}
        element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
