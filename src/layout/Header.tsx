import React, { FC } from "react";
import { Layout } from "antd";
import MenuComponent from "../components/Menu";
import { DashboardOutlined } from "@ant-design/icons";

const { Header } = Layout;

const HeaderComponent: FC = () => {
  return (
    <Header className="header">
      <div className="logo" />
      <MenuComponent
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["/"]}
        items={[
          {
            key: `/`,
            icon: <DashboardOutlined />,
            label: `Dashboard`,
          },
        ]}
      />
    </Header>
  );
};

export default HeaderComponent;
