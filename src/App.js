import { Provider } from "react-redux";
// import ShoppingCart from "./components/ShoppingCart";
import Login from "./pages/Login";
import ShoppingCart from "./pages/ShoppingCart";
import Payment from "./components/Payment";
import Weight from "./components/Weight";
import "./App.less";
import store from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "antd/dist/antd.css";
import "./temis.less";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <div>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ShoppingCart />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/weight/:id" element={<Weight />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;
