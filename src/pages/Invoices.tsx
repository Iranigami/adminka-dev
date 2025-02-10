import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
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
import InvoicesCount from '../comps/finances/InvoicesCount';
import Modal from '../comps/modal/Modal';
import ModalHeader from '../comps/modal/ModalHeader';
import ModalBody from '../comps/modal/ModalBody';
import ModalFooter from '../comps/modal/ModalFooter';
import Form from '../comps/forms/Form';
import { new_invoice_fields } from '../configs/forms/new_invoice_fields';
import Spinner from '../comps/spinners/Spinner';
import { API_URL } from '../configs/api';
import { UserState } from '../redux/usersReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import CookieStorage from '../services/CookieStorage';
import { invoice_card } from '../configs/forms/invoice_card';
import Select from '../comps/forms/Select';
import { invoice_statuses } from '../configs/forms/select/invoice_statuses';
import DateInput from '../comps/forms/DateInput';
import plus_img from '../assets/svg/icons8_plus.svg'

class InvoicesState {
  isInitializing: boolean = false;
}
const invoicesState = new InvoicesState();

export default function Invoices() {
  const clearToken = () => {
    CookieStorage.getInstance().Set('token', "undefined");
    navigate("/admin/login");
  };
  const [isRequesting, setRequesting] = useState(false);
  const [isNewCustomInvoiceCardVisible, setNewCustomInvoiceCardVisibility] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [isInvoiceCardVisible, setInvoiceCardVisibility] = useState(false);
  const [fromDate, setFromDate] = useState(undefined);
  const [toDate, setToDate] = useState(undefined);
  const [statusFilter, setStatusFilter] = useState('none');
  const [filters, setFilters] = useState({
  });
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    currency_amount: 0.00,
    customer_email: undefined,
    shop_url: undefined
  });
  const navigate = useNavigate();

  const isInvoiceCancellable = (invoice: object) => {
    const status = invoice['status'];

    return status === 'draft' || status === 'open' || status === 'pending';
  };

  const user: UserState = useSelector((state: RootState) => state.user);
  const cookieStorage: CookieStorage = CookieStorage.getInstance();
  const apiToken = user.token || cookieStorage.Get('token');

  const fetchInvoices = () => {
    setRequesting(true);

    axios.post(
      `${API_URL}/invoices/list?skip=0&limit=15`,
      {
        filters: filters
      },
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
        setInvoices(r.data['list']);

        setRequesting(false);
        invoicesState.isInitializing = false;
      })
      .catch(e => {
        console.error(e);

        setRequesting(false);
        invoicesState.isInitializing = false;
      });
  };

  const cancelInvoice = (invoice: object) => {
    setRequesting(true);

    axios.post(
      `${API_URL}/invoices/cancel`,
      {
        invoice_uuid: invoice['uuid']
      },
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
        fetchInvoices();
      })
      .catch(e => {
        console.error(e);
      });
  };

  const submitInvoice = () => {
    setRequesting(true);

    axios.post(
      `${API_URL}/invoices/custom`,
      newInvoice,
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
        setRequesting(false);
      })
      .catch(e => {
        console.error(e);

        setRequesting(false);
      });
  };

  useEffect(() => {
    if (invoicesState.isInitializing) {
      return;
    }
    invoicesState.isInitializing = true;

    fetchInvoices();
  }, []);

  return (
    <Col className={'transactions-view w-full h-full min-w-full min-h-fill'}>
      <Card className={'w-full'}>
        <Col className={'w-full'}>
          <div className={'flex w-full gap-4'}>
            <InvoicesCount
              c1={"4"}
              c2={"[16px]"}
              c3={"[14px]"}
              className={"text-[40px] outline-aspide-blue rounded-[12px] bg-kinda-light-blue"}
              count_font={"[24px]"}
              out_color={"aspide-blue"}
              w={"[172px]"}
              h={"[139px]"}
              bg={"bg-kinda-light-blue"}
              filters={{}}
              label={'Invoices'}
              onError={() => {
                clearToken();
              }}
            />

            <InvoicesCount
              c1={"4"}
              c2={"[16px]"}
              c3={"[14px]"}
              className={"text-[40px] outline-aspide-blue rounded-[12px] bg-kinda-light-blue"}
              count_font={"[24px]"}
              out_color={"very-black"}
              w={"[172px]"}
              h={"[139px]"}
              bg={"bg-[#F4FFFC]"}
              label={'Closed Invoices'}
              filters={{
                statuses: ['closed'],
              }}
              onError={() => {
                clearToken();
              }}
            />
              <Card className={`title w-[172px] h-[139px] invoices-volume-card bg-kinda-light-blue outline outline-1 outline-aspide-blue rounded-[12px] min-w-28 min-h-28 max-w-[267px] max-h-[163px]`}>
                <span className={"font-montserrat font-medium text-[16px] text-very-black"}>Create Invoices</span>
                <img className={"mx-auto"} src={plus_img}/>
                <button
                className={"w-[130px] h-[44px] bg-aspide-blue rounded-full text-very-white justify-center items-center flex font-montserrat font-medium text-[16px]"}
                onClick={() => {
                  setNewCustomInvoiceCardVisibility(true);
                }}
              >
                <span>Create</span>
              </button>
            </Card>
          </div>
        </Col>
      </Card>

      <Card className={'mt-4'}>
        <Col className={'w-full justify-center'}>
          <Row className={'w-full'}>

          </Row>

          <Row className={'w-full mt-4'}>
            <Col className={'h-full justify-center'}>
              <Row className={'gap-4'}>
                <Col className={'h-full justify-center'}>
                  <Button
                    disabled={isRequesting}
                    type={'info'}
                    onClick={() => {
                      fetchInvoices();
                    }}
                  >
                    <span>Search</span>
                  </Button>
                </Col>

                <Select
                  className={'mt-1 flex flex-col h-full justify-center'}
                  disabled={isRequesting}
                  value={statusFilter}
                  options={[
                    {
                      value: 'none',
                      label: 'None'
                    },
                    ...invoice_statuses
                  ]}
                  onChange={e => {
                    const input: HTMLSelectElement = e.target as HTMLSelectElement;

                    setStatusFilter(input.value);

                    setFilters({
                      ...filters,
                      status: input.value === 'none' ? null : input.value
                    });
                  }}
                />

                <Col className={'h-full justify-center'}>
                  <Row className={'gap-4'}>
                    <DateInput
                      value={fromDate}
                      onChange={e => {
                        const input: HTMLInputElement = e.target as HTMLInputElement;

                        setFromDate(input.value);

                        const dt = input.valueAsDate;
                        let m = String(dt.getMonth());
                        if (m.length < 2) {
                          m = `0${m}`;
                        }

                        let d = String(dt.getDay());
                        if (d.length < 2) {
                          d = `0${d}`;
                        }

                        const dt_str = `${dt.getFullYear()}-${m}-${d}`;
                        setFilters({
                          ...filters,
                          from: dt_str
                        });
                      }}
                    />

                    <DateInput
                      value={toDate}
                      onChange={e => {
                        const input: HTMLInputElement = e.target as HTMLInputElement;

                        setToDate(input.value);
                        const dt = input.valueAsDate;
                        let m = String(dt.getMonth());
                        if (m.length < 2) {
                          m = `0${m}`;
                        }

                        let d = String(dt.getDay());
                        if (d.length < 2) {
                          d = `0${d}`;
                        }

                        const dt_str = `${dt.getFullYear()}-${m}-${d}`;
                        setFilters({
                          ...filters,
                          to: dt_str
                        });
                      }}
                    />
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Card>

      <Card className={'w-full mt-8 rounded-[30px] outline-aspide-blue outline outline-1'}>
        <Col className={'w-full min-h-96'}>
          <Row className={'w-full overflow-x-auto'}>
            <Table>
              <THead>
                <TRow>
                  <TCol>
                    <span>UUID</span>
                  </TCol>
                  <TCol>
                    <span>Product</span>
                  </TCol>
                  <TCol>
                    <span>Customer</span>
                  </TCol>
                  <TCol>
                    <span>Coins</span>
                  </TCol>
                  <TCol>
                    <span>Status</span>
                  </TCol>
                  <TCol>
                    <span>Date</span>
                  </TCol>
                  <TCol>
                    <span>Controls</span>
                  </TCol>
                </TRow>
              </THead>
              <TBody>
                { isRequesting &&
                  <TRow>
                    <TCell colspan={8}>
                      <Row className={'w-full justify-center'}>
                        <Col className={'justify-center h-48'}>
                          <Spinner />
                        </Col>
                      </Row>
                    </TCell>
                  </TRow>
                }
                { !isRequesting && !invoices.length &&
                  <TRow>
                    <TCell colspan={8}>
                      <Row className={'w-full justify-center'}>
                        <Col className={'justify-center h-48'}>
                          <span>No data</span>
                        </Col>
                      </Row>
                    </TCell>
                  </TRow>
                }
                { !isRequesting && invoices.length &&
                  invoices.map((invoice, index) => {
                    return <TRow key={index}>
                      <TCell>
                        <span>{invoice['uuid']}</span>
                      </TCell>
                      <TCell>
                        <span>{invoice['product']['name']}</span>
                      </TCell>
                      <TCell>
                        <span>{invoice['customer_email']}</span>
                      </TCell>
                      <TCell>
                        <span>{invoice['coins_amount']}</span>
                      </TCell>
                      <TCell>
                        <span>{invoice['status']}</span>
                      </TCell>
                      <TCell>
                        <span>{(new Date(invoice['created_at'])).toISOString()}</span>
                      </TCell>
                      <TCell>
                        <Row className={'w-full justify-center'}>
                          <Col className={'justify-center gap-4'}>
                            <Button
                              type={'default'}
                              onClick={() => {
                                setSelectedInvoice(invoice);

                                setInvoiceCardVisibility(true);
                              }}
                            >
                              <span>Info</span>
                            </Button>

                            { isInvoiceCancellable(invoice) &&
                              <Button
                                type={'danger'}
                                onClick={() => {
                                  cancelInvoice(invoice);
                                }}
                              >
                                <span>Cancel</span>
                              </Button>
                            }
                          </Col>
                        </Row>
                      </TCell>
                    </TRow>
                  })
                }
              </TBody>
            </Table>
          </Row>
        </Col>
      </Card>

      <Row className={'w-full justify-center'}>
        <Col className={'w-full justify-start'}>
          { isNewCustomInvoiceCardVisible &&
            <Modal>
              <ModalHeader
                title={'Create Invoices'}
                onCloseHandler={() => {
                  setNewCustomInvoiceCardVisibility(false);
                }}
              />
              <ModalBody>
                <Form
                  fields={new_invoice_fields}
                  data={newInvoice}
                  onInput={(_newState) => {
                    setNewInvoice({
                      ...newInvoice,
                      ..._newState
                    });
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Col className={'w-full justify-center'}>
                  <Row className={'w-full justify-between px-[100px]'}>
                    <button
                      className={"w-[120px] h-[40px] bg-very-white outline outline-1 outline-aspide-blue rounded-[30px] text-very-black"}
                      onClick={() => {
                        setNewCustomInvoiceCardVisibility(false);
                      }}
                    >
                      <span>Close</span>
                    </button>
                    
                    <button
                      className={"w-[130px] h-[40px] bg-aspide-blue rounded-[30px] text-very-white"}
                      onClick={() => {
                        setNewCustomInvoiceCardVisibility(false);

                        submitInvoice();
                      }}
                    >
                      <span>Send</span>
                    </button>
                  </Row>
                  <span className={"text-gray-500 font-montserrat font-normal text-[14px] text-center"}>Please consider the volatility of the rate</span>
                </Col>
              </ModalFooter>
            </Modal>
          }
          { isInvoiceCardVisible &&
            <Modal>
              <ModalHeader
                title={`Invoice id#${selectedInvoice['id'] || ''}`}
                onCloseHandler={() => {
                  setInvoiceCardVisibility(false);
                }}
              />
              <ModalBody>
                  <Form
                    disabled={true}
                    fields={invoice_card}
                    data={selectedInvoice}
                    onInput={data => {
                    }}
                  />
              </ModalBody>
              <ModalFooter>
                <Col className={'w-full justify-center'}>
                  <Row className={'w-full justify-between'}>
                    <Button
                      type={'default'}
                      onClick={() => {
                        setInvoiceCardVisibility(false);
                      }}
                    >
                      <span>Close</span>
                    </Button>
                  </Row>
                </Col>
              </ModalFooter>
            </Modal>
          }
        </Col>
      </Row>
    </Col>
  )
}
