import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate} from 'react-router-dom';
import finances from '../assets/svg/sidebar/finances.svg';
import shop_setts from '../assets/svg/sidebar/shop_setts.svg';
import invoices from '../assets/svg/sidebar/invoices.svg';
import transactions from '../assets/svg/sidebar/transactions.svg';
import shops_manag from '../assets/svg/sidebar/shop_manag.svg';
import payments from '../assets/svg/sidebar/configs.svg';
import configs from '../assets/svg/sidebar/configs.svg';
import logout from '../assets/svg/sidebar/logout.svg';
import tg from '../assets/svg/sidebar/telegram.svg';
import mail from '../assets/svg/sidebar/mail.svg';
import supp from '../assets/svg/sidebar/supp.svg';
import axios from 'axios';
import logo from '../assets/svg/sidebar/logo_sidebar.svg'
import CookieStorage from '../services/CookieStorage';
import { useSelector } from  'react-redux';


export default function Footer_mobile(){
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()
    const clearToken = () => {
      CookieStorage.getInstance().Set('role', undefined);
      CookieStorage.getInstance().Set('token', undefined);
      navigate('/admin/login');
    };
    const trigger = useRef(null);
  
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
  
  
    const location = useLocation();
    const { pathname } = location;
    return(
        <div className={`z-20 shadow-[0_-1vw_2vw_0vw_rgba(0,0,0,0.3)] bg-[#F4F6FF] w-[100%] h-[13vw] p-[1vw] justify-between items-center gap-[1vw] flex fixed bottom-[2vw]`}>
            <NavLink
             end
             to="/admin/finances"
             className={`${pathname.includes('finances') && "bg-aspide-blue text-very-white rounded-[5vw]"} p-0 pt-1 text-center w-[100%] h-[100%] outline-none justify-center items-center`}>
                <img className={"w-[5vw] mx-auto"} src={finances}/>
                <div className={"text-[2.3vw] mt-[1vw]"}>Finances</div>
            </NavLink>
            <NavLink
             end
             to="/admin/shop_settings"
             className={`${isAdmin && 'hidden'} ${pathname.includes('shop_settings') && "bg-aspide-blue text-very-white rounded-[5vw]"} p-0 pt-1 text-center w-[100%] h-[100%] outline-none justify-center items-center`}>
                <img className={"w-[5vw] mx-auto"} src={shop_setts}/>
                <div className={"text-[2.3vw] mt-[1vw] "}>Shop settings</div>
            </NavLink>
            <NavLink
             end
             to="/admin/invoices"
             className={`${pathname.includes('invoices') && "bg-aspide-blue text-very-white rounded-[5vw]"} p-0 pt-1 text-center w-[100%] h-[100%] outline-none justify-center items-center`}>
                <img className={"w-[5vw] mx-auto"} src={invoices}/>
                <div className={"text-[2.3vw] mt-[1vw]"}>Invoices</div>
            </NavLink>
            <NavLink
             end
             to="/admin/transactions"
             className={`${!isAdmin && 'hidden'} ${pathname.includes('transactions') && "bg-aspide-blue text-very-white rounded-[5vw]"} p-0 pt-1 text-center w-[100%] h-[100%] outline-none justify-center items-center`}>
                <img className={"w-[5vw] mx-auto"} src={transactions}/>
                <div className={"text-[2.3vw] mt-[1vw]"}>Transactions</div>
            </NavLink>
            <NavLink
             end
             to="/admin/shops_management"
             className={`${!isAdmin && 'hidden'} ${pathname.includes('shops_management') && "bg-aspide-blue text-very-white rounded-[5vw]"} p-0 pt-1 text-center w-[100%] h-[100%] outline-none justify-center items-center`}>
                <img className={"w-[5vw] mx-auto"} src={shops_manag}/>
                <div className={"text-[2.3vw] mt-[1vw]"}>Shops management</div>
            </NavLink>
            <NavLink
             end
             to="/admin/payment"
             className={`${pathname.includes('payment') && "bg-aspide-blue text-very-white rounded-[5vw]"} p-0 pt-1 text-center w-[100%] h-[100%] outline-none justify-center items-center`}>
                <img className={"w-[5vw] mx-auto"} src={payments}/>
                <div className={"text-[2.3vw] mt-[1vw]"}>Payment</div>
            </NavLink>
            <NavLink
             end
             to="/admin/configs"
             className={`${pathname.includes('configs') && "bg-aspide-blue text-very-white rounded-[5vw]"} p-0 pt-1 text-center w-[100%] h-[100%] outline-none justify-center items-center`}>
                <img className={"w-[5vw] mx-auto"} src={configs}/>
                <div className={"text-[2.3vw] mt-[1vw]"}>Configurations</div>
            </NavLink>

        </div>
    )
}