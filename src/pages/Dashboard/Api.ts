import axios, { AxiosResponse } from "axios";
import { Employee } from "../../types/Types";

export const uploadEmployees = (data: Array<Employee>) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post<AxiosResponse>(
        "/api/employees/upload",
        data
      );
      if (response) {
        resolve(response);
      }
    } catch (error) {
      reject();
    }
  });
};

export const fetchEmployees = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get<AxiosResponse>("/api/employees");
      if (response) {
        resolve(response);
      }
    } catch (error) {
      reject();
    }
  });
};

export const updateEmployeeService = (employee: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put<AxiosResponse>(
        `/api/employees/${employee.id}`,
        employee
      );
      if (response) {
        resolve(response);
      }
    } catch (error) {
      reject();
    }
  });
};

export const deleteEmployee = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete<AxiosResponse>(
        `/api/employees/${id}`
      );
      if (response) {
        resolve(response);
      }
    } catch (error) {
      reject();
    }
  });
};
