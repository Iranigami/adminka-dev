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
      <Col className={`w-full h-full`}>
      <div className={"justify-center mx-auto"}>
        <Row className={'-mt-4 gap-4 justify-left'}>
          
          <TradeVolume 
            className={"w-[556px] h-[303px] pt-[100px]"}
            data={"0.00"}
            curr_date={date}
          />
          <div>
            <Card className={"w-[267px] h-[126px] bg-kinda-light-blue outline outline-1 outline-aspide-blue mb-[14px] rounded-[12px]"}>
              <div className={"font-montserrat font-normal text-[12px] text-gray-500 mb-2"}>Select a suitable filter</div>
              <div className={"flex justify-between"}>
                <button
                  className={`mr-1 h-[30px] rounded-[3px] font-montserrat font-normal outline outline-1 text-[14px] w-full ${filter_set=="Yesterday" ? " text-aspide-blue outline-aspide-blue" : " text-gray-500 outline-gray-500"}`}
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
                  className={`mr-1 h-[30px] rounded-[3px] font-montserrat font-normal outline outline-1 text-[14px] w-full ${filter_set=="Today" ? " text-aspide-blue outline-aspide-blue" : " text-gray-500 outline-gray-500"}`}
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
                  className={`mr-1 h-[30px] rounded-[3px] font-montserrat font-normal outline outline-1 text-[14px] w-full ${filter_set=="3_days" ? " text-aspide-blue outline-aspide-blue" : " text-gray-500 outline-gray-500"}`}
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
              </div>
              <div className={"flex justify-between mt-[6px]"}>
                <button
                  className={`mr-1 h-[30px] rounded-[3px] font-montserrat font-normal outline outline-1 text-[14px] w-full ${filter_set=="Week" ? " text-aspide-blue outline-aspide-blue" : " text-gray-500 outline-gray-500"}`}
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
                  className={`mr-1 h-[30px] rounded-[3px] font-montserrat font-normal outline outline-1 text-[14px] w-full ${filter_set=="Month" ? " text-aspide-blue outline-aspide-blue" : " text-gray-500 outline-gray-500"}`}
                  onClick={()=>setFilter("Month")}
                  >
                    Месяц
                </button>
              </div>
            </Card>
            <InvoicesCount
              handleOnLoadingComplete={()=>{setInvoicesCountLoading(false)}}
              isLoading={isInvoicesCountLoading}
              from={dateFilter}
              to={dateFilterTo}
              className={"text-[40px] outline-aspide-blue w-[267px] rounded-[12px] h-[163px] bg-kinda-light-blue"}
              c1={"4"}
              c2={"[16px]"}
              c3={"[14px]"}
              count_font={""}
              out_color={""}
              w={""}
              h={""}
              bg={''}
              label={'Invoices'}
              filters={{}}
              onError={() => {
                  clearToken();
              }}
            />
          </div>
        </Row>
        <Row className={'balances-grid flex gap-2 justify-left min-h-48 mt-[18px]'}>
          { !isLoadingBalances &&
            balances.map((balanceModel, index) => {
              return (
                <BalanceInfo className={"w-[269px] h-[181px] rounded-[12px]"}   butClass={' mt-[23px] w-[146px] h-[36px] '} coinClass={'text-[20px]'} dataClass={'text-[14px] ml-4'} data={balanceModel} key={index} withdrawHandler={()=>{
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

        </Row>
        </div>
        <Row className={'mt-8 justify-center'}>
          <button
            className={"w-[214px] h-[44px] bg-aspide-blue text-center justify-center items-center flex text-very-white text-[16px] font-montserrat font-medium rounded-full"}
            onClick={() => {
                navigate("/admin/payment")
            }}
          >
            <span>Withdraw History</span>
          </button>
        </Row>
      </Col>
      {showModal && 
        (
          <div className={"w-full h-full"}>
          <Modal className={"ml-[25%] mr-[25%] mt-[10%]"}>
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
                className={'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'}
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
