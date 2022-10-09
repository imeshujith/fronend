import React, { FC, useState } from "react";
import { Button, Col, Form, Input, InputProps, message, Row } from "antd";

const layout = {
  labelCol: { md: { span: 6 }, sm: { span: 24 }, xs: { span: 24 } },
  wrapperCol: { md: { span: 10 }, sm: { span: 24 }, xs: { span: 24 } },
};

const SearchBoxForm: FC = () => {
  const [form] = Form.useForm();
  const [filterValues, setFilterValues]: any = useState();

  const onFinish = () => {
    if (filterValues.from >= filterValues.to) {
      message.error(
        "Invalid range! Salary range From must be greater than to To value"
      );
      return false;
    }
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
                  from: event.target.value.trim(),
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
                  to: event.target.value.trim(),
                });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={18}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBoxForm;
