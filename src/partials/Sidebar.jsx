import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import finances from '../assets/svg/sidebar/finances.svg';
import shop_setts from '../assets/svg/sidebar/shop_setts.svg';
import invoices from '../assets/svg/sidebar/invoices.svg';
import transactions from '../assets/svg/sidebar/transactions.svg';
import shops_manag from '../assets/svg/sidebar/shop_manag.svg';
import payments from '../assets/svg/sidebar/payments.svg';
import configs from '../assets/svg/sidebar/configs.svg';
import logout from '../assets/svg/sidebar/logout.svg';
import tg from '../assets/svg/sidebar/telegram.svg';
import mail from '../assets/svg/sidebar/mail.svg';
import supp from '../assets/svg/sidebar/supp.svg';
import axios from 'axios';
import logo from '../assets/svg/sidebar/logo_sidebar.svg'
import CookieStorage from '../services/CookieStorage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from  'react-redux';

import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()
  const clearToken = () => {
    CookieStorage.getInstance().Set('role', undefined);
    CookieStorage.getInstance().Set('token', undefined);
    navigate('/admin/login');
  };

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');
  const [isAdmin, getRole] = useState(CookieStorage.getInstance().Get('role')==1); //set regular user
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    getRole(user.role==1 || CookieStorage.getInstance().Get('role')==1);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-[257px] lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-[257px] shrink-0 bg-aspide-blue p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
          {/*insert logo img*/}
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <div className={"flex"}>
            <img className={"-mt-10 ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100"} src={logo}/>
            {/* Expand / collapse button */}
            <div className="hidden lg:inline-flex 2xl:hidden absolute -mt-8 lg:ml-[14px] lg:sidebar-expanded:ml-[190px]">
              <div className="">
                <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
                  <span className="sr-only">Expand / collapse sidebar</span>
                  <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                    <path className="text-very-white" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                    <path className="text-very-white" d="M3 23H1V1h2z" />
                  </svg>
                </button>
              </div>
            </div>
              </div>
            
            <h3 className="text-xs uppercase text-very-white font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="mt-[38px] lg:hidden lg:sidebar-expanded:block 2xl:block text-light-aspide text-[12px] font-montserrat font-medium">Pages</span>
            </h3>
            <ul className="mt-3">
              <li className={`w-[240px] h-[49px] px-3 py-2 rounded-l-[10px] mb-0.5 last:mb-0 ${pathname.includes('finances') && 'bg-dark-aspide'}`}>
                <NavLink
                  end
                  to="/admin/finances"
                  className={`block text-slate-200 font-montserrat truncate transition duration-150 ${
                    pathname.includes('finances') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <img src={finances}/>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Finances</span>
                  </div>
                </NavLink>
              </li>
              <li className={`${isAdmin && 'hidden'} w-[240px] h-[49px] px-3 py-2 rounded-l-[10px] mb-0.5 last:mb-0 ${pathname.includes('shop_settings') && 'bg-dark-aspide'}`}>
                <NavLink
                  end
                  to="/admin/shop_settings"
                  className={`block text-slate-200 font-montserrat truncate transition duration-150 ${
                    pathname.includes('shop_settings') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <img src={shop_setts}/>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Shop settings</span>
                  </div>
                </NavLink>
              </li>
              <li className={`w-[240px] h-[49px] px-3 py-2 rounded-l-[10px] mb-0.5 last:mb-0 ${pathname.includes('invoices') && 'bg-dark-aspide'}`}>
                <NavLink
                  end
                  to="/admin/invoices"
                  className={`block text-slate-200 font-montserrat truncate transition duration-150 ${
                    pathname.includes('invoices') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <img src={invoices}/>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Invoices</span>
                  </div>
                </NavLink>
              </li>
              <li className={`${!isAdmin && 'hidden'} w-[240px] h-[49px] px-3 py-2 rounded-l-[10px] mb-0.5 last:mb-0 ${pathname.includes('transactions') && 'bg-dark-aspide'}`}>
                <NavLink
                  end
                  to="/admin/transactions"
                  className={`block text-slate-200 font-montserrat truncate transition duration-150 ${
                    pathname.includes('transactions') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <img src={transactions}/>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Transactions</span>
                  </div>
                </NavLink>
              </li>
              <li className={`${!isAdmin && 'hidden'} w-[240px] h-[49px] px-3 py-2 rounded-l-[10px] mb-0.5 last:mb-0 ${pathname.includes('shops_management') && 'bg-dark-aspide'}`}>
                <NavLink
                  end
                  to="/admin/shops_management"
                  className={`block text-slate-200 font-montserrat truncate transition duration-150 ${
                    pathname.includes('shops_management') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <img src={shops_manag}/>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Shops management</span>
                  </div>
                </NavLink>
              </li>
              <li className={`w-[240px] h-[49px] px-3 py-2 rounded-l-[10px] mb-0.5 last:mb-0 ${pathname.includes('payment') && 'bg-dark-aspide'}`}>
                <NavLink
                  end
                  to="/admin/payment"
                  className={`block text-slate-200 font-montserrat truncate transition duration-150 ${
                    pathname.includes('payment') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <img className={"w-[28px]"} src={payments}/>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Payment</span>
                  </div>
                </NavLink>
              </li>
              <li className={`${!isAdmin && 'hidden'} w-[240px] h-[49px] px-3 py-2 rounded-l-[10px] mb-0.5 last:mb-0 ${pathname.includes('configs') && 'bg-dark-aspide'}`}>
                <NavLink
                  end
                  to="/admin/configs"
                  className={`block text-slate-200 font-montserrat truncate transition duration-150 ${
                    pathname.includes('configs') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <img src={configs}/>
                    <span className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200`}>Configurations</span>
                  </div>
                </NavLink>
              </li>
              <li className={`w-[240px] h-[49px] px-3 py-2 rounded-l-[10px] mb-0.5 last:mb-0`}>
                <button
                  onClick={()=>{
                    clearToken();
                  }}
                  className={`block text-slate-200 font-montserrat truncate transition duration-150 hover:text-white`}
                >
                  <div className="flex items-center">
                    <img src={logout}/>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Log out</span>
                  </div>
                </button>
              </li>
              
            </ul>
            <div className={`${sidebarExpanded ? "" : "hidden"} w-[217px] h-[142px] bg-almost-white rounded-[10px] absolute mx-auto inset-x-0 bottom-0 mb-6 pl-4 pt-4`}>
                  <a href={""} className={"flex items-center"}>
                    <img src={tg}/>
                    <span className={"font-montserrat font-medium text-[14px] text-aspide-blue ml-[11px]"}>Telegram</span>
                  </a>
                  <a href={""} className={"flex items-center mt-[11px]"}>
                    <img src={mail}/>
                    <span className={"font-montserrat font-medium text-[14px] text-aspide-blue ml-[11px]"}>E-Mail</span>
                  </a>
                  <a href={""} className={"flex items-center mt-[11px]"}>
                    <img src={supp}/>
                    <span className={"font-montserrat font-medium text-[14px] text-aspide-blue ml-[11px]"}>Service Support 24/7</span>
                  </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
