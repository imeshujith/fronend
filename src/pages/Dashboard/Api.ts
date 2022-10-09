import axios, { AxiosResponse } from "axios";

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
