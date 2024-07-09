class fullnameDTO {
  firstname: string;
  lastname: string;
}

export enum UserRole {
  Admin = 'admin',
  Editor = 'editor',
  PayViewer = 'payviewer',
  Viewer = 'viewer',
}

export type UserDTO = {
  fullname: fullnameDTO;
  block: boolean;
  email: string;
  username: string;
  password: string;
  roles: UserRole[];
  sex: string;
};
