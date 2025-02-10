// @ts-ignore
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import BalanceInfo from '../comps/finances/BalanceInfo';
import Row from '../comps/layout/Row';
import Col from '../comps/layout/Col';
import Spinner from '../comps/spinners/Spinner';
import Modal from '../comps/modal/Modal';
import ModalBody from '../comps/modal/ModalBody';
import ModalFooter from '../comps/modal/ModalFooter';
import ModalHeader from '../comps/modal/ModalHeader';
import Form from '../comps/forms/Form'
import { UserState } from '../redux/usersReducer';
import CookieStorage from '../services/CookieStorage';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { withdraw_fields } from '../configs/forms/finances_config';
import TradeVolume from '../comps/finances/TradeVolume';
import InvoicesCount from '../comps/finances/InvoicesCount';
import { API_URL } from '../configs/api';
import Card from '../comps/layout/Card';
// @ts-ignore
import moment from 'moment';
import logout from '../assets/svg/logout.svg'
import calendar from '../assets/svg/calendar.svg'
class WithdrawState {
  isInitializing: boolean = false;
}
const withdrawState = new WithdrawState();

export default function Finances() {
  const [filter_set, setFilter] = useState("Today")
  const clearToken = () => {
    CookieStorage.getInstance().Set('token', "undefined");
    navigate('/admin/login');
  };
  const navigate = useNavigate();
  const [isWithdrawOrdersLoading, setWithdrawOrdersLoading] = useState(false);
  const [showModal, setModalVisible] = useState(false);
  const [withdraw, setWithdraw] = useState({
    id: null,
    address: null,
  });
  const [balances, setBalances] = useState([]);
  const [isLoadingBalances, setLoadingBalances] = useState(true);
  const [wallets, setWallets] = useState([]);
  const [dateFilter, setDF] = useState(moment().format('YYYY-MM-DD'))
  const [dateFilterTo, setDFT] = useState(moment().format('YYYY-MM-DD'))
  const [date, setDate] = useState(moment().format('DD.MM.YYYY'))
  const [isInvoicesCountLoading, setInvoicesCountLoading] = useState(true);
  const user: UserState = useSelector((state: RootState) => state.user);
  const cookieStorage: CookieStorage = CookieStorage.getInstance();
  const apiToken = user.token || cookieStorage.Get('token');
  const fetchBalances = () => {
    setLoadingBalances(true);
    axios.get(
      `${API_URL}/finances/balances?from=${dateFilter}&to=${dateFilterTo}`, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        },
        withCredentials: false,
        // @ts-ignore
        crossOrigin: false
      }
    )
      .then(r => {
        setLoadingBalances(false);
        withdrawState.isInitializing = false;

        if (r.status !== 200) {
          clearToken();
          return;
        }

        setWallets(r.data['wallets']);
        setBalances(r.data['list']);
      })
      .catch(e => {
        setLoadingBalances(false);

        clearToken();

        console.error(e);
      });
      setInvoicesCountLoading(true);
  };

  const submitOrder = () => {
    setLoadingBalances(true);
    setWithdrawOrdersLoading(true);

    axios.post(
      `${API_URL}/withdraws/add`,
      withdraw,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        },
        withCredentials: false,
        // @ts-ignore
        crossOrigin: false
      }
    ).then(r => {
      setWithdrawOrdersLoading(false);

      if (r.status !== 200 && r.status !== 201) {
        clearToken();
        setLoadingBalances(false);

        return;
      }

      fetchBalances();
    })
    .catch(e => {
      console.error(e);
    });
  };

  useEffect(() => {
    if (!apiToken) {
      navigate('/admin/login');
      return;
    }

    if (withdrawState.isInitializing) {
      return;
    }

    withdrawState.isInitializing = true;
    fetchBalances();
  }, []);

  return (
    <div className={`finances-root w-full h-full min-w-full min-h-fill`}>
      <div className={"flex justify-between font-montserrat font-semibold text-[7vw] mb-[5vw]"}>
        Finances
        <img className={"w-[8vw]"} onClick={clearToken} src={logout}/>
      </div>
      <Col className={`w-full h-full`}>
      <div className={"justify-center mx-auto"}> 
      <Row className={'justify-between items-center mb-[2vw]'}>
        <div className={"flex text-[3.5vw] text-dark-aspide items-center"}>
            <img className={'ml-[1vw]'} src={calendar}/>
            {moment().format('MM.DD.YYYY')}
        </div>
        <div className={"font-montserrat font-normal text-[3.5vw] text-gray-500"}>Select a suitable filter</div>
      </Row>
      <Row className={'gap-4 justify-center'}>
          <div>
              <div className={"flex justify-between w-[80vw]"}>
                <button
                  className={`bg-almost-white mr-[1vw] h-[8vw] rounded-[1vw] font-montserrat font-normal outline outline-1 text-[3.5vw] w-full ${filter_set=="Yesterday" ? " text-aspide-blue outline-aspide-blue" : " text-gray-500 outline-gray-500"}`}
                  onClick={()=>{
                    setFilter("Yesterday");
                    setDF(moment().subtract(1, 'days').format('YYYY-MM-DD'))
                    setDFT(moment().subtract(1, 'days').format('YYYY-MM-DD'))
                    setDate(moment().subtract(1, 'days').format('DD.MM.YYYY'));
                    fetchBalances();
                    
                  }}
                  >
                    Вчера 
                </button>
                <button
                  className={`bg-almost-white mr-[1vw] h-[8vw] rounded-[1vw] font-montserrat font-normal outline outline-1 text-[3.5vw] w-full ${filter_set=="Today" ? " text-aspide-blue outline-aspide-blue" : " text-gray-500 outline-gray-500"}`}
                  onClick={()=>{
                    setFilter("Today");
                    setDF(moment().format('YYYY-MM-DD'));
                    setDFT(moment().format('YYYY-MM-DD'));
                    setDate(moment().format('DD.MM.YYYY'));
                    fetchBalances();
                  }
                  }
                  >
                    Сегодня
                </button>
                <button
                  className={`bg-almost-white mr-[1vw] h-[8vw] rounded-[1vw] font-montserrat font-normal outline outline-1 text-[3.5vw] w-full ${filter_set=="3_days" ? " text-aspide-blue outline-aspide-blue" : " text-gray-500 outline-gray-500"}`}
                  onClick={()=>{
                    setFilter("3_days");
                    setDF(moment().subtract(3, 'days').format('YYYY-MM-DD'))
                    setDFT(moment().format('YYYY-MM-DD'))
                    setDate(moment().subtract(3, 'days').format('DD.MM.YYYY'));
                    fetchBalances();
                  }
                  }
                  >
                    3 дня
                </button>
                <button
                  className={`bg-almost-white mr-[1vw] h-[8vw] rounded-[1vw] font-montserrat font-normal outline outline-1 text-[3.5vw] w-full ${filter_set=="Week" ? " text-aspide-blue outline-aspide-blue" : " text-gray-500 outline-gray-500"}`}
                  onClick={()=>{
                    setFilter("Week")
                    setDF(moment().subtract(7, 'days').format('YYYY-MM-DD'))
                    setDFT(moment().format('YYYY-MM-DD'))
                    setDate(moment().subtract(7, 'days').format('DD.MM.YYYY'));
                    fetchBalances();
                  }
                }
                  >
                    Неделя
                </button>
                <button
                  className={`bg-almost-white mr-[1vw] h-[8vw] rounded-[1vw] font-montserrat font-normal outline outline-1 text-[3.5vw] w-full ${filter_set=="Month" ? " text-aspide-blue outline-aspide-blue" : " text-gray-500 outline-gray-500"}`}
                  onClick={()=>{
                    setFilter("Month")
                    setDF(moment().subtract(1, 'months').format('YYYY-MM-DD'))
                    setDFT(moment().format('YYYY-MM-DD'))
                    setDate(moment().subtract(1, 'months').format('DD.MM.YYYY'));
                    fetchBalances();
                  }}
                  >
                    Месяц
                </button>

              </div>
          </div>
        </Row>

      <Row className={'balances-grid flex gap-2 justify-left min-h-48 mt-[4.5vw] gap-[5vw]'}>
          { !isLoadingBalances &&
            balances.map((balanceModel, index) => {
              return (
                <BalanceInfo className={"w-[40vw] h-[40vw] rounded-[3vw]"} butClass={'mt-[3vw] w-[36.5vw] h-[9vw] '} coinClass={'text-[5vw]'} dataClass={'text-[3.5vw] ml-[4vw]'} data={balanceModel} key={index} withdrawHandler={()=>{
                  setWithdraw({
                    ...withdraw,
                    ...{
                      address: wallets['ltc']
                    }
                  });

                  setModalVisible(true);
                }}/>
              )
            })
          }
          { !balances.length &&
            (
              <Spinner />
            )
          }
          <InvoicesCount
            handleOnLoadingComplete={()=>{setInvoicesCountLoading(false)}}
            isLoading={isInvoicesCountLoading}
            from={dateFilter}
            to={dateFilterTo}
            c1={'[4vw]'}
            c2={'[4vw]'}
            c3={'[3.5vw]'}
            count_font={"text-[10vw]"}
            out_color={"aspide-blue"}
            w={"w-[40vw] rounded-[3vw]"}
            h={"h-[40vw]"}
            bg={'bg-kinda-light-blue'}
            label={'Invoices'}
            filters={{}}
            onError={() => {
               clearToken();
              }}
            />

        </Row>

        </div>
        <TradeVolume 
            className={"w-[86vw] mx-auto h-[50vw] pt-[12vw] mt-[4vw]"}
            data={"0.00"}
            curr_date={date}
          />
      </Col>
      {showModal && 
        (
          <div className={"w-full h-full justify-center"}>
          <Modal className={"-ml-[5%] -mt-[100%]"}>
            <ModalHeader
              title={'Order Withdraw'}
              onCloseHandler={()=>{
                setModalVisible(false)
              }}
            />
            <ModalBody>
              <Form className={'w-full'}
                fields={withdraw_fields}
                data={withdraw}
                disabled={isWithdrawOrdersLoading}
                onInput={data => {
                  setWithdraw({
                    ...withdraw,
                    ...data
                  });
              }}/>
           </ModalBody>
            <ModalFooter>
              <button
                className={'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[5vw] py-[2.5vw] text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'}
                onClick={()=>{
                  setModalVisible(false);

                  submitOrder();
              }}>
                <span>
                  Order
                </span>
              </button>
            </ModalFooter>
          </Modal>
          </div>
        )
      }

    </div>
  );
}
