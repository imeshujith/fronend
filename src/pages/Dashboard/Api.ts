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
