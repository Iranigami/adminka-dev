// @ts-ignore
import React, { PropsWithChildren } from 'react';

type ModalProps = {
    className?: string
};

export default function Modal(props: PropsWithChildren<ModalProps>){
    
    return (
        <div id="default-modal" className={`${props.className} absolute overflow-y-auto overflow-x-hidden fixed center z-50 justify-center items-center w-full md:inset-0 max-h-full`}>
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {
                        props.children
                    }
                </div>
            </div>
        </div>
    )
}