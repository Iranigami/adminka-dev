// @ts-ignore
import React, { PropsWithChildren } from 'react';

type ButtonProps = {
  className? :string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: string;
  disabled?: boolean;
};

export default function Button(props: PropsWithChildren<ButtonProps>) {
  const buttonStyles = {
    'success': 'text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
    'info': 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    'danger': 'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800',
    'default': 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"',
  };
  const type = props.type || 'info';
  const btnStyle = buttonStyles[type];
  const className = `${btnStyle} focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 ${props.className}`;

  return (
    <button
      disabled={props.disabled}
      className={className}
      onClick={e => {
        props.onClick(e);
      }}
    >
      { props.children }
    </button>
  )
}
