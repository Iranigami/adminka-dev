import { combineReducers, Reducer } from "redux";
import { userReducer, UserState } from './usersReducer';

export interface RootState {
  user: UserState;
}

export const rootReducer: Reducer<RootState> = combineReducers({
  user: userReducer,
});
