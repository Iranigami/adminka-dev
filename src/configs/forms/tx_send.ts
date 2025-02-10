import Field from '../../models/forms/Field';
import EInputTypes from '../../models/forms/EInputTypes';
import Option from '../../models/forms/Option';

export const tx_send = [
  Field.New()
    .setLabel('Sender address')
    .setKey('from')
    .setRange(16, 128),
  Field.New()
    .setLabel('Recipient address')
    .setKey('to')
    .setRange(16, 128),
  Field.New()
    .setLabel('Coin')
    .setKey('coin')
    .setRange(1, 8),
  Field.New()
    .setLabel('Amount')
    .setKey('coins')
    .setType(EInputTypes.NUMBER)
    .setRange(0.000001, 99999999),
  Field.New()
    .setLabel('Is TestNet ?')
    .setKey('is_testnet')
    .setType(EInputTypes.SELECT)
    .setOptions([
      new Option(1, 'YES'),
      new Option(0, 'NO')
    ])
];
