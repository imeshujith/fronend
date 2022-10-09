import React, {FC} from "react";
import {ClearOutlined, FilterOutlined, UploadOutlined} from "@ant-design/icons";
import {Button, message, Space} from "antd";
import {Employee} from "../../types/Types";
import {fetchEmployees} from "./Api";

interface Props {
  dataSource: Array<Employee>;
  setEmployees: (value: Array<Employee>) => void;
  setOpenFilterModal: (value: boolean) => void;
  setOpenUploadModal: (value: boolean) => void;
  setIsReset: (value: boolean) => void;
}

const TableActions: FC<Props> = ({
                                   dataSource,
                                   setEmployees,
                                   setOpenFilterModal,
                                   setOpenUploadModal,
                                   setIsReset,
                                   ...rest
                                 }) => {
    const handleFilter = async () => {
      try {
        const allEmployeesResponse: any = await fetchEmployees();
        setEmployees(allEmployeesResponse.data);
        setOpenFilterModal(true)
      } catch (e) {
        message.error("Server error please try again later")
      }

    };

    const handleReset = async () => {
      try{
        const allEmployeesResponse: any = await fetchEmployees();
        setEmployees(allEmployeesResponse.data);
        setOpenFilterModal(false)
      } catch (e) {
        message.error("Server error please try again later")
      }
    };

    return (
      <Space style={{marginBottom: "20px", textAlign: 'right'}}>
        <Button type='default' icon=<UploadOutlined/> onClick={() => setOpenUploadModal(true)}>Upload</Button>
        <Button type='default' icon=<FilterOutlined/> onClick={handleFilter}>Filter</Button>
        <Button type='default' icon=<ClearOutlined/> onClick={handleReset}>Clear</Button>
      </Space>
    );
  }
;

export default TableActions;
