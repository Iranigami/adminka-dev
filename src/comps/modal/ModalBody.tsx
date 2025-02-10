// @ts-ignore
import React, { PropsWithChildren } from 'react';

type ModalBodyProps = {

  };

export default function ModalBody(props: PropsWithChildren<ModalBodyProps>){
    return(
        <div className="p-4 md:p-5 space-y-4">
            {
                props.children
            }
        </div>
    )
}