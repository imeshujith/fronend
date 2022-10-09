import React, { FC } from "react";
import { Button, Table, TableProps } from "antd";
import { Employee } from "../types/Types";
import { ColumnsType } from "antd/es/table";

interface Props extends TableProps<any> {
  dataSource: Employee[];
}

const TableComponent: FC<Props> = ({ dataSource, ...rest }) => {
  const columns: ColumnsType<Employee> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sortDirections: ["ascend", "descend"],
      sorter: (left, right) => left.id.localeCompare(right.id),
    },
    {
      title: "Login",
      dataIndex: "login",
      key: "login",
      sortDirections: ["ascend", "descend"],
      sorter: (left, right) => left.login.localeCompare(right.login),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sortDirections: ["ascend", "descend"],
      sorter: (left, right) => left.login.localeCompare(right.login),
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (_: any, record: any) => (
        <div style={{ textAlign: "right" }}>{record.salary}</div>
      ),
      sortDirections: ["ascend", "descend"],
      sorter: (left, right) => left.salary - right.salary,
      filterMode: "tree",
      filterSearch: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => <Button type="primary">Action</Button>,
    },
  ];

  return (
    <div style={{ overflowX: "auto", overflowY: "auto" }}>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15"],
        }}
      />
    </div>
  );
};

export default TableComponent;
