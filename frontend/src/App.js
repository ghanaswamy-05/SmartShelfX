import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import ProductManager from "./components/ProductManager";
import EmployeeManager from "./components/EmployeeManager";
import IntroPage from "./components/IntroPage";
import Layout from "./components/Layout"; // ✅ Import layout

const isAuthenticated = () => {
  return localStorage.getItem("authToken");
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  return isAuthenticated()
    ? children
    : <Navigate to="/login" state={{ from: location }} replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* ✅ Wrap all pages with Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <IntroPage />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout>
                <ProductManager />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Layout>
                <EmployeeManager />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;