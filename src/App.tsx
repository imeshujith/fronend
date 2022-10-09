import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderComponent from "./layout/Header";
import SidebarComponent from "./layout/Sidebar";
import "./App.css";
import "./styles/style.less";
import Dashboard from "./pages/Dashboard";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Router>
        <HeaderComponent />
        <Layout>
          <SidebarComponent />
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: "auto",
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </Layout>
  );
};

export default App;
