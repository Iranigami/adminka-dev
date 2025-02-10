import { Action } from 'redux';

interface Shop {
  id: number;
  name: string;
  admin_email: string;
  support_email: string;
  description: string;
  url: string;
}

type ShopsAction = Action<string> & { type: 'LOAD_SHOPS' };

const initialState: Shop[] = [
  {
    id: 0,
    name: 'Example Store',
    admin_email: 'admin@example.com',
    support_email: 'support@example.com',
    description: 'This is an example store for demonstration purposes only.',
    url: 'https://example.com',
  },
  // Добавьте дополнительные магазины по необходимости
];

const shopsReducer = (state = initialState, action: ShopsAction) => {
  switch (action.type) {
    case 'LOAD_SHOPS':
      //return action.payload;
    default:
      return state;
  }
};

export default shopsReducer;