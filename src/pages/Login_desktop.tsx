import { useState } from 'react';
// @ts-ignore
import reg from '../assets/svg/auth/reg.svg';
import Row from '../comps/layout/Row';
import Col from '../comps/layout/Col';
// @ts-ignore
import logo from '../assets/svg/auth/pay_reg_logo.svg';
// @ts-ignore
import down from '../assets/svg/auth/down.svg';
// @ts-ignore
import bg from '../assets/svg/auth/checkered.png';
// @ts-ignore
import reg_l from '../assets/svg/auth/reg_login.png';
// @ts-ignore
import pass_vis from '../assets/svg/auth/pass_vis.svg';
import { API_URL } from '../configs/api';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { roles } from '../models/ERoles';
import { setUser } from '../redux/usersReducer';
import CookieStorage from '../services/CookieStorage';
import Spinner from '../comps/spinners/Spinner';
import toast, { Toaster } from 'react-hot-toast';
import React from 'react';

export default function Login_desktop() {
    const [isLoading, setLoading] = useState(false);
    const notify = (message: string) => toast(message);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMenuOpen, openMenu] = useState(false);
    const [language, changeLanguage] = useState("RU");
    const languages = [     //убрать в отдельную тску
        { lang: "FR", name: "Français" },
        { lang: "EN", name: "English" },
        { lang: "ES", name: "Español" },
        { lang: "PT", name: "Português" },
        { lang: "DE", name: "Deutsch" },
        { lang: "IN", name: "Indonesia" },
        { lang: "AR", name: "عرب" },
        { lang: "RU", name: "Русский" }
      ];
      const clickedOnLang = (lang: string) =>{
        changeLanguage(lang);
        openMenu(false);
      }
      const languageButtons = languages.map((lang) => (
        <div className="">
            <div className={`w-[88px] h-[1px] bg-[#E2E7FB] mx-auto mt-[3px] ${lang.lang=="FR" ? "hidden" : ""}`}/>
            <div key={lang.lang} onClick={() => clickedOnLang(lang.lang)} className={`font-montserrat h-[24px] font-normal text-[14px] ${lang.lang=="FR"? "-mt-[15px] " : "mt-[9px]"} text-center ${language === lang.lang ? 'text-aspide-blue' : 'text-very-black'}`}>
                {lang.name}
            </div>
        </div>
      ));
      const [email, setEmail] = useState ("");
      const [password, setPassword] = useState ("");
      const [isPasswordVisible, setIsPasswordVisible] = useState(false);
      const togglePasswordVisibility = ()=>{
        setIsPasswordVisible((prevState) => !prevState);
      }
      const setUserDataFromResponse = (r: AxiosResponse<any, any>) => {
        dispatch(setUser({
          token: r.data.token,
          role: r.data.role ? parseInt(r.data.role) : roles.CLIENT
        }));
        CookieStorage.getInstance().Set('role', r.data.role);
        CookieStorage.getInstance().Set('token', r.data.token);
      };

      const sendLoginPost=()=>{
        const form_data = new FormData();
        form_data.append("email", email);
        form_data.append("password", password);
        axios.post(`${API_URL}/auth/login`, form_data,
                {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    withCredentials: false,
                    // @ts-ignore
                    crossOrigin: false
                }
            )
            .then(r => {
                setUserDataFromResponse(r);
                setLoading(false);
                navigate('/admin/finances');
            })
            .catch(e => {
                console.log(e.code);
                switch (e.code) {
                    case "ERR_BAD_REQUEST":
                      notify("Неправильный логин или пароль");
                      break;
                    case "ERR_NETWORK":
                      notify("Проверьте введенную почту, а также наличие интернета");
                      break;
                    default:
                      notify( "Что-то пошло не так. Попробуйте позже");
                  }
                setLoading(false);
            })
    };
    return(
        <Col className={`viewContent`}>
            <img className={"absolute left-0 w-full z-0 top-0"} src={bg} alt={'bg'}/>
            <Row className={"w-full justify-center z-10"}>
            <div className={"w-[640px] h-[694px] justify-center flex mt-[28px]"}>
                <img className={"h-[694px] w-[244px]"} src={reg} alt={'reg-img'} />
                <div className={"justify-center w-[376px] h-[694px] ml-5"}>
                    <div className={"outline outline-1 outline-light-aspide flex h-[50px] w-[376px] justify-center rounded-[13px] bg-very-white"}>
                        <img className={"h-[32px] w-[102px] mt-[9px] ml-[22px]"} src={logo} alt={'logo'} />
                        <div className="flex w-full lg:max-w-sm mt-[5px] ml-[173px] items-center" onClick={isMenuOpen ? ()=>openMenu(false) : ()=>openMenu(true)}>
                            <span className="text-aspide-blue bg-very-white appearance-none font-montserrat font-semibold text-[18px] w-[28px]">
                            {`${language}`}
                            </span>
                            <img
                              className={`w-[7.18px] h-[4.59px] ml-2 ${isMenuOpen ? "-scale-y-100" : ""}`}
                              src={down}
                              alt={'down-img'}
                            />
                        </div>
                    </div>
                    <div className={`z-10 justify-center absolute ml-[260px] w-[105px] h-[299px] bg-very-white rounded-b-[13px] mt-[2px] shadow-menu  ${isMenuOpen ? "" : "hidden"}`}>
                    ${languageButtons}
                </div>                
                <div className={"w-[376px] h-[633px] bg-very-white outline outline-1 outline-light-aspide justify-left pl-[22px] rounded-[16px] mt-[10px] pt-12"}>
                    <div className={"flex h-[32px] justify-between items-center font-montserrat font-medium text-[28px] text-very-black"}>
                        Вход в аккаунт
                    </div>
                    <div className={"mt-[62px] font-montserrat font-normal text-[14px] text-[#666775]"}>
                        Адрес электронной почты
                    </div>
                    <input 
                        id={"email"}
                        type="email"
                        className={"outline outline-1 outline-[#A5ACC7] w-[329px] h-[42px] font-montserrat font-normal text-[14px] text-very-black pl-[18px] bg-very-white rounded-[8px] mt-[18px]"}
                        placeholder={"E-mail"}
                        onInput={(event) => {
                            const input = event.target as HTMLInputElement;
                            setEmail(input.value);
                          }}
                    />
                    <div className={"mt-[28px] font-montserrat font-normal text-[14px] text-[#666775]"}>
                        Пароль от аккаунта
                    </div>
                    <input
                        id="password" 
                        type={isPasswordVisible ? "text" : "password"}
                        className={"outline outline-1 outline-[#A5ACC7] w-[329px] h-[42px] font-montserrat font-normal text-[14px] text-very-black pl-[18px] bg-very-white rounded-[8px] mt-[18px]"}
                        placeholder={"Пароль"}
                        onInput={(event) => {
                            const input = event.target as HTMLInputElement;
                            setPassword(input.value);
                          }}
                    />
                    <button className="absolute flex items-center px-4 mt-[-32px] ml-[277px] z-1" onClick={togglePasswordVisibility}>
                        <img src={pass_vis} alt={'pass_visibility'}/>
                     </button>
                    <button
                    onClick={()=>{
                        setLoading(true);
                        sendLoginPost();
                    }}
                        className={`w-[322px] h-[47px] bg-aspide-blue font-montserrat font-semibold text-[16px] text-very-white justify-center items-center flex rounded mt-[76px]`}>
                            <span className={`${isLoading && "hidden"}`}>Войти в аккаунт</span>
                            <Spinner classes={`w-[20px] h-[20px] ${!isLoading && "hidden"}`}/>
                        
                    </button>
                    <Toaster />
                    <div className={"mt-[65px] flex justify-center"}>
                        <div className={"font-montserrat font-normal text-very-black text-[14px]"}>Нет аккаунта?</div>
                        <a href={"/admin/registration"} className={"font-montserrat font-normal text-aspide-blue text-[14px] ml-[13px] flex"}>Регистрация
                            <img className={"ml-1"} src={reg_l} alt={'reg'} />
                        </a>
                    </div>
                    </div>
                </div>
            </div>
            </Row>
            <Row className={"w-full justify-center z-10"}>
                <div className={"w-[350px] h-[26px] mt-[38px] font-montserrat font-medium text-[14px] text-[#535169] flex"}>
                    Пользовательское соглашение © Liberty - 2024
                </div>
            </Row>
        </Col>
    )
}