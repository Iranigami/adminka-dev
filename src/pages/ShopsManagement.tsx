import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
import { stateToLabel } from '../models/EShopStates';
import Button from '../comps/buttons/Button';
import { shop_card_fields } from '../configs/forms/shop_card_fields';

class ShopsManagementState {
  public isInitializing: boolean = false;
}
const shopsManagementState = new ShopsManagementState();

export default function ShopsManagement() {
  const navigate = useNavigate();
  const clearToken = () => {
    CookieStorage.getInstance().Set('token', "");
    navigate("/admin/login");
  };
  const [isLoading, setLoading] = useState(true);
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState({});
  const [isShopCardVisible, setShopCardVisibility] = useState(false);

  const user: UserState = useSelector((state: RootState) => state.user);
  const cookieStorage: CookieStorage = CookieStorage.getInstance();
  const apiToken = user.token || cookieStorage.Get('token');

  const fetchShops = () => {
    setLoading(true);

    axios.get(
      `${API_URL}/admin/shops?skip=0&limit=5`,
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
        setShops(r.data['list']);

        shopsManagementState.isInitializing = false;
        setLoading(false);
      })
      .catch(e => {
        console.error(e);

        shopsManagementState.isInitializing = false;
        setLoading(false);
      });
  };

  const renderCommission = (shop: object) => {
    return <span>{shop['commission'] || '-'} %</span>
  };

  const renderBalances = (shop: object) => {
    return shop['balances'].map((balance: object, index: number) => {
      return <span key={index}>{balance['confirmed_coins']}&nbsp;{balance['coin']}</span>
    });
  };

  const renderStatus = (shop: object) => {
    return <span>{stateToLabel[shop['status']]}</span>
  };

  const submitShopCard = (state: object) => {
    setLoading(true);

    axios.post(
      `${API_URL}/admin/shops`,
      state,
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
        setLoading(false);
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

    if (shopsManagementState.isInitializing) {
      return;
    }

    shopsManagementState.isInitializing = true;
    fetchShops();
  }, []);

  return (
    <Col className={'shops-root w-full min-h-96'}>
      <Card className={'w-full'}>
        <Col className={'w-full'}>
          <Row className={'w-full'}>
            <Table>
              <THead>
                <TRow>
                  <TCol>
                    <span>UUID</span>
                  </TCol>
                  <TCol>
                    <span>Name</span>
                  </TCol>
                  <TCol>
                    <span>Commission</span>
                  </TCol>
                  <TCol>
                    <span>Balances</span>
                  </TCol>
                  <TCol>
                    <span>Status</span>
                  </TCol>
                  <TCol>
                    <span>Controls</span>
                  </TCol>
                </TRow>
              </THead>
              <TBody>
                { isLoading &&
                  <TRow>
                    <TCell colspan={6}>
                      <Row className={'w-full justify-center'}>
                        <Col className={'justify-center h-48'}>
                          <Spinner />
                        </Col>
                      </Row>
                    </TCell>
                  </TRow>
                }
                { !isLoading && !shops.length &&
                  <TRow>
                    <TCell colspan={6}>
                      <Row className={'w-full justify-center'}>
                        <Col className={'justify-center h-48'}>
                          <span>No data</span>
                        </Col>
                      </Row>
                    </TCell>
                  </TRow>
                }
                { !isLoading && shops.length &&
                  shops.map((shop, index) => {
                    return <TRow key={index}>
                      <TCell>
                        <span>{shop['uuid']}</span>
                      </TCell>
                      <TCell>
                        <span>{shop['name']}</span>
                      </TCell>
                      <TCell>
                        {renderCommission(shop)}
                      </TCell>
                      <TCell>
                        {renderBalances(shop)}
                      </TCell>
                      <TCell>
                        {renderStatus(shop)}
                      </TCell>
                      <TCell>
                        <Col className={'justify-center gap-4'}>
                          <Row className={'w-full justify-center'}>
                            <Button
                              type={'default'}
                              onClick={() => {
                                setSelectedShop(shop);

                                setShopCardVisibility(true);
                              }}
                            >
                              <span>Card</span>
                            </Button>
                          </Row>
                        </Col>
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
        { isShopCardVisible &&
          <Modal>
            <ModalHeader
              title={'Shop Card'}
              onCloseHandler={() => {
                setShopCardVisibility(false);
              }}
            />
            <ModalBody>
              <Form
                fields={shop_card_fields}
                data={selectedShop}
                onInput={data => {
                  setSelectedShop({
                    ...selectedShop,
                    ...data
                  });
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Col className={'w-full justify-center'}>
                <Row className={'w-full justify-between'}>
                  <Button
                    type={'default'}
                    onClick={() => {
                      setShopCardVisibility(false);
                    }}
                  >
                    <span>Close</span>
                  </Button>

                  <Button
                    type={'success'}
                    onClick={() => {
                      submitShopCard(selectedShop);
                      setShopCardVisibility(false);
                      console.log(selectedShop);
                      setTimeout(()=>{fetchShops()}, 500)
                    }}
                  >
                    <span>Save</span>
                  </Button>
                </Row>
              </Col>
            </ModalFooter>
          </Modal>
        }
      </Row>
    </Col>
  )
}
