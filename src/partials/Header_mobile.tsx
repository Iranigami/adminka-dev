import { useEffect, useState } from 'react';
import UserMenu from '../comps/DropdownProfile';
// @ts-ignore
import logo from '../assets/svg/logotip.svg';
import axios from 'axios';
import { API_URL } from '../configs/api';
import CookieStorage from '../services/CookieStorage';
import { UserState } from '../redux/usersReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import React from 'react';


function Header_mobile() {
  const [isNewsOpen, hideNews] = useState(true)
  const user: UserState = useSelector((state: RootState) => state.user);
  const cookieStorage: CookieStorage = CookieStorage.getInstance();
  const apiToken = user.token || cookieStorage.Get('token');
  const [newsText, setNews] = useState(undefined)

  const getNews= () => {
    axios.get(`${API_URL}/ads`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      },
      withCredentials: false,
      // @ts-ignore
      crossOrigin: false
    })
      .then(r => {
        setNews(r.data['content']);
      })
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => {
      getNews();
      return;
    }
  );

  return (
    <header className="sticky top-0 bg-white rounded-b-[4vw] border-b border-slate-200 dark:border-slate-700 z-30 h-[19vw]">
          <div className={`${!isNewsOpen || newsText==undefined ? "hidden" : ""} flex outline items-center mx-auto outline-1 outline-light-aspide w-[95%] h-[80%] rounded-[6px] mt-[6px] justify-between bg-kinda-gray`}>
            <div className={`font-montserrat font-semibold text-lime-500 text-center w-full`}>{newsText}</div>
            <button
                  className={"w-6 h-6"}
                  onClick={()=> {hideNews(false)}}>
                    <svg width="8.000000" height="8.000000" viewBox="0 0 8 8" fill="none">
                      <path id="Vector" d="M4.88 4L7.87 1C7.95 0.92 8 0.81 8 0.69C8 0.58 7.95 0.47 7.87 0.38L7.6 0.12C7.52 0.04 7.41 0 7.3 0C7.18 0 7.07 0.04 6.99 0.12L4 3.11L1 0.12C0.92 0.04 0.81 0 0.69 0C0.58 0 0.47 0.04 0.39 0.12L0.12 0.38C-0.05 0.56 -0.05 0.83 0.12 1L3.11 4L0.12 6.99C0.04 7.07 0 7.18 0 7.3C0 7.41 0.04 7.52 0.12 7.61L0.39 7.87C0.47 7.95 0.58 8 0.69 8C0.81 8 0.92 7.95 1 7.87L4 4.88L6.99 7.87C7.07 7.95 7.18 8 7.3 8L7.3 8C7.41 8 7.52 7.95 7.6 7.87L7.87 7.61C7.95 7.52 8 7.41 8 7.3C8 7.18 7.95 7.07 7.87 6.99L4.88 4Z" fill="#353942" fill-opacity="1.000000" fill-rule="nonzero"/>
                    </svg>
                </button>
          </div>
    </header>
  );
}

export default Header_mobile;
