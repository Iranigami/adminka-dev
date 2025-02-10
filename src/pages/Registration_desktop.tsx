import React, { useState } from "react"
import reg from '../assets/svg/auth/reg.svg'
import Row from "../comps/layout/Row"
import Col from "../comps/layout/Col"
import logo from '../assets/svg/auth/pay_reg_logo.svg'
import down from '../assets/svg/auth/down.svg'
import bg from '../assets/svg/auth/checkered.png'
import log from '../assets/svg/auth/login_reg.png'
import pass_vis from '../assets/svg/auth/pass_vis.svg'
import pass_invis from '../assets/svg/auth/pass_invis.svg'
import { API_URL } from "../configs/api"
import Spinner from "../comps/spinners/Spinner"
import { useNavigate } from "react-router-dom"
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { UserState, setUser } from '../redux/usersReducer';
import { roles } from "../models/ERoles";
import CookieStorage from '../services/CookieStorage';
import toast, { Toaster } from "react-hot-toast";


export default function Registration_desktop(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [isMenuOpen, openMenu] = useState(false);
    const [language, changeLanguage] = useState("RU");
    const languages = [
        { lang: "FR", name: "Français" },
        { lang: "EN", name: "English" },
        { lang: "ES", name: "Español" },
        { lang: "PT", name: "Português" },
        { lang: "DE", name: "Deutsch" },
        { lang: "IN", name: "Indonesia" },
        { lang: "AR", name: "عرب" },
        { lang: "RU", name: "Русский" }
      ];
      const languageButtons = languages.map((lang) => (
        <div className="">
            <div className={`w-[88px] h-[1px] bg-[#E2E7FB] mx-auto mt-[3px] ${lang.lang=="FR" ? "hidden" : ""}`}/>
            <div key={lang.lang} onClick={() => clickedOnLang(lang.lang)} className={`font-montserrat h-[24px] font-normal text-[14px] ${lang.lang=="FR"? "-mt-[15px] " : "mt-[9px]"} text-center ${language === lang.lang ? 'text-aspide-blue' : 'text-very-black'}`}>
                {lang.name}
            </div>
        </div>
      ));
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordCheckVisible, setIsPasswordCheckVisible] = useState(false);
    const [isPasswordHintVisible, setPasswordHintVisible] = useState(false);    
    const [isPasswordCorrect, setPasswordCorrect] = useState(false);
    const [isPasswordRepeatCorrect, setPasswordRepeatCorrect] = useState(true);
    const [isEmailCorrect, setEmailCorrect] = useState (true);
    const [email, setEmail] = useState ("");
    const [agreement, setAgreed] = useState (false);
    const [password, setPassword] = useState ("");
    const hasUpperCase = /[A-Z]/g.test(password);
    const hasLowerCase = /[a-z]/g.test(password);
    const hasNumber = /\d/.test(password);
    const isLongEnough = password.length >= 8;
    const [pass_repeat, setPassRepeat] = useState ("");
    const [telegram, setTelegram] = useState("");
    const notify = (message) => toast(message);
    const clickedOnLang=(lang: string)=>{
        changeLanguage(lang);
        openMenu(false);
    }
    const toggleCheckboxAgreed=()=>{
        setAgreed((prevState) => !prevState);
    }
    const togglePasswordVisibility=()=>{
        setIsPasswordVisible((prevState) => !prevState);
    }
    const togglePasswordCheckVisibility=()=>{
        setIsPasswordCheckVisible((prevState) => !prevState);
    }
    const checkEmail=()=>{

        // don't remember from where i copied this code, but this works. (literally comment from stackoverflow)
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setEmailCorrect(re.test(email))
    };

    const sendRegPost=()=>{
        const form_data = new FormData();
        form_data.append("email", email);
        form_data.append("password", password);
        form_data.append("telegram", telegram);
        axios.post(`${API_URL}/auth/reg`, form_data,
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
                navigate("/admin/shop_settings")
            })
            .catch(e => {
                console.log(e.code);
                switch (e.code) {
                    case "ERR_BAD_REQUEST":
                      notify("Эта почта уже используется");
                      break;
                    case "ERR_NETWORK":
                      notify("Проверьте подключение к интернету");
                      break;
                    default:
                      notify( "Что-то пошло не так. Попробуйте позже");
                  }
                setLoading(false);
            })
    };
    
    const setUserDataFromResponse = (r: AxiosResponse<any, any>) => {
        dispatch(setUser({
          token: r.data.token,
          role: r.data.role ? parseInt(r.data.role) : roles.CLIENT
        }));
    
        CookieStorage.getInstance().Set('token', r.data.token);
      };


    
    return(
        <Col className={`viewContent`}>
            
            <img className={"absolute left-0 w-full z-0 top-0"} src={bg}/>
            <Row className={"w-full justify-center z-10"}>
            <div className={"w-[640px] h-[694px] justify-center flex mt-[28px]"}>
                <img className={"h-[694px] w-[244px]"} src={reg}/>
                <div className={"justify-center w-[376px] h-[694px] ml-5"}>
                    <div className={"outline outline-1 outline-light-aspide flex h-[50px] w-[376px] justify-center rounded-[13px] bg-very-white"}>
                        <img className={"h-[32px] w-[102px] mt-[9px] ml-[22px]"} src={logo}/>
                        <div 
                            className="flex w-full lg:max-w-sm mt-[5px] ml-[173px] items-center"
                            onClick={()=>openMenu(!isMenuOpen)}
                        >
                            <span className="text-aspide-blue bg-very-white appearance-none font-montserrat font-semibold text-[18px] w-[28px]">
                            {`${language}`}
                            </span>
                            <img className={`w-[7.18px] h-[4.59px] ml-2 ${isMenuOpen ? "-scale-y-100" : ""}`}src={down} alt = {''} />
                        </div>
                    </div>
                    <div className={`z-10 justify-center absolute ml-[260px] w-[105px] h-[299px] bg-very-white rounded-b-[13px] mt-[2px] shadow-menu  ${isMenuOpen ? "" : "hidden"}`}>
                    ${languageButtons}
                </div>
                <div className={"w-[376px] h-[633px] bg-very-white outline outline-1 outline-light-aspide justify-left pl-[22px] rounded-[16px] mt-[10px] pt-4"}>
                    <div className={"flex h-[32px] justify-between items-center"}>
                        <div className={"font-montserrat font-medium text-[28px] text-very-black"}>Регистрация</div>
                        <a href={"/admin/login"} className={"font-montserrat font-medium text-[14px] text-aspide-blue ml-[61px] flex"}>
                            Войти
                            <img className={"ml-2 mr-[23px]"} src={log}/>    
                        </a>
                    </div>
                    <div className={"mt-[15px] font-montserrat font-normal text-[14px] text-[#666775]"}>
                        Адрес электронной почты
                    </div>
                    <input
                        id="email"
                        type="email"
                        className={"outline outline-1 outline-[#A5ACC7] w-[329px] h-[42px] font-montserrat font-normal text-[14px] text-very-black pl-[18px] bg-very-white rounded-[8px] mt-[18px]"}
                        placeholder={"E-mail"}
                        onInput={(event) => {
                            const input = event.target as HTMLInputElement;
                            setEmail(input.value);
                            checkEmail();
                          }}
                        onBlur={()=>checkEmail()}
                    />
                    <div className={`text-aspide-blue font-montserrat font-normal text-[14px] ${isEmailCorrect || email=="" ? 'hidden' : ''}`}>Введите правильный адрес</div>
                    <div className={"mt-[15px] font-montserrat font-normal text-[14px] text-[#666775]"}>
                        Придумайте пароль
                    </div>
                    <input 
                        id="password"
                        onFocus={()=>{setPasswordHintVisible(true);}}
                        onBlur={()=>{
                            setPasswordHintVisible(false)
                            setPasswordCorrect(hasUpperCase && hasLowerCase && hasNumber && isLongEnough);
                        }}
                        onInput={(event) => {
                            const input = event.target as HTMLInputElement;
                            setPassword(input.value);
                            setPasswordCorrect(hasUpperCase && hasLowerCase && hasNumber && isLongEnough);
                          }}
                        type={isPasswordVisible ? "text" : "password"}
                        className={"outline z-10 outline-1 outline-[#A5ACC7] w-[329px] h-[42px] font-montserrat font-normal text-[14px] text-very-black pl-[18px] bg-very-white rounded-[8px] mt-[18px]"}
                        placeholder={"Пароль"}/>
                    <button className="absolute flex items-center px-4 mt-[-32px] ml-[277px] z-1" onClick={togglePasswordVisibility}>
                        <img src={isPasswordVisible ? pass_invis : pass_vis}/>
                     </button>
                     <div className={`bg-[#F4F6FF] rounded-b-[6px] mt-[-3px] h-[54px] w-[329px] absolute z-1 ${isPasswordHintVisible ? '' : 'hidden'}`}>
                        <div className={"flex justify-center mt-[4px] items-center"}>
                            <div className={`${hasUpperCase ? "bg-image-check-white" : ""} outline outline-1 outline-light-aspide w-[10px] h-[10px] rounded-[2px] mt-[7px]`}/>
                            <div className={"font-montserrat text-[10px] text-[#666775] font-normal w-[82px] h-[10px] ml-[6px]"}>заглавные (A-Z)</div>
                            <div className={`${hasLowerCase ? "bg-image-check-white" : ""} outline outline-1 outline-light-aspide w-[10px] h-[10px] rounded-[2px] ml-[58px] mt-[7px]`}/>
                            <div className={"font-montserrat text-[10px] text-[#666775] font-normal w-[82px] h-[10px] ml-[6px]"}>строчные (a-z)</div>
                        </div>
                        <div className={"flex justify-center mt-[7px] items-center"}>
                            <div className={`${hasNumber ? "bg-image-check-white" : ""} outline outline-1 outline-light-aspide w-[10px] h-[10px] rounded-[2px] mt-[7px]`}/>
                            <div className={"font-montserrat text-[10px] text-[#666775] font-normal w-[82px] h-[10px] ml-[6px]"}>цифры (0-9)</div>
                            <div className={`${isLongEnough ? "bg-image-check-white" : ""} outline outline-1 outline-light-aspide w-[10px] h-[10px] rounded-[2px] ml-[58px] mt-[7px]`}/>
                            <div className={"font-montserrat text-[10px] text-[#666775] font-normal w-[82px] h-[10px] ml-[6px]"}>от 8 символов</div>
                        </div>
                     </div>
                    <div className={"mt-[15px] font-montserrat font-normal text-[14px] text-[#666775]"}>
                        Повторите пароль
                    </div>
                    <input
                        id="pass_repeat"
                        type={isPasswordCheckVisible ? "text" : "password"}
                        className={"outline outline-1 outline-[#A5ACC7] w-[329px] h-[42px] font-montserrat font-normal text-[14px] text-very-black pl-[18px] bg-very-white rounded-[8px] mt-[18px]"}
                        placeholder={"Повторите пароль"}
                        onInput={(event) => {
                            const input = event.target as HTMLInputElement;
                            setPassRepeat(input.value);
                          }}
                          onBlur={() => {
                             setPasswordRepeatCorrect(pass_repeat==password)
                          }}
                          />

                    <button className="absolute flex items-center px-4 mt-[-32px] ml-[277px] z-1" onClick={togglePasswordCheckVisibility}>
                        <img src={isPasswordCheckVisible ? pass_invis : pass_vis}/>
                     </button>
                     <div className={`text-aspide-blue font-montserrat font-normal text-[14px] ${isPasswordRepeatCorrect || pass_repeat=="" ? 'hidden' : ''}`}>Пароли не совпадают</div>

                    <div className={"mt-[15px] font-montserrat font-normal text-[14px] text-[#666775]"}>
                        Telegram
                    </div>
                    <input 
                        id="telegram" 
                        onInput={(event) => {
                            const input = event.target as HTMLInputElement;
                            setTelegram(input.value);
                          }}
                        className={"outline outline-1 outline-[#A5ACC7] w-[329px] h-[42px] font-montserrat font-normal text-[14px] text-very-black pl-[18px] bg-very-white rounded-[8px] mt-[18px]"} placeholder={"@username"}/>
                    <button 
                        className={`${isEmailCorrect&&isPasswordCorrect&&email!=""&&password!=""&&telegram!=""&&password==pass_repeat&&agreement ? "text-very-white" : "disabled not-allowed text-light-aspide"} w-[322px] h-[47px] bg-aspide-blue font-montserrat font-semibold text-[16px] justify-center items-center flex rounded mt-10`}
                        onClick={()=>{
                            setLoading(true);
                            sendRegPost();
                        }}
                        >
                        <span className={`${isLoading && "hidden"}`}>Регистрация</span>
                        <Spinner classes={`w-[20px] h-[20px] ${!isLoading && "hidden"}`}/>
                    </button>
                    <Toaster />
                    <div className="flex items-center mb-[30px] mt-[33px]">
                                <input 
                                    id="agreed" 
                                    type="checkbox" 
                                    onChange={toggleCheckboxAgreed}
                                    className="border border-light-aspide appearance-none relative w-[18px] h-[18px] rounded-[3px] text-light-aspide cursor-pointer checked:bg-image-check-white"/>
                                <label className="ml-[9px] font-montserrat text-[10px] font-normal text-very-black w-[309px]">
                                    <span>Подтверждаю согласие с </span>
                                    <a href={"/"} className="text-aspide-blue">политикой конфиденциальности </a>
                                    <span> и </span>
                                    <a href={"/"} className="text-aspide-blue">пользовательским соглашением </a>
                                    <span>сервиса Liberty</span></label>
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