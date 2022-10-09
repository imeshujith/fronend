import React, { FC } from "react";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

const MenuComponent: FC<MenuProps> = ({
  theme,
  mode,
  defaultSelectedKeys,
  items,
  ...rest
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Menu
        theme={theme}
        mode={mode}
        defaultSelectedKeys={defaultSelectedKeys}
        items={items}
        onClick={({ key }) => navigate(key)}
      ></Menu>
    </>
  );
};

export default MenuComponent;
