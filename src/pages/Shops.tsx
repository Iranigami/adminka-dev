// @ts-ignore
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Card from '../comps/layout/Card';
import Form from '../comps/forms/Form';
import Row from '../comps/layout/Row';
import Col from '../comps/layout/Col';
import Button from '../comps/buttons/Button';
import { shop_fields } from '../configs/forms/shop_fields';
import { API_URL } from '../configs/api';
import CookieStorage from '../services/CookieStorage';
import { UserState } from '../redux/usersReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import Spinner from '../comps/spinners/Spinner';

class ShopsState {
  isInitializing: boolean = false;
}
const shopsState = new ShopsState();

export default function Shops() {
  const navigate = useNavigate();
  const clearToken = () => {
    CookieStorage.getInstance().Set('token', "undefined");
    navigate('/admin/login');
  };
  const [shop, setShop] = useState({
    id: null,
    name: 'Untitled',
    admin_email: null,
    support_email: null,
    url: null
  });
  const [isLoading, setLoading] = useState(true);

  const user: UserState = useSelector((state: RootState) => state.user);
  const cookieStorage: CookieStorage = CookieStorage.getInstance();
  const apiToken = user.token || cookieStorage.Get('token');

  useEffect(() => {
    if (!apiToken) {
          clearToken();
      return;
    }

    if (shopsState.isInitializing) {
      return;
    }

    shopsState.isInitializing = true;
    setLoading(true);
    axios.get(`${API_URL}/shops?skip=0&limit=1`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      },
      withCredentials: false,
      // @ts-ignore
      crossOrigin: false
    })
      .then(r => {
        setShop({
          ...shop,
          ...(r.data.list[0] || {})
        });

        shopsState.isInitializing = false;
        setLoading(false);
      })
      .catch(e => {
        console.error(e);

        shopsState.isInitializing = false;
        setLoading(false);
      });
  }, []);

  const submitForm = () => {
    setLoading(true);

    axios.post(`${API_URL}/shops?id=${shop.id}`,
      shop,
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

  return (
    <Col className={'shops-root w-full min-h-96'}>
      <Card className={'w-full bg-kinda-light-blue rounded-[12px]'}>
        { isLoading &&
          (
            <Col className={'w-full h-full min-h-96 justify-center'}>
              <Row className={'justify-center w-full'}>
                <Spinner />
              </Row>
            </Col>
          )
        }
        { !isLoading &&
          (
            <Form className={'w-full'}
              fields={shop_fields}
              data={shop}
              disabled={isLoading}
              onInput={data => {
                console.log('onInput: ', data);
                setShop({
                  ...shop,
                  ...data
                });
              }}
            />
          )
        }

        <Row className={'mt-8 w-full justify-center'}>
          <button
            className={"bg-aspide-blue rounded-[30px] w-[214px] h-[44px] font-montserrat text-very-white"}
            onClick={() => {
              submitForm();
            }}
          >
            <span>Save</span>
          </button>
        </Row>
      </Card>
    </Col>
  )
}
