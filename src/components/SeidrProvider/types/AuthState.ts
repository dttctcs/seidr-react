import { User } from './User';

export interface AuthState {
  user: User;
  loading: boolean;
  error: string;
}
