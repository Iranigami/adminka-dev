import Spinner from '../spinners/Spinner';
import Row from '../layout/Row';
import Col from '../layout/Col';
import Card from '../layout/Card';
import React from 'react';

type CommissionsSumProps = {
  className?: string;
  loading: boolean;
  coin: string;
  coins: string;
};

export default function CommissionsSum(props: CommissionsSumProps) {
  return (
    <Card className={`commission-sum-info ${props.className} w-32`}>
      { props.loading &&
        <Col className={'w-full h-full justify-center'}>
          <Row className={'w-full justify-center'}>
            <Spinner />
          </Row>
        </Col>
      }

      { !props.loading &&
        <Col className={'w-full justify-center'}>
            <Row>
              <span className={"font-montserrat font-normal text-center text-[14px] text-aspide-blue"}>Commission {props.coin.toUpperCase()}:&nbsp;</span>
            </Row>
            <Row>
              <span className={"mt-[25px] font-montserrat font-medium text-center text-[24px] text-very-black"}>{parseFloat(props.coins).toFixed(4)} {props.coin.toUpperCase()}</span>
          </Row>
        </Col>
      }
    </Card>
  )
}
