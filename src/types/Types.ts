export interface Employee {
  id: string;
  login: string;
  name: string;
  salary: number;
}

export interface Employees {
  data: Employee[];
}
