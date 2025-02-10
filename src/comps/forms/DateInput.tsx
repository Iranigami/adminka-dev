// @ts-ignore
import React from 'react';

type DateInputProps = {
  label?: string;
  value?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function DateInput(props: DateInputProps) {
  return (
    <div className={'w-full'}>
      <input
        className={`${props.className}`}
        value={props.value}
        type={'date'}
        onChange={e => {
          props.onChange(e);
        }}
      />
    </div>
  )
}