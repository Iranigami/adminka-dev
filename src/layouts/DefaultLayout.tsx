import { useState, useEffect, PropsWithChildren } from 'react'
import { useNavigate } from "react-router-dom"
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header.tsx';
import { UserState } from '../redux/usersReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import CookieStorage from '../services/CookieStorage';
import React from 'react';

type DefaultLayoutProps = {
};

export default function DefaultLayout(props: PropsWithChildren<DefaultLayoutProps>) {
  const navigate = useNavigate();
  const user: UserState = useSelector((state: RootState) => state.user);
  const cookieStorage: CookieStorage = CookieStorage.getInstance();
  const apiToken = user.token || cookieStorage.Get('token') || undefined;

  useEffect(() => {
    if (!apiToken) {
      navigate('/admin/login');
    }
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-very-white bg-image-checkered">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className={'relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'}>

      {/*  Site header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className={'w-full h-full'}>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          { props.children }
          </div>
        </main>
      </div>
    </div>
  );
}
