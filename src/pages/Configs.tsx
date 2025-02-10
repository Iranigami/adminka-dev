import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../comps/layout/Card';
import Form from '../comps/forms/Form';
import Row from '../comps/layout/Row';
import Col from '../comps/layout/Col';
import Button from '../comps/buttons/Button';
import Spinner from '../comps/spinners/Spinner';
import { admin_config } from '../configs/forms/admin_config';
import { API_URL } from '../configs/api';
import { UserState } from '../redux/usersReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import CookieStorage from '../services/CookieStorage';
import { Navigate } from 'react-router-dom';

class AdminConfigState {
  public isInitializing: boolean = false;
}
const adminConfigState = new AdminConfigState();

export default function Configs() {
  const [isRequesting, setRequesting] = useState(true);
  const [newsText, setNews] = useState("")
  const [adminConfig, setAdminConfig] = useState({
    commission: undefined,
    max_open_invoices: 99,
    invoices_ttl: 3,
    ad_text: newsText,
  });
  const getNews= () => {
    axios.get(
      `${API_URL}/ads`,
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
        if (r.status !== 200) {

          return r.data['content'];
        }
        setNews(r.data['content'])
        return r.data['content'];
      })
      .catch(e => {
        
        console.error(e);
      });
  };

  useEffect(() => {
      getNews();
      return;
    }
  );
  const user: UserState = useSelector((state: RootState) => state.user);
  const cookieStorage: CookieStorage = CookieStorage.getInstance();
  const apiToken = user.token || cookieStorage.Get('token');

  const fetchConfig = () => {
    adminConfigState.isInitializing = true;
    setRequesting(true);

    axios.get(`${API_URL}/admin/config`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      },
      withCredentials: false,
      // @ts-ignore
      crossOrigin: false
    })
      .then(r => {
        setAdminConfig(r.data);

        setRequesting(false);
        adminConfigState.isInitializing = false;
      })
      .catch(e => {
        console.error(e);

        setRequesting(false);
        adminConfigState.isInitializing = false;
      });
  };

  const submitConfig = () => {
    setRequesting(true);

    axios.post(
      `${API_URL}/admin/config`,
      adminConfig,
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
        setRequesting(false);
      })
      .catch(e => {
        console.error(e);

        setRequesting(false);
      });
  };

  useEffect(() => {
    if (adminConfigState.isInitializing) {
      return;
    }

    fetchConfig();
  }, []);

  return (
    <Col className={'shops-root w-full min-h-96 justify-center mt-[30px]'}>
      <Card className={'w-1/2 bg-kinda-light-blue justify-center mx-auto rounded-[14px]'}>
        { isRequesting &&
          <Col className={'w-full justify-center min-h-96'}>
            <Row className={'w-full justify-center'}>
              <Spinner />
            </Row>
          </Col>
        }

        { !isRequesting &&
          <Col className={'w-full'}>
            <Row>
              <Form
                fields={admin_config}
                data={adminConfig}
                onInput={data => {
                  setAdminConfig({
                    ...adminConfig,
                    ...data
                  });
                }}
              />
              
            </Row>

            <Row className={'w-full justify-end'}>
              <Button
                type={'success'}
                onClick={() => {
                  submitConfig();
                  setTimeout(()=>{window.location.reload()}, 500)
                }}
              >
                <span>Save</span>
              </Button>
            </Row>
          </Col>
        }
      </Card>
    </Col>
  )
}
