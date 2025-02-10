import { createStore, combineReducers } from 'redux';
//import { reducer as formReducer } from 'redux-form';
import shopsReducer from './ShopsReducer';

const rootReducer = combineReducers({
  shops: shopsReducer,
//  form: formReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export default store;