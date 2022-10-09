import React, { FC, useState } from "react";
import { Button, message, Modal, Space, Table, TableProps } from "antd";
import { Employee } from "../../types/Types";
import { ColumnsType } from "antd/es/table";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { deleteEmployee } from "./Api";
import EditModal from "./EditModal";
import FilterModal from "./FilterModal";
import UploadModal from "./UploadModal";

interface Props extends TableProps<any> {
  dataSource: Employee[];
  setEmployees: (value: Employee[]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  openFilterModal: boolean;
  setOpenFilterModal: (value: boolean) => void;
  openUploadModal: boolean;
  setOpenUploadModal: (value: boolean) => void;
  setIsReset: (value: boolean) => void;
  isReset: boolean;
}

const TableComponent: FC<Props> = ({
  dataSource,
  setEmployees,
  isLoading,
  setIsLoading,
  openFilterModal,
  setOpenFilterModal,
  openUploadModal,
  setOpenUploadModal,
  isReset,
  setIsReset,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [updateEmployee, setUpdateEmployee] = useState<Employee>();

  const handleConfirm = () => {};

  const hideModal = () => {
    setOpen(false);
  };

  const confirm = async (id: string) => {
    Modal.confirm({
      title: "Warning!",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure, Do you want to delete this record?",
      okText: "Delete",
      async onOk() {
        setIsLoading(true);
        const response: any = await deleteEmployee(id);
        if (response.status === 204) {
          setEmployees(
            dataSource.filter((element: Employee) => element.id != id)
          );
          setIsLoading(false);
          message.success("Employee deleted successful");
        }
      },
      cancelText: "Cancel",
    });
  };

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
      render: (_: any, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setUpdateEmployee(record);
              setIsEditModalVisible(!isEditModalVisible);
            }}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => confirm(record.id)}
          />
        </Space>
      ),
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
        rowKey="id"
      />
      <Modal
        title="Modal"
        open={open}
        onOk={handleConfirm}
        onCancel={hideModal}
        okText="Delete"
        cancelText="Cancel"
      ></Modal>
      <EditModal
        isVisibleEditModal={isEditModalVisible}
        setIsVisibleEditModal={setIsEditModalVisible}
        updateEmployee={updateEmployee}
        setUpdateEmployee={setUpdateEmployee}
        dataSource={dataSource}
        setEmployees={setEmployees}
      />
      <FilterModal
        dataSource={dataSource}
        setEmployees={setEmployees}
        openFilterModal={openFilterModal}
        setOpenFilterModal={setOpenFilterModal}
      />
      <UploadModal
        dataSource={dataSource}
        setEmployees={setEmployees}
        openUploadModal={openUploadModal}
        setOpenUploadModal={setOpenUploadModal}
      />
    </div>
  );
};

export default TableComponent;
