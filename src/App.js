import { Provider } from "react-redux";
import store from "./core/store";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./apps/account/context/AuthContext";
import ProtectedRoute from "./apps/account/context/ProtectedRoute";
import "./App.less";
import Login from "./apps/account/pages/Login";
import "./apps/account/pages/Login.less";
import ShoppingCart from "./apps/pos/pages/ShoppingCart";
import InventoryCart from "./apps/inventory/pages/InventoryCart";
import "./apps/pos/pages/ShoppingCart.less";
import "./components/AppHeader.less";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login/" element={<Login />} />
              <Route
                path="/pos/shopping-cart/"
                element={
                  <ProtectedRoute>
                    <ShoppingCart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pos/inventory-cart/"
                element={
                  <ProtectedRoute>
                    <InventoryCart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  <div>
                    <h2>404 Page not found</h2>
                  </div>
                }
              />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;
