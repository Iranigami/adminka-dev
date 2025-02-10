import Field from '../../models/forms/Field';
import EInputTypes from '../../models/forms/EInputTypes';
import { shopStateOptions } from './select/shop_states';

export const shop_card_fields = [
  Field.New()
    .setKey('name')
    .setLabel('Name')
    .setDisabled(true),
  Field.New()
    .setKey('uuid')
    .setLabel('UUID')
    .setDisabled(true),
  Field.New()
    .setKey('admin_email')
    .setLabel('Admin EMail')
    .setType(EInputTypes.EMAIL)
    .setDisabled(true),
  Field.New()
    .setKey('url')
    .setLabel('Shop URL')
    .setRequired(false)
    .setDisabled(true),
  Field.New()
    .setKey('commission')
    .setLabel('Commission (%)')
    .setRequired(false),
  Field.New()
    .setType(EInputTypes.SELECT)
    .setOptions(shopStateOptions)
    .setKey('status')
    .setLabel('Status'),
];
