// @ts-ignore
import React from 'react';

type FileInputProps = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string|number;
  accept: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export default function FileInput(props: FileInputProps) {
  return (
    <div className={'w-full'}>
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
      <input
        required={props.required}
        className={`${props.className} shadow appearance-none border rounded py-2 px-3 text-light-aspide leading-tight focus:outline-none focus:shadow-outline`}
        type={'file'}
        accept={props.accept}
        multiple={false}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
        onChange={e => {
          props.onChange(e);
        }}
      />
    </div>
  )
}
