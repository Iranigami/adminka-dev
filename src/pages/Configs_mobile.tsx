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
import { Navigate, useNavigate } from 'react-router-dom';
import logout from '../assets/svg/logout.svg'

class AdminConfigState {
  public isInitializing: boolean = false;
}
const adminConfigState = new AdminConfigState();

export default function Configs_mobile() {
    const navigate = useNavigate();
    const clearToken = () => {
        CookieStorage.getInstance().Set('role', '');
        CookieStorage.getInstance().Set('token', '');
        navigate('/admin/login');
      };
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
    <Col className={'shops-root w-full min-h-[24vw] justify-center'}>
      <div className={"flex justify-between font-montserrat font-semibold text-[7vw] mb-[5vw]"}>
        Configurations
        <img className={"w-[8vw]"} onClick={clearToken} src={logout}/>
      </div>
      <Card className={'w-[92vw] bg-kinda-light-blue justify-center rounded-[14px]'}>
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
                className={"w-[100vw]"}
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

            <Row className={'w-full justify-center mt-[4vw]'}>
              <button
                className={"bg-aspide-blue rounded-[8vw] w-[53.5vw] h-[11vw] text-very-white"}
                onClick={() => {
                  submitConfig();
                  setTimeout(()=>{window.location.reload()}, 500)
                }}
              >
                <span>Save</span>
              </button>
            </Row>
          </Col>
        }
      </Card>
    </Col>
  )
}
