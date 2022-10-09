import React, { FC, useState } from "react";
import { Button, Col, Form, Input, InputProps, message, Row } from "antd";
import { Employee } from "../../types/Types";

const layout = {
  labelCol: { md: { span: 6 }, sm: { span: 24 }, xs: { span: 24 } },
  wrapperCol: { md: { span: 10 }, sm: { span: 24 }, xs: { span: 24 } },
};

interface Props {
  dataSource: Employee[];
  setEmployees: (vale: Employee[]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const SearchBox: FC<Props> = ({
  dataSource,
  setEmployees,
  isLoading,
  setIsLoading,
  ...rest
}) => {
  const [form] = Form.useForm();
  const [filterValues, setFilterValues]: any = useState();

  const onFinish = () => {
    setIsLoading(true);
    if (filterValues.from >= filterValues.to) {
      setIsLoading(false);
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
    setIsLoading(false);
  };

  return (
    <Form
      {...layout}
      colon={false}
      form={form}
      style={{ marginBottom: "20px" }}
      onFinish={onFinish}
      layout={"vertical"}
    >
      <Row>
        <Col xs={24} sm={24} md={18}>
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
                pattern: /^\d{1,5}$|(?=^.{1,5}$)^\d+\.\d{0,2}$/,
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
        <Col xs={24} sm={24} md={18}>
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
                pattern: /^\d{1,5}$|(?=^.{1,5}$)^\d+\.\d{0,2}$/,
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
      <Row>
        <Col xs={24} sm={24} md={18}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
