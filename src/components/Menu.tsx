import React, { FC } from "react";
import { Menu, MenuProps } from "antd";

const MenuComponent: FC<MenuProps> = ({
  theme,
  mode,
  defaultSelectedKeys,
  items,
  ...rest
}) => {
  return (
    <>
      <Menu
        theme={theme}
        mode={mode}
        defaultSelectedKeys={defaultSelectedKeys}
        items={items}
      />
    </>
  );
};

export default MenuComponent;
