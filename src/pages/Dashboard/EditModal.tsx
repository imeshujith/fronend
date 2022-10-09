import { Button, Form, Input, Modal, ModalProps, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Employee } from "../../types/Types";

interface Props extends ModalProps {
  isVisibleEditModal: boolean;
  setIsVisibleEditModal: (value: boolean) => void;
  updateEmployee: Employee | undefined;
  setUpdateEmployee: (value: Employee) => void;
}

const EditModal: React.FC<Props> = ({
  isVisibleEditModal,
  setIsVisibleEditModal,
  updateEmployee,
  setUpdateEmployee,
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

  const onFinish = () => {
    console.log("hi");
  };

  return (
    <>
      <Modal
        title="Update an Employee"
        open={isModalOpen}
        onOk={handleOk}
        footer={
          <Space>
            <Button type="default">Cancel</Button>
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
            <Input />
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
            <Input />
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
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
