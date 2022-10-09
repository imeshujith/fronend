import { Button, Form, message, Modal, ModalProps, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Employee } from "../../types/Types";
import { uploadEmployees } from "./Api";
import { parse } from "papaparse";

interface Props extends ModalProps {
  dataSource: Array<Employee>;
  setEmployees: (value: Array<Employee>) => void;
  openUploadModal: boolean;
  setOpenUploadModal: (value: boolean) => void;
}

const UploadModal: React.FC<Props> = ({
  dataSource,
  setEmployees,
  openUploadModal,
  setOpenUploadModal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [uploadData, setUploadData] = useState<Array<Employee>>([
    { id: "", login: "", name: "", salary: 0 },
  ]);
  const [form] = Form.useForm();
  const ref = React.useRef();

  useEffect(() => {
    setIsModalOpen(openUploadModal);
  }, [openUploadModal]);

  const dropCommentedRows = (data: Employee[]) => {
    const filterValues = data.filter((element: any) => {
      if (!Object.values(element).some((val: any) => val.charAt(0) === "#")) {
        return element;
      }
    });
    return filterValues;
  };

  const validateEmptyColumns = (data: Employee[]) => {
    return data.some((element: any) =>
      Object.values(element).some((val) => val === null || val === "")
    );
  };

  const findDuplicateIndexColumns = (data: Employee[]) => {
    const uniqueIndexes = new Set(data.map((v) => v.id));
    if (uniqueIndexes.size < data.length) {
      return true;
    }
    return false;
  };

  const findDuplicateLoginColumns = (data: Employee[]) => {
    const uniqueIndexes = new Set(data.map((v) => v.login));
    if (uniqueIndexes.size < data.length) {
      return true;
    }
    return false;
  };

  const changeHandler = (event: any) => {
    if (event.target.files[0].type !== "text/csv") {
      message.error("Invalid file type");
    }
    if (event.target.files[0].size > 2097152) {
      message.error("Maximum file size is 2MB");
    }
    parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: async (results: any) => {
        const response: Array<Employee> = dropCommentedRows(results.data);
        if (validateEmptyColumns(response)) {
          message.error("Validation error. CSV file has empty columns");
          setIsDisable(true);
          event.target.value = null;
          return false;
        }
        if (findDuplicateIndexColumns(response)) {
          message.error("Validation error. CSV file has duplicate ID values");
          setIsDisable(true);
          event.target.value = null;
          return false;
        }
        if (findDuplicateLoginColumns(response)) {
          message.error(
            "Validation error. CSV file has duplicate LOGIN values"
          );
          setIsDisable(true);
          event.target.value = null;
          return false;
        }
        setIsDisable(false);
        setUploadData(response);
      },
    });
  };

  const handleCancel = async () => {
    setOpenUploadModal(false);
    setIsModalOpen(false);
  };

  const onFinish = async () => {
    setConfirmLoading(true);
    const response: any = await uploadEmployees(uploadData);
    setEmployees(response.data);
    setConfirmLoading(false);
    setOpenUploadModal(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Upload your CSV"
        open={isModalOpen}
        footer={
          <Space>
            <Button type="default" onClick={(event) => handleCancel()}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                form.submit();
              }}
              disabled={isDisable}
            >
              Upload
            </Button>
          </Space>
        }
        confirmLoading={confirmLoading}
        destroyOnClose
      >
        <Form onFinish={onFinish} form={form}>
          <Form.Item>
            <input
              type="file"
              name="file"
              accept=".csv"
              style={{ display: "block", margin: "10px auto" }}
              onChange={changeHandler}
              required
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UploadModal;
