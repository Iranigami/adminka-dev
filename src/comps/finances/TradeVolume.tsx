// @ts-ignore
import React from 'react';
import Card from '../layout/Card';
import './crypto_balance.css'
import Row from '../layout/Row';
import Col from '../layout/Col';
import Chart from "react-apexcharts";

type TradeVolumeProps = {
  curr_date: string;
  data: string;
  className: string;
  
};

export default function TradeVolume(props: TradeVolumeProps) {
  return (
    <Card className={`title trade-volume-card ${props.className} outline justify-center items-center text-center outline-1 outline-aspide-blue rounded-[12px] py-auto bg-kinda-light-blue`}>
          <span className={"font-montserrat font-medium text-[16px] text-aspide-blue mt-1"}>Volume</span>
          <div className={"font-montserrat font-semibold text-[28px] text-very-black"}>{props.data}&nbsp;LTC</div>
          <div className={"font-montserrat font-normal text-[12px] text-aspide-blue"}>{props.curr_date}</div>
    </Card>
  )
}