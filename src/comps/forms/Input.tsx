// @ts-ignore
import React, { PropsWithChildren } from 'react';
import copy from "../../assets/svg/copy.svg";
import toast, { Toaster } from 'react-hot-toast';

type InputProps = {
  required?: boolean;
  label?: string;
  placeholder?: string;
  onInput: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string|number;
  type?: string;
  className?: string;
  disabled?: boolean;
  step?: number;
  isArea?: boolean;
  
};

export default function Input(props: PropsWithChildren<InputProps>){
  const _type = props.type || 'text';
  const _value = props.value || '';
  const notify = (message: string) => toast(message);
  return(
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
      <div className={"justify-between flex"}>
      <textarea
        disabled={false}
        required={props.required}
        className={`${!props.isArea && "hidden"} w-full border bg-very-white rounded py-2 px-3 text-very-black leading-tight`}
        placeholder={props.placeholder}
        value={_value}
        onInput={e => {
        props.onInput(e);
              }}/>
      <input
        id="input"
        required={props.required}
        className={`${props.className} ${!props.disabled || "bg-gray-200"} ${props.isArea && "hidden"} w-full appearance-none border bg-very-white ${props.type=="file" && "outline outline-1 outline-gray-500"} rounded py-2 px-3 text-very-black leading-tight`}
        type={_type}
        placeholder={props.placeholder}
        value={_value}
        disabled={props.disabled}
        step={props.step}
        onInput={e => {
          props.onInput(e);
        }}
      />
      <img 
        src={copy} 
        className={`w-7 -ml-[50px] mr-3 ${props.disabled || "hidden"}`}
        onClick={()=>{
          navigator.clipboard.writeText(_value);
          notify( "Copied");

        }
        }
        />
        </div>
        <Toaster />
    </div>
  )
}