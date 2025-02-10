// @ts-ignore
import React, { PropsWithChildren } from 'react';

type THeadProps = {
  className?: string
};

export default function THead(props: PropsWithChildren<THeadProps>) {
  return (
    <thead className={`text-[16px] text-aspide-blue font-montserrat font-semibold uppercase ${props.className}`}>
      { props.children }
    </thead>
  )
}
