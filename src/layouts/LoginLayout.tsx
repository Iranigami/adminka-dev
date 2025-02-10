import { PropsWithChildren } from 'react';
import React from 'react'

type DefaultLayoutProps = {
};



export default function LoginLayout(props: PropsWithChildren<DefaultLayoutProps>) {

  return (
    <div className='flex h-screen bg-white'> 
        <main className={'w-full min-w-[1440px] h-full'}>
          <div className='py-8 w-full max-w-9xl mx-auto'>
          { props.children }
          </div>
        </main>
    </div>
  );
}
