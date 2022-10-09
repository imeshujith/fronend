import React from "react";
import { Layout, message } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { parse } from "papaparse";
import { Employee } from "./types/Types";
import HeaderComponent from "./layout/Header";
import SidebarComponent from "./layout/Sidebar";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.headers["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    console.log(request);
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

const { Content } = Layout;

const App: React.FC = () => {
  const dropCommentedRows = (data: Employee[]) =>
    data.filter((element: any) => {
      if (!Object.values(element).some((val: any) => val.charAt(0) === "#")) {
        return element;
      }
    });

  const validateEmptyColumns = (data: Employee[]) => {
    return data.some((element: any) =>
      Object.values(element).some((val) => val === null || val === "")
    );
  };

  const findDuplicateIndexColumns = (data: Employee[]) => {
    const uniqueIndexes = new Set(data.map((v) => v.id));
    if (uniqueIndexes.size < data.length) {
      return true;
    }
  };

  const findDuplicateLoginColumns = (data: Employee[]) => {
    const uniqueIndexes = new Set(data.map((v) => v.login));
    if (uniqueIndexes.size < data.length) {
      return true;
    }
  };

  const changeHandler = (event: any) => {
    if (event.target.files[0].type !== "text/csv") {
      message.error("Invalid file format");
    }
    if (event.target.files[0].size <= 2097152) {
      message.error("Maximum file size is 2MB");
    }
    parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        console.log(
          results.data.some((element: any) =>
            Object.values(element).some((val) => val === null || val === "")
          )
        );

        console.log(
          results.data.filter((element: any) => {
            if (
              !Object.values(element).some((val: any) => val.charAt(0) === "#")
            ) {
              return element;
            }
          })
        );
      },
    });
  };

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
