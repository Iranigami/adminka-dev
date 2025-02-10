// @ts-ignore
import React, { PropsWithChildren } from 'react';

type SelectProps = {
  required?: boolean;
  value: number|string|boolean;
  label?: string;
  options: object[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  className?: string;
};

export default function Select(props: PropsWithChildren<SelectProps>) {
  return (
    <div className={`${props.className || ''}`}>
      {props.label &&
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {props.label}
          { props.required &&
            <span>&nbsp;<b>*</b></span>
          }
        </label>
      }
      <select
        value={props.value as string}
        required={props.required}
        className={'shadow appearance-none border rounded w-full py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
        disabled={props.disabled}
        onChange={e => {
          props.onChange(e);
        }}
      >
        {
          props.options.map((option, index) => {
            return (
              <option key={index} value={option['value']}>
                { option['label'] }
              </option>
            )
          })
        }
      </select>
    </div>
  )
}
