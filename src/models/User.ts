import { UserState } from '../redux/usersReducer';

export default class User implements UserState {
  public role?: number;
  public email?: string;
  public name?: string;
  public token?: string;

  public constructor(state: UserState) {
    this.role = state.role;
    this.email = state.email;
    this.name = state.name;
    this.token = state.token;
  }
}
