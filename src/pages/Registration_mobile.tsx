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


export default function Registration_mobile(){
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
            <div className={`w-[22vw] h-[0.25vw] bg-[#E2E7FB] mx-auto mt-[1vw] ${lang.lang=="FR" ? "hidden" : ""}`}/>
            <div key={lang.lang} onClick={() => clickedOnLang(lang.lang)} className={`font-montserrat h-[6vw] font-normal text-[3.5vw] ${lang.lang=="FR"? " " : "mt-[2vw]"} text-center ${language === lang.lang ? 'text-aspide-blue' : 'text-very-black'}`}>
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
            <Row className={"w-full justify-center z-10"}>
            <div className={"w-[160vw] h-[176vw] justify-center flex mt-[1vw]"}>
                <div className={"justify-center w-[94vw] h-[176vw]"}>
                    <div className={"outline outline-1 outline-light-aspide flex h-[11vw] w-[94vw] justify-center rounded-[3.25vw] bg-very-white"}>
                        <img className={"h-[8vw] w-[25.5vw] mt-[2vw] ml-[5.5vw]"} src={logo}/>
                        <div className="flex w-full mt-[1.1vw] ml-[43vw] items-center" onClick={isMenuOpen ? ()=>openMenu(false) : ()=>openMenu(true)}>
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
                    <div className={`z-10 justify-center absolute ml-[64vw] w-[26.25vw] h-[74.75vw] bg-very-white rounded-b-[3vw] mt-[0.5vw] shadow-menu  ${isMenuOpen ? "" : "hidden"}`}>
                    {languageButtons}
                </div>
                <div className={"w-[94vw] h-[153vw] bg-very-white outline outline-1 outline-light-aspide justify-left pl-[5.5vw] rounded-[4vw] mt-[2.5vw] pt-[4vw]"}>
                    <div className={"flex h-[8vw] justify-between items-center"}>
                        <div className={"font-montserrat font-medium text-[7vw] text-very-black"}>Регистрация</div>
                        <a href={"/admin/login"} className={"font-montserrat font-medium text-[3.5vw] text-aspide-blue ml-[15vw] flex"}>
                            Войти
                            <img className={"ml-[2vw] mr-[6vw] w-[7vw] h-[5vw]"} src={log}/>    
                        </a>
                    </div>
                    <div className={"mt-[4vw] font-montserrat font-normal text-[3.5vw] text-[#666775]"}>
                        Адрес электронной почты
                    </div>
                    <input
                        id="email"
                        type="email"
                        className={"outline outline-1 outline-[#A5ACC7] w-[82.25vw] h-[10.5vw] font-montserrat font-normal text-[3.5vw] text-very-black pl-[4.5vw] bg-very-white rounded-[2vw] mt-[4.5vw]"}
                        placeholder={"E-mail"}
                        onInput={(event) => {
                            const input = event.target as HTMLInputElement;
                            setEmail(input.value);
                            checkEmail();
                          }}
                        onBlur={()=>checkEmail()}
                    />
                    <div className={`text-aspide-blue font-montserrat font-normal text-[3.5vw] ${isEmailCorrect || email=="" ? 'hidden' : ''}`}>Введите правильный адрес</div>
                    <div className={"mt-[4vw] font-montserrat font-normal text-[3.5vw] text-[#666775]"}>
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
                        className={"outline z-10 outline-1 outline-[#A5ACC7] w-[82.25vw] h-[10.5vw] font-montserrat font-normal text-[3.5vw] text-very-black pl-[4.5vw]  bg-very-white rounded-[2vw] mt-[4.5vw]"}
                        placeholder={"Пароль"}/>
                    <button className="absolute flex items-center px-[4vw] mt-[-8vw] ml-[70vw] z-1" onClick={togglePasswordVisibility}>
                        <img className={"w-[6vw] h-[6vw]"} src={isPasswordVisible ? pass_invis : pass_vis}/>
                     </button>
                     <div className={`bg-[#F4F6FF] rounded-b-[1.5vw] mt-[-0vw] h-[13.5vw] w-[82.25vw] absolute z-1 ${isPasswordHintVisible ? '' : 'hidden'}`}>
                        <div className={"flex justify-center mt-[1vw] items-center"}>
                            <div className={`${hasUpperCase ? "bg-image-check-white" : ""} outline outline-1 outline-light-aspide w-[2.5vw] h-[2.5vw] rounded-[0.5vw] mt-[2vw]`}/>
                            <div className={"font-montserrat text-[2.5vw] text-[#666775] font-normal w-[20.5vw] h-[2.5vw] ml-[1.5vw]"}>заглавные (A-Z)</div>
                            <div className={`${hasLowerCase ? "bg-image-check-white" : ""} outline outline-1 outline-light-aspide w-[2.5vw] h-[2.5vw] rounded-[0.5vw] ml-[14.5vw] mt-[2vw]`}/>
                            <div className={"font-montserrat text-[2.5vw] text-[#666775] font-normal w-[20.5vw] h-[2.5vw] ml-[1.5vw]"}>строчные (a-z)</div>
                        </div>
                        <div className={"flex justify-center mt-[2vw] items-center"}>
                            <div className={`${hasNumber ? "bg-image-check-white" : ""} outline outline-1 outline-light-aspide w-[2.5vw] h-[2.5vw] rounded-[0.5vw] mt-[2vw]`}/>
                            <div className={"font-montserrat text-[2.5vw] text-[#666775] font-normal w-[20.5vw] h-[2.5vw] ml-[1.5vw]"}>цифры (0-9)</div>
                            <div className={`${isLongEnough ? "bg-image-check-white" : ""} outline outline-1 outline-light-aspide w-[2.5vw] h-[2.5vw] rounded-[0.5vw] ml-[14.5vw] mt-[2vw]`}/>
                            <div className={"font-montserrat text-[2.5vw] text-[#666775] font-normal w-[20.5vw] h-[2.5vw] ml-[1.5vw]"}>от 8 символов</div>
                        </div>
                     </div>
                    <div className={"mt-[4vw] font-montserrat font-normal text-[3.5vw] text-[#666775]"}>
                        Повторите пароль
                    </div>
                    <input
                        id="pass_repeat"
                        type={isPasswordCheckVisible ? "text" : "password"}
                        className={"outline outline-1 outline-[#A5ACC7] w-[82.25vw] h-[10.5vw] font-montserrat font-normal text-[3.5vw] text-very-black pl-[4.5vw] bg-very-white rounded-[2vw] mt-[4.5vw]"}
                        placeholder={"Повторите пароль"}
                        onInput={(event) => {
                            const input = event.target as HTMLInputElement;
                            setPassRepeat(input.value);
                          }}
                          onBlur={() => {
                             setPasswordRepeatCorrect(pass_repeat==password)
                          }}
                          />

                    <button className="absolute flex items-center px-[4vw] mt-[-8vw] ml-[70vw] z-1" onClick={togglePasswordCheckVisibility}>
                        <img className={"w-[6vw] h-[6vw]"} src={isPasswordCheckVisible ? pass_invis : pass_vis}/>
                     </button>
                     <div className={`text-aspide-blue font-montserrat font-normal text-[3.5vw] ${isPasswordRepeatCorrect || pass_repeat=="" ? 'hidden' : ''}`}>Пароли не совпадают</div>

                    <div className={"mt-[4vw] font-montserrat font-normal text-[3.5vw] text-[#666775]"}>
                        Telegram
                    </div>
                    <input 
                        id="telegram" 
                        onInput={(event) => {
                            const input = event.target as HTMLInputElement;
                            setTelegram(input.value);
                          }}
                        className={"outline outline-1 outline-[#A5ACC7] w-[82.25vw] h-[10.5vw] font-montserrat font-normal text-[3.5vw] text-very-black pl-[4.5vw] bg-very-white rounded-[2vw] mt-[4.5vw]"} placeholder={"@username"}/>
                    <button 
                        className={`${isEmailCorrect&&isPasswordCorrect&&email!=""&&password!=""&&telegram!=""&&password==pass_repeat&&agreement ? "text-very-white" : "disabled not-allowed text-light-aspide"} w-[83vw] h-[11.725vw] bg-aspide-blue font-montserrat font-semibold text-[4vw] justify-center items-center flex rounded-[8vw] mt-[10vw]`}
                        onClick={()=>{
                            setLoading(true);
                            sendRegPost();
                        }}
                        >
                        <span className={`${isLoading && "hidden"}`}>Регистрация</span>
                        <Spinner classes={`w-[5vw] h-[5vw] ${!isLoading && "hidden"}`}/>
                    </button>
                    <Toaster />
                    <div className="flex items-center mb-[7.5vw] mt-[8vw]">
                                <input 
                                    id="agreed" 
                                    type="checkbox" 
                                    onChange={toggleCheckboxAgreed}
                                    className="border border-light-aspide appearance-none relative w-[4.5vw] h-[4.5vw] rounded-[1vw] text-light-aspide cursor-pointer checked:bg-image-check-white"/>
                                <label className="ml-[2vw] font-montserrat text-[2.5vw] font-normal text-very-black w-[77.25vw]">
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
                <div className={"w-[87.5vw] h-[6.5vw]font-montserrat font-medium text-[3.5vw] text-[#535169] flex"}>
                    Пользовательское соглашение © Liberty - 2024
                </div>
            </Row>
        </Col>
    )
}