import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../layout/Card';
import './crypto_balance.css'
import Row from '../layout/Row';
import Col from '../layout/Col';
import Spinner from '../spinners/Spinner';
import { API_URL } from '../../configs/api';
import { UserState } from '../../redux/usersReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import CookieStorage from '../../services/CookieStorage'
import React from 'react';
import invoices from '../../assets/svg/finances/invoices.svg'

type InvoicesCountProps = {
  handleOnLoadingComplete?: () => void;
  isLoading?: boolean;
  from?: string;
  to?: string;
  className?: string;
  c1: string;
  c2: string;
  c3: string;
  filters: object;
  label: string;
  bg: string;
  w: string;
  h: string;
  out_color: string;
  count_font: string;
  onError: (err: string) => void;
};

export default function InvoicesCount(props: InvoicesCountProps) {
  const [isFetching, setFetching] = useState(true);
  const [count, setCount] = useState(0);

  const user: UserState = useSelector((state: RootState) => state.user);
  const cookieStorage: CookieStorage = CookieStorage.getInstance();
  const apiToken = user.token || cookieStorage.Get('token');
  let url = `${API_URL}/invoices/count`;
  if (props.from && props.to) url += `?from=${props.from}&to=${props.to}`
  useEffect(() => {
    if (!apiToken) {
      setFetching(true);
      props.onError('unauthenticated');
      return;
    }
  
    axios.post(
      url,
      {
        filters: props.filters
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
        setCount(r.data['count']);
        if (props.handleOnLoadingComplete) props.handleOnLoadingComplete();
        setFetching(false);
      })
      .catch(e => {
        if (props.handleOnLoadingComplete) props.handleOnLoadingComplete();
        console.error(e);
      });
  }, [props.isLoading]);

  return (
    <Card className={`title invoices-volume-card ${props.bg} outline outline-1 outline-${props.out_color} ${props.className} ${props.w} ${props.h}`}>
      { isFetching &&
        <Col className={'w-full justify-center items-center'}>
          <Row className={'w-full justify-center items-center'}>
            <Spinner />
          </Row>
        </Col>
      }
      { !isFetching &&
        <Col>
          <Row className={"items-center"}>
            <img className={`mr-${props.c1} ${props.label=="Invoices" ? "" : "hidden"}`}src={invoices}/>
            <span className={`font-montserrat font-medium text-${props.c2} text-aspide-blue`}>{props.label || 'Invoices'}</span>
            {/*insert date span*/}
          </Row>
          <Row className={`mt-${props.c1} w-full justify-center`}>
            <span className={`w-full text-center font-montserrat font-semibold ${props.count_font} text-very-black`}>{count}</span>
          </Row>
          <Row className={`-mt-${props.c2} w-full justify-center`}>
            <span className={`w-full text-center font-montserrat font-light text-${props.c3} text-very-black`}>inch.</span>
          </Row>
        </Col>
      }
    </Card>
  )
}