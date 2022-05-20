import { Provider } from "react-redux";
// import ShoppingCart from "./components/ShoppingCart";
import ShoppingCart from "./pages/ShoppingCart";
import Payment from "./components/Payment";
import Weight from "./components/Weight";
import "./App.less";
import store from "./store";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Row, Col } from "antd";
// import "antd/dist/antd.css";
import "./temis.less";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Row>
          <Col span={6}>
            <div className="logo" />
          </Col>
          <Col span={18}>
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
          </Col>
        </Row>
        <div>
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
