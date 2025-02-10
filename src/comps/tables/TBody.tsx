// @ts-ignore
import React, { PropsWithChildren } from 'react';

type TBodyProps = {
  className?: string
};

export default function TBody(props: PropsWithChildren<TBodyProps>) {
  return (
    <tbody className={props.className}>
      { props.children }
    </tbody>
  )
}
