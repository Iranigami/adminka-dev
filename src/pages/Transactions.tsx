// @ts-ignore
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserState } from '../redux/usersReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import CookieStorage from '../services/CookieStorage';
import Row from '../comps/layout/Row';
import Col from '../comps/layout/Col';
import Card from '../comps/layout/Card';
import Button from '../comps/buttons/Button';
import Table from '../comps/tables/Table';
import THead from '../comps/tables/THead';
import TRow from '../comps/tables/TRow';
import TCol from '../comps/tables/TCol';
import TCell from '../comps/tables/TCell';
import TBody from '../comps/tables/TBody';
import Spinner from '../comps/spinners/Spinner';
import Modal from '../comps/modal/Modal';
import ModalBody from '../comps/modal/ModalBody';
import ModalFooter from '../comps/modal/ModalFooter';
import ModalHeader from '../comps/modal/ModalHeader';
import Form from '../comps/forms/Form'
import { tx_send } from '../configs/forms/tx_send';
import { API_URL } from '../configs/api';
import TradeVolume from '../comps/finances/TradeVolume';
import CommissionsSum from '../comps/finances/CommissionsSum';
import Input from '../comps/forms/Input';

class TransactionsState {
  public inInitialized: boolean = false;
}
const transactionsState = new TransactionsState();

export default function Transactions() {
  const navigate = useNavigate();
  const clearToken = () => {
    CookieStorage.getInstance().Set('token', "undefined");
    navigate("/admin/login");
  };
  const [transferOrdersFilters, setTransferOrdersFilters] = useState({
    id: null,
    uuid: null,
    status: null,
    from_dt: null,
    to_dt: null
  });
  const [customFilterValue, setCustomFilter] = useState('');
  const [isLogVisible, setLogVisibility] = useState(false);
  const [selectedTransferOrder, setSelectedTransferOrder] = useState(null);
  const [commissionsSums, setCommissionsSums] = useState({});
  const [transferOrders, setTransferOrders] = useState([]);
  const [isLoading, setLoadingState] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    limit: 50,
    skip: 0,
    total: 0
  });
  const [txData, setTXData] = useState({
    from: '',
    to: '',
    coin: 'ltc',
    coins: 0.00,
    is_testnet: 1
  });

  const user: UserState = useSelector((state: RootState) => state.user);
  const cookieStorage: CookieStorage = CookieStorage.getInstance();
  const apiToken = user.token || cookieStorage.Get('token');

  const renderStatus = (transferOrder: object) => {
    return transferOrder['status'];
  };

  const renderDateTime = (dt_str?: string) => {
    if (!dt_str) {
      return '';
    }

    const dt = new Date(dt_str);

    return dt.toISOString();
  };

  const renderCommissions = () => {
    const coins = Object.keys(commissionsSums);

    return coins.map((coin, index) => {
      return (
        <CommissionsSum
          className={'ml-4 w-[191px] h-[139px] rounded-[14px] outline outline-1 outline-aspide-blue justify-center'}
          key={index}
          loading={isLoading}
          coin={coin}
          coins={commissionsSums[coin]}
        />
      )
    });
  };

  const isCancellable = (transferOrder: object) => {
    const status = transferOrder['status'];

    return status === 'queued';
  };

  const isStartable = (transferOrder: object) => {
    const status = transferOrder['status'];

    return status === 'queued' || status === 'cancelled';
  };

  const submitTransferForm = () => {
    setLoadingState(true);

    axios.post(`${API_URL}/tx`,
    {
      ...txData
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      },
      withCredentials: false,
      // @ts-ignore
      crossOrigin: false
    })
      .then(() => {
        setLoadingState(false);
      })
      .catch(e => {
        console.error(e);
        setLoadingState(false);

                  clearToken();
      });
  };

  const fetchCommissionsSum = () => {
    axios.get(`${API_URL}/tx/commissions/sum`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      },
      withCredentials: false,
      // @ts-ignore
      crossOrigin: false
    })
      .then(r => {
        setCommissionsSums(r.data['sum']);
      })
      .catch(e => {
        console.error(e);

                  clearToken();
      })
  };

  const cancelTransfer = (transferOrder: object) => {
    setLoadingState(true);

    axios.post(`${API_URL}/tx/cancel`, {
      'uuid': transferOrder['uuid']
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      },
      withCredentials: false,
      // @ts-ignore
      crossOrigin: false
    })
      .then(() => {
        setLoadingState(false);

        fetchTXs(transferOrdersFilters);
      })
      .catch(e => {
        console.error(e);

        setLoadingState(false);
      });
  };

  const startTransfer = (transferOrder: object) => {
    setLoadingState(true);

    axios.post(`${API_URL}/tx/start`, {
      'uuid': transferOrder['uuid']
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      },
      withCredentials: false,
      // @ts-ignore
      crossOrigin: false
    })
      .then(() => {
        setLoadingState(false);

        fetchTXs(transferOrdersFilters);
      })
      .catch(e => {
        console.error(e);

        setLoadingState(false);
      });
  };

  const fetchTXs = (_filters: object) => {
    setLoadingState(true);

    axios.post(`${API_URL}/tx?skip=${pagination.skip}&limit=${pagination.limit}`, {
        filters: _filters
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        },
        withCredentials: false,
        // @ts-ignore
        crossOrigin: false
    })
      .then(r => {
        setLoadingState(false);
        transactionsState.inInitialized = false;

        setPagination({
          ...pagination,
          count: r.data.count,
          total: r.data.total
        });

        setTransferOrders(r.data.list);
      })
      .catch(e => {
        setLoadingState(false);
        transactionsState.inInitialized = false;

        console.error(e);

                  clearToken();
      });
  };

  useEffect(() => {
    if (transactionsState.inInitialized) {
      return;
    }

    setLoadingState(true);
    transactionsState.inInitialized = true;

    fetchTXs(transferOrdersFilters);
    fetchCommissionsSum();
  }, []);

  return (
    <Col className={'transactions-view w-full h-full'}>
      <Card className={'tx-info-card'}>
        <Col className={'w-full justify-center py-5'}>
          <Row>
            <div className={'flex'}>
              {
                renderCommissions()
              }
            </div>
          </Row>
        </Col>
      </Card>

      <Card className={'w-full mt-8'}>
        <Col className={'w-full'}>
          <Row className={'w-full justify-between overflow-y-auto'}>
            <Button
              disabled={isLoading}
              onClick={e => {
                e.preventDefault();

                setFormVisible(true);
              }}
            >
              <span>Send</span>
            </Button>

            <Col className={'justify-center overflow-y-auto'}>
              <Row>
                <Input
                  value={customFilterValue}
                  disabled={isLoading}
                  placeholder={'Search . . .'}
                  onInput={e => {
                    const input: HTMLInputElement = e.target;

                    setCustomFilter(input.value);
                  }}
                />

                <Button
                  className={`ml-4 mb-4 ${customFilterValue.length > 0 ? '' : 'disabled'}`}
                  disabled={(isLoading && customFilterValue.length > 0)}
                  type={'success'}
                  onClick={() => {
                    const _filters = {
                      ...transferOrdersFilters,
                      ...{
                        id: parseInt(customFilterValue),
                        uuid: customFilterValue
                      }
                    };

                    setTransferOrdersFilters(_filters);

                    fetchTXs(_filters);
                  }}
                >
                  <span>Find</span>
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>
      </Card>

      <Card
        className={'w-full mt-4'}
        overflowy={'overflow-auto'}
      >
        <Col className={'w-full min-h-96'}>
          <Row className={'w-max mt-8 overflow-auto'}>
            <Table className={'min-w-full'}>
              <THead>
                <TRow>
                  <TCol>
                    <span>UUID</span>
                  </TCol>
                  <TCol>
                    <span>Coin</span>
                  </TCol>
                  <TCol>
                    <span>Coins</span>
                  </TCol>
                  <TCol>
                    <span>Satoshi</span>
                  </TCol>
                  <TCol>
                    <span>Invoice</span>
                  </TCol>
                  <TCol>
                    <span>Product</span>
                  </TCol>
                  <TCol>
                    <span>Status</span>
                  </TCol>
                  <TCol>
                    <span>Created</span>
                  </TCol>
                  <TCol>
                    <span>Controls</span>
                  </TCol>
                </TRow>
              </THead>
              { isLoading &&
                (
                  <TBody>
                    <TRow>
                      <TCell colspan={9}>
                        <Row className={'w-full justify-center'}>
                          <Col className={'justify-center h-48'}>
                            <Spinner />
                          </Col>
                        </Row>
                      </TCell>
                    </TRow>
                  </TBody>
                )
              }
              { !isLoading && !transferOrders.length &&
                (
                  <TBody>
                    <TRow>
                      <TCell colspan={9}>
                        <Row className={'w-full justify-center'}>
                          <Col className={'justify-center h-48'}>
                            No data
                          </Col>
                        </Row>
                      </TCell>
                    </TRow>
                  </TBody>
                )
              }
              { !isLoading && transferOrders.length &&
                (
                  <TBody>
                    {
                      transferOrders.map((transferOrder, rowIndex) => {
                        return (
                          <TRow key={rowIndex}>
                            <TCell>
                              <span>{transferOrder['uuid']}</span>
                            </TCell>
                            <TCell>
                              <span>
                                { transferOrder['coin'] }
                              </span>
                            </TCell>
                            <TCell>
                              <span>
                                { transferOrder['coins'] || 'N/D' }
                              </span>
                            </TCell>
                            <TCell>
                              <span>
                                { transferOrder['satoshi'] || 'N/D' }
                              </span>
                            </TCell>
                            <TCell>
                              <span>
                                { transferOrder['invoice_uuid'] || '-' }
                              </span>
                            </TCell>
                            <TCell>
                              <span>
                                { transferOrder['product']['uuid'] || '-' }
                              </span>
                            </TCell>
                            <TCell>
                              <span>
                                { renderStatus(transferOrder) }
                              </span>
                            </TCell>
                            <TCell>
                              <span>
                                { renderDateTime(transferOrder['created_at'] || undefined) }
                              </span>
                            </TCell>
                            <TCell>
                              <Col>
                                <Button
                                  type={'info'}
                                  onClick={() => {
                                    setSelectedTransferOrder(transferOrder);
                                    setLogVisibility(true);
                                  }}
                                >
                                  <span>Logs</span>
                                </Button>
                                { isCancellable(transferOrder) &&
                                  <Button
                                    className={'mt-4'}
                                    type={'danger'}
                                    disabled={isLoading}
                                    onClick={() => {
                                      cancelTransfer(transferOrder);
                                    }}
                                  >
                                    <span>Cancel</span>
                                  </Button>
                                }

                                { isStartable(transferOrder) &&
                                    <Button
                                      type={'success'}
                                      disabled={isLoading}
                                      className={'mt-4'}
                                      onClick={() => {
                                        startTransfer(transferOrder);
                                      }}
                                    >
                                      <span>Start</span>
                                    </Button>
                                }
                              </Col>
                            </TCell>
                          </TRow>
                        )
                      })
                    }
                  </TBody>
                )
              }
            </Table>
          </Row>
        </Col>
      </Card>

      { isLogVisible &&
        <Modal>
          <ModalHeader
            title={'Logs'}
            onCloseHandler={() => {
              setLogVisibility(false);
            }}
          />
          <ModalBody>
            <textarea
              className={'w-full h-full min-h-96 overflow-auto'}
              readOnly={true}
            >
              {selectedTransferOrder['log'] || '-no-data-'}
            </textarea>
          </ModalBody>
          <ModalFooter>
            <Col className={'w-full justify-center'}>
              <Row className={'w-full justify-between'}>
                <Button
                  type={'info'}
                  onClick={() => {
                    setLogVisibility(false);
                  }}
                >
                  <span>Close</span>
                </Button>
              </Row>
            </Col>
          </ModalFooter>
        </Modal>
      }

      { isFormVisible &&
        (
          <Modal>
            <ModalHeader
              title={'Send'}
              onCloseHandler={() => {
                setFormVisible(false);
              }}
            />
            <ModalBody>
              <Form
                fields={tx_send}
                data={txData}
                disabled={isLoading}
                onInput={state => {
                  setTXData({
                    ...txData,
                    ...state
                  })
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Col className={'w-full justify-center'}>
                <Row className={'w-full justify-between'}>
                  <Button onClick={() => {
                    setFormVisible(false);
                  }}
                  >
                    <span>
                      Cancel
                    </span>
                  </Button>

                  <Button onClick={() => {
                    setFormVisible(false);

                    submitTransferForm();
                  }}
                  >
                    <span>
                      OK
                    </span>
                  </Button>
                </Row>
              </Col>
            </ModalFooter>
          </Modal>
        )
      }
    </Col>
  )
}
