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

export default function Login_mobile() {
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
            <div className={`w-[22vw] h-[0.25vw] bg-[#E2E7FB] mx-auto mt-[1vw] ${lang.lang=="FR" ? "hidden" : ""}`}/>
            <div key={lang.lang} onClick={() => clickedOnLang(lang.lang)} className={`font-montserrat h-[6vw] font-normal text-[3.5vw] ${lang.lang=="FR"? " " : "mt-[2vw]"} text-center ${language === lang.lang ? 'text-aspide-blue' : 'text-very-black'}`}>
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
            <Row className={"w-full justify-center z-10"}>
            <div className={"w-[145.5vw] h-[167vw] justify-center flex mt-[1vw]"}>
                <div className={"justify-center w-[91vw] h-[160vw]"}>
                    <div className={"outline outline-1 outline-light-aspide flex h-[12vw] w-[91.7vw] justify-center rounded-[3.2vw] bg-very-white"}>
                        <img className={"h-[8vw] w-[25vw] mt-[2vw] ml-[5vw]"} src={logo} alt={'logo'} />
                        <div className="flex w-full lg:max-w-sm mt-[1.1vw] ml-[43vw] items-center" onClick={isMenuOpen ? ()=>openMenu(false) : ()=>openMenu(true)}>
                            <span className="text-aspide-blue bg-very-white appearance-none font-montserrat font-semibold text-[4.5vw] w-[7vw]">
                            {`${language}`}
                            </span>
                            <img
                              className={`w-[2vw] h-[1.2vw] ml-[2vw] ${isMenuOpen ? "-scale-y-[25vw]" : ""}`}
                              src={down}
                              alt={'down-img'}
                            />
                        </div>
                    </div>
                    <div className={`z-10 justify-center absolute ml-[64vw] w-[26.25vw] h-[74.75vw] bg-very-white rounded-b-[3.25vw] mt-[0.5vw] shadow-menu  ${isMenuOpen ? "" : "hidden"}`}>
                    {languageButtons}
                </div>                
                <div className={"w-[91.5vw] h-[158.25vw] bg-very-white outline outline-1 outline-light-aspide justify-left pl-[5.5vw] rounded-[4vw] mt-[2.5vw] pt-[12vw]"}>
                    <div className={"flex h-[8vw] justify-between items-center font-montserrat font-medium text-[7vw] text-very-black"}>
                        Вход в аккаунт
                    </div>
                    <div className={"mt-[15.5vw] font-montserrat font-normal text-[3.5vw] text-[#666775]"}>
                        Адрес электронной почты
                    </div>
                    <input 
                        id={"email"}
                        type="email"
                        className={"outline outline-1 outline-[#A5ACC7] w-[82.25vw] h-[10.5vw] font-montserrat font-normal text-[3.5vw] text-very-black pl-[4.5vw] bg-very-white rounded-[2vw] mt-[4.5vw]"}
                        placeholder={"E-mail"}
                        onInput={(event) => {
                            const input = event.target as HTMLInputElement;
                            setEmail(input.value);
                          }}
                    />
                    <div className={"mt-[7vw] font-montserrat font-normal text-[3.5vw] text-[#666775]"}>
                        Пароль от аккаунта
                    </div>
                    <input
                        id="password" 
                        type={isPasswordVisible ? "text" : "password"}
                        className={"outline outline-1 outline-[#A5ACC7] w-[82.25vw] h-[10.5vw] font-montserrat font-normal text-[3.5vw] text-very-black pl-[4.5vw] bg-very-white rounded-[2vw] mt-[4.5vw]"}
                        placeholder={"Пароль"}
                        onInput={(event) => {
                            const input = event.target as HTMLInputElement;
                            setPassword(input.value);
                          }}
                    />
                    <button className="absolute flex items-center px-[1vw] mt-[-7.5vw] ml-[73vw] z-1" onClick={togglePasswordVisibility}>
                        <img src={pass_vis} alt={'pass_visibility'}/>
                     </button>
                    <button
                    onClick={()=>{
                        setLoading(true);
                        sendLoginPost();
                    }}
                        className={`w-[80.5vw] h-[9.5vw] bg-aspide-blue font-montserrat font-semibold text-[4vw] text-very-white justify-center items-center flex rounded-[8vw] mt-[19vw]`}>
                            <span className={`${isLoading && "hidden"}`}>Войти в аккаунт</span>
                            <Spinner classes={`w-[5vw] h-[5vw] ${!isLoading && "hidden"}`}/>
                        
                    </button>
                    <Toaster />
                    <div className={"mt-[16.25vw] flex justify-center"}>
                        <div className={"font-montserrat font-normal text-very-black text-[3.5vw]"}>Нет аккаунта?</div>
                        <a href={"/admin/registration"} className={"font-montserrat font-normal text-aspide-blue text-[3.5vw] ml-[3.25vw] flex"}>Регистрация
                            <img className={"ml-[1vw] w-[6vw]"} src={reg_l} alt={'reg'} />
                        </a>
                    </div>
                    </div>
                </div>
            </div>
            </Row>
            <Row className={"w-full justify-center z-10"}>
                <div className={"w-[87.5vw] h-[6.5vw] mt-[9vw] font-montserrat font-medium text-[3.5vw] text-[#535169] flex"}>
                    Пользовательское соглашение © Liberty - 2024
                </div>
            </Row>
        </Col>
    )
}