import Field from '../../models/forms/Field';

export const withdraw_fields = [
  Field.New()
    .setLabel('Address')
    .setKey('address')
    .setRange(1, 128),
];
