import { PropsWithChildren } from 'react';
import React from 'react'

type GuestLayoutProps = {
};

export default function GuestLayout(props: PropsWithChildren<GuestLayoutProps>) {
  return (
    <div
      className={'flex flex-row h-screen main w-screen bg-very-white'}
    >
      { props.children }
    </div>
  );
}
