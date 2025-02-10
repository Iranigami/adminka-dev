import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes , routes_mobile} from './configs/routes';
import './css/style.css';
import './charts/ChartjsConfig';
import React, { useState } from 'react';

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  return (
    <BrowserRouter>
      <Routes>
        {isMobile ? routes_mobile.map((route, index) => (
            <Route
              key={index + 1}
              path={route.path}
              element={<route.layout><route.component /></route.layout>}
            />
          )) : routes.map((route, index) => (
            <Route
              key={index + 1}
              path={route.path}
              element={<route.layout><route.component /></route.layout>}
            />
          ))}
      </Routes>
    </BrowserRouter>
  )
}
