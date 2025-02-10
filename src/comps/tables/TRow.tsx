// @ts-ignore
import React, { PropsWithChildren } from 'react';

type TRowProps = {
  className?: string
};

export default function TRow(props: PropsWithChildren<TRowProps>) {
  return (
    <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${props.className}`}>
      { props.children }
    </tr>
  )
}
