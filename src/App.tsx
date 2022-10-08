import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, Drawer, Form, Input, Checkbox } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Col, Row } from "antd";
import TableComponent from "./Table";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload, Card } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { MultipleFileUpload } from "./MultipleFileUpload";
import { parse } from "papaparse";
import { fileObject, fileObjectArray } from "./types/Types";

const { Header, Content, Sider } = Layout;
const { Dragger } = Upload;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [csv, setCsv] = useState(null);

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = () => {};

  const validateFileObject = () => {};

  const dropCommentedRows = (data: fileObject[]) => {
    data.filter((element: any) => {
      if (!Object.values(element).some((val: any) => val.charAt(0) === "#")) {
        return element;
      }
    });
  };

  const validateEmptyColumns = (data: fileObject[]) => {
    return data.some((element: any) =>
      Object.values(element).some((val) => val === null || val === "")
    );
  };

  const findDuplicateIndexColumns = (data: fileObject[]) => {
    const uniqueIndexes = new Set(data.map((v) => v.id));
    if (uniqueIndexes.size < data.length) {
      return true;
    }
  };

  const findDuplicateLoginColumns = (data: fileObject[]) => {
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
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          onClick={() => setOpen(!open)}
        />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: "24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Drawer
              title="Basic Drawer"
              placement="right"
              onClose={onClose}
              open={open}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Drawer>

            <Row>
              <Col span={24}>
                <Card title="Default size card" style={{ width: "100%" }}>
                  <Form onFinish={onFinish}>
                    <Form.Item>
                      <Input
                        type="file"
                        name="file"
                        accept=".csv"
                        style={{ display: "block", margin: "10px auto" }}
                        onChange={changeHandler}
                      />
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>

            <TableComponent />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
