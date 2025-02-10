// @ts-ignore
import React from 'react';
import { coins } from '../../configs/coins';
import Card from '../layout/Card';
import './crypto_balance.css'
import Row from '../layout/Row';
import Col from '../layout/Col';

type CryptoBalanceProps = {
  data: object
  withdrawHandler: Function
  className: string
  butClass: string
  coinClass: string
  dataClass: string

};

export default function BalanceInfo(props: CryptoBalanceProps) {
  const coinInfo = coins.find(entry => entry.key === props.data['coin']);
  if (!coinInfo) {
    throw new Error("failed to find appropriete coin meta data");
  }

  return (
    <Card className={`${props.className} bg-kinda-light-blue outline outline-1 outline-aspide-blue items-center`}>
      <Col>
        <Row>
          <img
            src={coinInfo.icon}
            alt={coinInfo.key}
          />
          <div className={`${props.dataClass}text-very-black font-montserrat font-medium`}>
            {coinInfo.name}
          </div>
        </Row>
        <Row className={"justify-center"}>
          <div className={`font-semibold font-montserrat ${props.coinClass} text-aspide-blue uppercase`}>
            {props.data['coins']['confirmed']}
            &nbsp;
            {coinInfo.key}
          </div>
        </Row>
        <Row className={"justify-center"}>
          <span className={`font-montserrat font-normal ${props.dataClass} text-[#87888D]`}>
            $ {props.data['currency']['confirmed']}
          </span>
        </Row>
        <Row className={"justify-center"}>
          <button data-modal-hide="default-modal" type="button" className={`${props.butClass} bg-very-white rounded-full outline outline-1 outline-aspide-blue text-aspide-blue text-sm font-montserrat font-semibold flex justify-center items-center text-center`} onClick={()=>{
            props.withdrawHandler();
          }}>
            Withdraw
          </button>
        </Row>
      </Col>
    </Card>
  )
}