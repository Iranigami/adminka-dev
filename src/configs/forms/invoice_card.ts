import Field from '../../models/forms/Field';
import EInputTypes from '../../models/forms/EInputTypes';

export const invoice_card = [
  Field.New()
    .setKey('uuid')
    .setLabel('UUID'),
  Field.New()
    .setLabel('URL')
    .setKey('url'),
  Field.New()
    .setKey('status')
    .setLabel('Status'),
  Field.New()
    .setKey('coins_amount')
    .setLabel('Coins'),
  Field.New()
    .setKey('satoshi_amount')
    .setLabel('Satoshi'),
  Field.New()
    .setKey('coin')
    .setLabel('Coin'),
  Field.New()
    .setKey('customer_uuid')
    .setLabel('Customer UUID'),
  Field.New()
    .setKey('customer_email')
    .setLabel('Customer EMail')
];
