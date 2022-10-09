import React, { FC, useEffect, useState } from "react";
import { Skeleton, Card, message } from "antd";
import { fetchEmployees } from "./Api";
import { Employee } from "../../types/Types";
import TableComponent from "./Table";
import TableActions from "./TableActions";

const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await getAllEmployees();
    })();
  }, []);

  const getAllEmployees = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { data }: any = await fetchEmployees();
      setEmployees(data);
      setIsLoading(false);
    } catch (e) {
      message.error("Server error please try again later");
      setIsLoading(false);
    }
  };

  return (
    <Card title="Employee Table" style={{ width: "100%" }}>
      <TableActions
        dataSource={employees}
        setEmployees={setEmployees}
        setOpenFilterModal={setOpenFilterModal}
        setOpenUploadModal={setOpenUploadModal}
        setIsReset={setIsReset}
      />
      <Skeleton active loading={isLoading}>
        <TableComponent
          dataSource={employees}
          setEmployees={setEmployees}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          openFilterModal={openFilterModal}
          setOpenFilterModal={setOpenFilterModal}
          openUploadModal={openUploadModal}
          setOpenUploadModal={setOpenUploadModal}
          isReset={isReset}
          setIsReset={setIsReset}
        />
      </Skeleton>
    </Card>
  );
};

export default Dashboard;
