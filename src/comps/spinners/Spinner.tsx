// @ts-ignore
import React from 'react';
import './spinner.css';

type SpinnerProps = {
  style?: number,
  classes?: string
};

export default function Spinner(props: SpinnerProps) {
  const className = `loader_${props.style || 6} ${props.classes || ''}`

  return (
    <span
      className={className}
    />
  );
}
