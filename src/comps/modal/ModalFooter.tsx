// @ts-ignore
import React, { PropsWithChildren } from 'react';

type ModalFooterProps = {

};

export default function ModalFooter(props: PropsWithChildren<ModalFooterProps>){
    return(
        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        {
          props.children
        }
        </div>
    )
}