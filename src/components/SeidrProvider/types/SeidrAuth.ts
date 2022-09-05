import { User, UserUpdate } from './User';

interface UserCredentials {
  username: string;
  password: string;
}

export type SeidrAuth = {
  user: User;
  loading: boolean;
  error: string;

  signin: (credentials: UserCredentials) => void;
  signout: () => void;
  update: (user: UserUpdate) => void;
  resetPassword: (password: string) => void;
};
