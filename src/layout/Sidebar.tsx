import React, { FC } from "react";
import MenuComponent from "../components/Menu";
import { DashboardOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";

const SidebarComponent: FC = () => {
  return (
    <Sider width={200} className="site-layout-background">
      <MenuComponent
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: `1`,
            icon: <DashboardOutlined />,
            label: `Dashboard`,
          },
        ]}
      />
    </Sider>
  );
};

export default SidebarComponent;
