import Field from '../../models/forms/Field';
import EInputTypes from '../../models/forms/EInputTypes';

export const admin_config = [
  Field.New()
    .setKey('commission')
    .setLabel('Commission')
    .setType(EInputTypes.NUMBER)
    .setRange(0.00, 999999.99)
    .setStep(0.000001)
    .setRequired(true),
  Field.New()
    .setKey('max_open_invoices')
    .setLabel('Open Invoices Limit')
    .setType(EInputTypes.NUMBER)
    .setStep(1)
    .setRange(1, 999999)
    .setRequired(true),
  Field.New()
    .setKey('invoices_ttl')
    .setLabel('Invoices Time to live (hours)')
    .setStep(1)
    .setRange(1, 99)
    .setType(EInputTypes.NUMBER)
    .setRequired(true),
  Field.New()
    .setIsArea(true)
    .setKey('ad_text')
    .setLabel('Advertisement')
    .setRequired(false)
];
