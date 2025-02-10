// @ts-ignore
import React, { PropsWithChildren } from 'react';

type ModalHeaderProps = {
    title: string
    onCloseHandler: Function 
};

export default function ModalHeader(props: PropsWithChildren<ModalHeaderProps>){
    return(
        <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t bg-kinda-light-blue rounded-b-[9px] w-full">
        <h3 className="text-xl font-semibold text-gray-900 mx-auto">
            {props.title}
        </h3>
        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>{props.onCloseHandler()}}>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close modal</span>
        </button>
    </div>
    )
}