// @ts-ignore
import React, { PropsWithChildren } from 'react';

type TCellProps = {
  className?: string
  isSortable?: boolean
  colspan?: number
};

export default function TCell(props: PropsWithChildren<TCellProps>) {
  return (
    <td
      colSpan={props.colspan}
      className={`px-6 py-4 bg-kinda-light-blue ${props.className}`}
    >
      { props.children }
    </td>
  )
}
