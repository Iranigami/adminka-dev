// Layouts
import DefaultLayout from '../layouts/DefaultLayout';
import GuestLayout from '../layouts/GuestLayout';

// Views
import Finances from '../pages/Finances';
import Invoices from '../pages/Invoices';
import Shops from '../pages/Shops';
import Transactions from '../pages/Transactions';
import Configs from '../pages/Configs';
import ShopsManagement from '../pages/ShopsManagement';
import PaymentsManagement from '../pages/PaymentsManagement';
import Login_desktop from '../pages/Login_desktop';
import Registration_desktop from '../pages/Registration_desktop';
import LoginLayout from '../layouts/LoginLayout';
import MobileLayout from '../layouts/MobileLayout';
import Login_mobile from '../pages/Login_mobile';
import LoginLayoutM from '../layouts/LoginLayoutM';
import Registration_mobile from '../pages/Registration_mobile';
import Configs_mobile from '../pages/Configs_mobile';
import Finances_mobile from '../pages/Finances_mobile';
import Shops_mobile from '../pages/Shops_mobile';
import Invoices_mobile from '../pages/Invoices_mobile';

export const routes = [

  {
    path: '/admin/login',
    layout: LoginLayout,
    protected: true,
    component: Login_desktop
  },
  {
    path: '/admin/registration',
    layout: LoginLayout,
    protected: true,
    component: Registration_desktop
  },
  {
    path: '/admin',
    layout: DefaultLayout,
    protected: true,
    component: Finances
  },

  {
    path: '/admin/finances',
    layout: DefaultLayout,
    protected: true,
    component: Finances
  },

  {
    path: '/admin/configs',
    layout: DefaultLayout,
    protected: true,
    component: Configs
  },


  {
    path: '/admin/invoices',
    layout: DefaultLayout,
    protected: true,
    component: Invoices
  },

  {
    path: '/admin/shop_settings',
    layout: DefaultLayout,
    protected: true,
    component: Shops
  },

  {
    path: '/admin/transactions',
    layout: DefaultLayout,
    protected: true,
    component: Transactions
  },

  {
    path: '/admin/shops_management',
    layout: DefaultLayout,
    protected: true,
    component: ShopsManagement
  },

  {
    path: '/admin/payment',
    layout: DefaultLayout,
    protected: true,
    component: PaymentsManagement
  },
];

export const routes_mobile = [

  {
    path: '/admin/login',
    layout: LoginLayoutM,
    protected: true,
    component: Login_mobile
  },
  {
    path: '/admin/registration',
    layout: LoginLayoutM,
    protected: true,
    component: Registration_mobile
  },
  {
    path: '/admin',
    layout: MobileLayout,
    protected: true,
    component: Finances_mobile
  },

  {
    path: '/admin/finances',
    layout: MobileLayout,
    protected: true,
    component: Finances_mobile
  },

  {
    path: '/admin/configs',
    layout: MobileLayout,
    protected: true,
    component: Configs_mobile
  },


  {
    path: '/admin/invoices',
    layout: MobileLayout,
    protected: true,
    component: Invoices_mobile
  },

  {
    path: '/admin/shop_settings',
    layout: MobileLayout,
    protected: true,
    component: Shops_mobile
  },

  {
    path: '/admin/transactions',
    layout: MobileLayout,
    protected: true,
    component: Transactions
  },

  {
    path: '/admin/shops_management',
    layout: MobileLayout,
    protected: true,
    component: ShopsManagement
  },

  {
    path: '/admin/payment',
    layout: MobileLayout,
    protected: true,
    component: PaymentsManagement
  },
];
