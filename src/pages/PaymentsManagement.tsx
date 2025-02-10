import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../comps/layout/Card';
import Row from '../comps/layout/Row';
import Col from '../comps/layout/Col';
import Table from '../comps/tables/Table';
import THead from '../comps/tables/THead';
import TRow from '../comps/tables/TRow';
import TCol from '../comps/tables/TCol';
import TCell from '../comps/tables/TCell';
import TBody from '../comps/tables/TBody';
import Spinner from "../comps/spinners/Spinner";
import { API_URL } from '../configs/api';
import { UserState } from '../redux/usersReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import CookieStorage from '../services/CookieStorage';
import Modal from '../comps/modal/Modal';
import ModalHeader from '../comps/modal/ModalHeader';
import ModalBody from '../comps/modal/ModalBody';
import ModalFooter from '../comps/modal/ModalFooter';
import Form from '../comps/forms/Form';
import Button from '../comps/buttons/Button';
import Input from '../comps/forms/Input';
import DateInput from '../comps/forms/DateInput';
import Select from '../comps/forms/Select';
import { withdrawOrderStates } from '../configs/forms/select/withdraw_orders_states';

class PaymentsManagementState {
  public isInitializing: boolean = false;
}
const paymentsManagementState = new PaymentsManagementState();

export default function PaymentsManagement() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [stateFilter, setStateFilter] = useState(0);
  const [fromFilter, setFromFilter] = useState(undefined);
  const [toFilter, setToFilter] = useState(undefined);
  const [filters, setFilters] = useState({
    from: null,
    to: null,
    status: null
  });
  const [withdrawOrders, setWithdrawOrders] = useState([]);

  const user: UserState = useSelector((state: RootState) => state.user);
  const cookieStorage: CookieStorage = CookieStorage.getInstance();
  const apiToken = user.token || cookieStorage.Get('token');

  const renderStatus = (order: object) => {
    return <Select
      value={order['status']}
      options={withdrawOrderStates}
      onChange={e => {
        const input: HTMLSelectElement = e.target as HTMLSelectElement;
        const _status = parseInt(input.value);

        submitOrderStatus(order, _status);
      }}
    />
  };

  const fetchWithdrawOrders = (_filters: object) => {
    setLoading(true);

    axios.post(
      `${API_URL}/withdraws/list`,
      filters,
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
        setWithdrawOrders(r.data['list']);

        setLoading(false);
        paymentsManagementState.isInitializing = false;
      })
      .catch(e => {
        console.error(e);

        setLoading(false);
        paymentsManagementState.isInitializing = false;
      });
  };

  const submitOrderStatus = (order: object, _status: number) => {
    setLoading(true);

    axios.post(
      `${API_URL}/withdraws/store`,
      order,
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
      .then(() => {
        fetchWithdrawOrders(filters);
      })
      .catch(e => {
        console.error(e);

        setLoading(false);
      });
  };

  useEffect(() => {
    if (!apiToken) {
                clearToken();
      return;
    }

    if (paymentsManagementState.isInitializing) {
      return;
    }
    paymentsManagementState.isInitializing = true;

    fetchWithdrawOrders(filters);
  }, []);

  return (
    <Col className={'shops-root w-full min-h-96'}>
      <div className={"px-5 py-5"}>
        <Col className={'w-full justify-center'}>
          <Row className={'w-full justify-start gap-4'}>
            <Col className={'h-full justify-center'}>
              <button
                className={"w-[160px] h-[40px] bg-aspide-blue rounded-[30px] font-montserrat text-very-white"}
                onClick={() => {
                }}
              >
                <span>Search</span>
              </button>
            </Col>

            <Col className={'h-full justify-center'}>
              <Select
                className={"w-[323px] h-[37px] outline outline-1 outline-aspide-blue rounded"}
                options={withdrawOrderStates}
                value={stateFilter}
                onChange={e => {
                  const input: HTMLSelectElement = e.target as HTMLSelectElement;

                  setStateFilter(parseInt(input.value));
                }}
              />
            </Col>

            <Col className={'h-full justify-center'}>
              <Row className={'gap-4'}>
                <span className={"font-montserrat font-normal text-sm text-aspide-blue"}>С&nbsp;</span>
                <DateInput
                  value={fromFilter}
                  onChange={(e) => {
                    const input: HTMLInputElement = e.target as HTMLInputElement;

                    setFromFilter(input.value);
                  }}
                />
                <span className={"font-montserrat font-normal text-sm text-aspide-blue"}>&nbsp;по&nbsp;</span>
                <DateInput
                  value={toFilter}
                  onChange={(e) => {
                    const input: HTMLInputElement = e.target as HTMLInputElement;

                    setToFilter(input.value);
                  }}
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </div>

      <Card className={'w-full min-h-96 mt-4'}>
        <Table>
          <THead>
            <TRow>
              <TCol>
                <span>ID</span>
              </TCol>
              <TCol>
                <span>UUID</span>
              </TCol>
              <TCol>
                <span>Datetime</span>
              </TCol>
              <TCol>
                <span>Coins</span>
              </TCol>
              <TCol>
                <span>$</span>
              </TCol>
              <TCol>
                <span>Wallet</span>
              </TCol>
              <TCol>
                <span>Status</span>
              </TCol>
            </TRow>
          </THead>
          <TBody>
            { isLoading &&
              <TRow>
                <TCell colspan={7}>
                  <Row className={'w-full justify-center'}>
                    <Col className={'justify-center h-48'}>
                      <Spinner />
                    </Col>
                  </Row>
                </TCell>
              </TRow>
            }
            { !isLoading && !withdrawOrders.length &&
              <TRow>
                <TCell colspan={7}>
                  <Row className={'w-full justify-center'}>
                    <Col className={'justify-center h-48'}>
                      <span>No data</span>
                    </Col>
                  </Row>
                </TCell>
              </TRow>
            }
            { !isLoading && withdrawOrders.length &&
              withdrawOrders.map((order, index) => {
                return <TRow key={index}>
                  <TCell>
                    <span>{order['id']}</span>
                  </TCell>
                  <TCell>
                    <span>{order['uuid']}</span>
                  </TCell>
                  <TCell>
                    <span>{(new Date(order['created_at'])).toISOString()}</span>
                  </TCell>
                  <TCell>
                    <span>{order['coins']}&nbsp;{order['coin']}</span>
                  </TCell>
                  <TCell>
                    <span>
                      {order['currency_amount'] || '-'}
                    </span>
                  </TCell>
                  <TCell>
                    <span>{order['address']}</span>
                  </TCell>
                  <TCell>
                    <span>{renderStatus(order)}</span>
                  </TCell>
                </TRow>
              })
            }
          </TBody>
        </Table>
      </Card>
    </Col>
  )
}
