import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  ModalProps,
  Row,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { Employee } from "../../types/Types";
import { fetchEmployees } from "./Api";

interface Props extends ModalProps {
  dataSource: Array<Employee>;
  setEmployees: (value: Array<Employee>) => void;
  openFilterModal: boolean;
  setOpenFilterModal: (value: boolean) => void;
}

interface Filter {
  from: number;
  to: number;
}

const FilterModal: React.FC<Props> = ({
  dataSource,
  setEmployees,
  openFilterModal,
  setOpenFilterModal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<Filter>({
    from: 0,
    to: 0,
  });
  const [form] = Form.useForm();

  useEffect(() => {
    setIsModalOpen(openFilterModal);
  }, [openFilterModal]);

  const handleCancel = async () => {
    setConfirmLoading(true);
    const allEmployeesResponse: any = await fetchEmployees();
    setEmployees(allEmployeesResponse.data);
    setConfirmLoading(false);
    setIsModalOpen(false);
    setOpenFilterModal(false);
  };

  const onFinish = () => {
    setConfirmLoading(true);
    if (filterValues?.from >= filterValues?.to) {
      setConfirmLoading(false);
      message.error(
        "Invalid range! Salary range From must be greater than to To value"
      );
      return false;
    }

    const person = dataSource.filter((object) => {
      if (
        filterValues.from <= object.salary &&
        object.salary <= filterValues.to
      ) {
        return object;
      }
    });
    setEmployees(person);
    setConfirmLoading(false);
    setIsModalOpen(false);
    setOpenFilterModal(false);
  };

  return (
    <>
      <Modal
        title="Filter record by salary sange"
        open={isModalOpen}
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
              Search
            </Button>
          </Space>
        }
        confirmLoading={confirmLoading}
      >
        <Form
          colon={false}
          form={form}
          style={{ marginBottom: "20px" }}
          layout={"vertical"}
          onFinish={onFinish}
        >
          <Row>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="from"
                label="Salary Range From"
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: "Please input salary range",
                  },
                  {
                    pattern: /^\d+(\.\d{0,4})?$/,
                    message: "Invalid format must be number or decimal",
                  },
                ]}
              >
                <Input
                  placeholder="0.00"
                  onChange={(event) => {
                    setFilterValues({
                      ...filterValues,
                      from: parseFloat(event.target.value.trim()),
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="to"
                label="Salary Range To"
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: "Please input salary range",
                  },
                  {
                    pattern: /^\d+(\.\d{0,4})?$/,
                    message: "Invalid format must be number or decimal",
                  },
                ]}
              >
                <Input
                  placeholder="0.00"
                  onChange={(event) => {
                    setFilterValues({
                      ...filterValues,
                      to: parseFloat(event.target.value.trim()),
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default FilterModal;
