// @ts-ignore
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { roles } from '../models/ERoles';
import { UserState, setUser } from '../redux/usersReducer';
import { API_URL } from '../configs/api';
import CookieStorage from '../services/CookieStorage';
import './auth.css'

export default function Auth() {
  const [isSignUp, setSignUp] = useState (false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user: UserState = useSelector((state: RootState) => state.user);

  const setUserDataFromResponse = (r: AxiosResponse<any, any>) => {
    dispatch(setUser({
      token: r.data.token,
      role: r.data.role ? parseInt(r.data.role) : roles.CLIENT
    }));

    CookieStorage.getInstance().Set('token', r.data.token);
  };

  const reg = () => {
    axios.post(`${API_URL}/auth/reg`,
      {
        email: login,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: false,
        // @ts-ignore
        crossOrigin: true
      }
    )
      .then(r => {
        setUserDataFromResponse(r);

        navigate('/VkvRZFkrQJhIaesE/shops');
      })
      .catch(e => {
        console.log(e);
      })
  };

  const log = () => {
    axios.post(`${API_URL}/auth/login`,
      {
        email: login,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: false,
        // @ts-ignore
        crossOrigin: true
      }
    )
      .then(r => {
        setUserDataFromResponse(r);

        navigate('/VkvRZFkrQJhIaesE/finances');
      })
      .catch(e => {
        console.log(e);
      })
  };

  return (
    <div className={'auth-root w-full'}>
      <div className={'min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6'}>
        <div className={'sm:mx-auto sm:w-full sm:max-w-md'}>
          <h2 className={'mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'}>
            {isSignUp &&
              (
                <span> Sign up to your account </span>
              )
            }
            {!isSignUp &&
              (
                <span> Sign in to your account </span>
              )
            }
          </h2>
          <p className={'mt-2 text-center text-sm leading-5 text-blue-500 max-w'}>
            Or
            <a href="#"
               onClick={() => {
                 setSignUp(!isSignUp)
               }}
               className={'font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150'}>
              {!isSignUp &&
                (
                  <span> &nbsp;create a new account </span>
                )
              }
              {isSignUp &&
                (
                  <span> &nbsp;sign in your account </span>
                )
              }
            </a>
          </p>
        </div>


        <div className={'mt-8 sm:mx-auto sm:w-full sm:max-w-md'}>
          <div className={'bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'}>
            <form>
              <div>
                <label className={'block text-sm font-medium leading-5  text-gray-700'}>
                  Email address
                </label>
                <div className={'mt-1 relative rounded-md shadow-sm'}>
                  <input
                    id="email"
                    name="email"
                    placeholder="user@example.com"
                    type="email"
                    required={true}
                    value={login}
                    autoComplete={'off'}
                    className={'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'}
                    onInput={(event) => {
                      const input = event.target as HTMLInputElement;

                      setLogin(input.value);
                    }}
                  />
                  <div className={'absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'}>
                    <svg className={'h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20'}>
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className={'mt-6'}>
                <label className={'block text-sm font-medium leading-5 text-gray-700'}>
                  Password
                </label>
                <div className={'mt-1 rounded-md shadow-sm'}>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required={true}
                    autoComplete={'off'}
                    value={password}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onInput={(event) => {
                      const input = event.target as HTMLInputElement;

                      setPassword(input.value);
                    }}
                  />
                </div>
              </div>

              <div className={'mt-6 flex items-center justify-between'}>
                <div className={'flex items-center'}>
                  <input
                    id="remember_me"
                    name="remember"
                    type="checkbox"
                    value="1"
                    className={'form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'}
                  />
                  <label htmlFor="remember_me" className={'ml-2 block text-sm leading-5 text-gray-900'}>
                    Remember me
                  </label>
                </div>
              </div>

              <div className={'mt-6'}>
                <span className={'block w-full rounded-md shadow-sm'}>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    onClick={(e) => {
                      e.preventDefault();

                      if (isSignUp) {
                        reg();
                      } else {
                        log();
                      }
                    }}
                  >
                    {isSignUp &&
                      (
                        <span> Sign Up</span>
                      )
                    }
                    {!isSignUp &&
                      (
                        <span> Sign In</span>
                      )
                    }
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
