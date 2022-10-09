import React, { FC, useEffect, useState } from "react";
import { Skeleton, Card } from "antd";
import { fetchEmployees } from "./Api";
import { Employee } from "../../types/Types";
import TableComponent from "../../components/Table";
import SearchBox from "./SearchBox";

const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState<Array<Employee>>([]);

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
      setIsLoading(false);
    }
  };

  return (
    <Card title="Employee Table" style={{ width: "100%" }}>
      <SearchBox
        dataSource={employees}
        setEmployees={setEmployees}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Skeleton active loading={isLoading}>
        <TableComponent dataSource={employees} />
      </Skeleton>
    </Card>
  );
};

export default Dashboard;
