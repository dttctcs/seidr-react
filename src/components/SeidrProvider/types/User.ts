interface Role {
  id: number;
  name: string;
}

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  active: boolean;

  permissions: string[];
  roles: Role[];

  fail_login_count: number;
  last_login: string;
  created_o: string;
  changed_on: string;
}

export interface UserUpdate {
  firstname: string;
  lastname: string;
}
