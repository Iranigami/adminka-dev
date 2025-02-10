// @ts-ignore
import React, { PropsWithChildren } from 'react';
import Row from '../layout/Row';
import Col from '../layout/Col';
import Input from './Input';
import Select from './Select';
import CostInput from './CostInput';
import Field from '../../models/forms/Field';
import EInputTypes from '../../models/forms/EInputTypes';
import FileInput from './FileInput';

type FormProps = {
  fields: Field[];
  data: object;
  className?: string;
  onInput: (data: object) => void;
  disabled?: boolean;
};

export default function Form(props: PropsWithChildren<FormProps>) {
  const handleInput = (field: Field, value: string|number) => {
    const _state = {};
    _state[field.getKey()] = value;

    props.onInput(_state);
  };

  const renderValue = (field: Field): string|number|object => {
    const _handlerFn = field.getDataHandler();
    if (_handlerFn) {
      return _handlerFn(props.data);
    }

    if (field.getType() === EInputTypes.COST) {
      return {
        value: props.data[field.getKey()] || (field['default'] || undefined),
        coins: props.data[`${field.getKey()}_coins`] || 0.00
      };
    }

    return props.data[field.getKey()] || (field['default'] || undefined);
  };

  const renderInput = (field:Field) => {
    const _type = field.getType();

    if (_type === EInputTypes.SELECT) {
      return <Select
        required={field.isRequired()}
        value={renderValue(field) as string}
        label={field.getLabel()}
        options={field.getOptions()}
        disabled={field.isDisabled() || props.disabled}
        onChange={e => {
          const input = e.target;

          handleInput(field, input.value);
        }}
      />
    }

    if (_type === EInputTypes.COST) {
      return <CostInput
        onInput={e => {
          const input: HTMLInputElement = e.target;

          handleInput(field, input.value);
        }}
        value={renderValue(field) as object}
      />
    }

    return (
      <Input
        required={field.isRequired()}
        type={field.getType()}
        label={field.getLabel()}
        placeholder={field.getPlaceholder()}
        key={field.getKey()}
        value={renderValue(field) as string}
        disabled={field.isDisabled() || props.disabled}
        isArea={field.isArea()}
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          const input: HTMLInputElement = e.target;
          handleInput(field, input.value);
        }}
      />
    )
  };

  const renderField = (field: Field) => {
    return renderInput(field);
  };

  return(
    <form className={`form ${props.className}`}>
      <Col>
        {
          props.fields.map((field, index) => {
            return (
              <Row
                className={`justify-center ${index < 1 ? '' : 'mt-5'}`}
                key={index}
              >
                {
                  (
                    renderField(field)
                  )
                }
              </Row>
            )
          })
        }
      </Col>
      {
        props.children
      }
    </form>
  )
}