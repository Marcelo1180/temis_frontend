import { Provider } from "react-redux";
import ShoppingCart from "./components/ShoppingCart";
import Payment from "./components/Payment";
import Weight from "./components/Weight";
import "./App.css";
import store from "./store";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Cart</Link>
              </li>
              <li>
                <Link to="/payment">Payment</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<ShoppingCart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/weight/:id" element={<Weight />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
