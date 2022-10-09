import { Button, Form, Input, message, Modal, ModalProps, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Employee } from "../../types/Types";
import { fetchEmployees, updateEmployeeService } from "./Api";

interface Props extends ModalProps {
  isVisibleEditModal: boolean;
  setIsVisibleEditModal: (value: boolean) => void;
  updateEmployee: Employee | undefined;
  setUpdateEmployee: (value: any) => void;
  dataSource: Employee[];
  setEmployees: (value: Employee[]) => void;
}

const EditModal: React.FC<Props> = ({
  isVisibleEditModal,
  setIsVisibleEditModal,
  updateEmployee,
  setUpdateEmployee,
  dataSource,
  setEmployees,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setIsModalOpen(isVisibleEditModal);
  }, [isVisibleEditModal]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsVisibleEditModal(false);
  };

  const onFinish = async () => {
    const updateResponse: any = await updateEmployeeService(updateEmployee);
    if (updateResponse.status === 204) {
      try {
        const allEmployeesResponse: any = await fetchEmployees();
        setEmployees(allEmployeesResponse.data);
        setIsModalOpen(false);
        message.success("Employee updated successful");
      } catch (e) {
        message.error("Server error please try again later");
      }
    }
  };

  return (
    <>
      <Modal
        title="Update an Employee"
        open={isModalOpen}
        onOk={handleOk}
        footer={
          <Space>
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                form.submit();
              }}
            >
              Update
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={updateEmployee}
          colon={true}
          onFinish={onFinish}
        >
          <Form.Item
            label="Login"
            name="login"
            rules={[
              {
                required: true,
                message: "Login is required",
              },
            ]}
          >
            <Input
              onChange={(event) =>
                setUpdateEmployee({
                  ...updateEmployee,
                  login: event.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input
              onChange={(event) =>
                setUpdateEmployee({
                  ...updateEmployee,
                  name: event.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="Salary"
            name="salary"
            rules={[
              {
                required: true,
                message: "Salary range is required",
              },
              {
                pattern: /^\d+(\.\d{0,4})?$/,
                message: "Invalid format must be number or decimal",
              },
            ]}
          >
            <Input
              onChange={(event) =>
                setUpdateEmployee({
                  ...updateEmployee,
                  salary: event.target.value,
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
