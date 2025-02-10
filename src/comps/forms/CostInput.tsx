// @ts-ignore
import React from 'react';
import Input from './Input';
import Col from '../layout/Col';
import Row from '../layout/Row';

type CostInputProps = {
  label?: string;
  placeholder?: string;
  onInput: (e: React.FormEvent<HTMLInputElement>) => void;
  value: object;
  className?: string;
  disabled?: boolean;
  required?: boolean;
};

export default function CostInput(props: CostInputProps) {
  // const [isRequesting, setRequesting] = useState(false);
  // const [coins, setCoins] = useState(0.00);
  //
  // const toNumber = (value: string|number) => {
  //   return typeof value === 'number' ? value : parseFloat(value);
  // };
  //
  // const fetchCoins = (currency_amount: string, coin: string, currency: string) => {
  //   const val: number = toNumber(currency_amount);
  //
  //   const user: UserState = useSelector((state: RootState) => state.user);
  //   const cookieStorage: CookieStorage = CookieStorage.getInstance();
  //   const apiToken = user.token || cookieStorage.Get('token');
  //
  //   if (!apiToken) {
  //     return;
  //   }
  //
  //   setRequesting(true);
  //   axios.get(`${API_URL}/finances/exchange?currency=${currency}&coin=${coin}&amount=${val}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${apiToken}`
  //     },
  //     withCredentials: false,
  //     // @ts-ignore
  //     crossOrigin: false
  //   })
  //     .then(r => {
  //       setRequesting(false);
  //
  //       setCoins(parseFloat(r.data['coins']))
  //     })
  //     .catch(e => {
  //       console.error(e);
  //     })
  // };

  return (
    <Col className={'w-full justify-center'}>
      <Row>
        { props.label &&
          (
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {props.label}
              { props.required &&
                <span>&nbsp;<b>*</b></span>
              }
            </label>
          )
        }
      </Row>
      <Row className={'w-full'}>
        <Input
          required={props.required}
          value={props.value['value']}
          label={props.label}
          placeholder={props.placeholder}
          className={props.className}
          disabled={props.disabled}
          type={'number'}
          step={0.01}
          onInput={(e) => {
            props.onInput(e);
          }}
        />
      </Row>

      <Row className={'w-full mt-4'}>
        <Input
          required={props.required}
          disabled={true}
          value={props.value['coins']}
          type={'number'}
          step={0.0001}
          onInput={() => {}}
        />
      </Row>
    </Col>
  )
}
