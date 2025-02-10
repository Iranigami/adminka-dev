import { roles } from '../models/ERoles';

// Actions
const SET_USER = 'users/SET_USER';

// State
export interface UserState {
  role?: number,
  email?: string,
  name?: string,
  token?: string
}

// Action Creators
export const setUser = (user: object) => ({
  type: SET_USER as typeof SET_USER,
  payload: user
});

const initialState: UserState = {
  role: roles.CLIENT
};

// Reducer
export const userReducer = (state = initialState, action: ReturnType<typeof setUser>): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
