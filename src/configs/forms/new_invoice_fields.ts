import Field from '../../models/forms/Field';
import EInputTypes from '../../models/forms/EInputTypes';

export const new_invoice_fields = [
  Field.New()
    .setKey('currency_amount')
    .setLabel('USD')
    .setType(EInputTypes.NUMBER)
    .setStep(0.01)
    .setPlaceholder('5.45'),
  Field.New()
    .setKey('customer_email')
    .setLabel('EMail')
    .setType(EInputTypes.EMAIL)
    .setPlaceholder('customer@example.com'),
  Field.New()
    .setKey('shop_url')
    .setLabel('Redirect URL')
    .setPlaceholder('http://example.com/purchase/nY29nRRf12/completed')
    .setRequired(false)
];
