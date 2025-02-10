import Field from '../../models/forms/Field';
import EInputTypes from '../../models/forms/EInputTypes';

export const shop_fields = [
  Field.New()
    .setLabel('Name')
    .setKey('name')
    .setRange(1, 128),
  Field.New()
    .setKey('logo')
    .setLabel('Logo')
    .setRequired(false)
    .setType(EInputTypes.FILE),
  Field.New()
    .setLabel('Admin E-Mail')
    .setKey('admin_email')
    .setType(EInputTypes.EMAIL),
  Field.New()
    .setLabel('Support E-Mail')
    .setKey('support_email')
    .setType(EInputTypes.EMAIL),
  Field.New()
    .setKey('telegram')
    .setLabel('Telegram'),
  Field.New()
    .setKey('ltc_wallet')
    .setLabel('LTC Wallet')
    .setDataHandler(data => {
      return data['ltc_wallet'] || data['wallets']['ltc'] || '';
    }),
  Field.New()
    .setLabel('URL')
    .setKey('url')
    .setRange(4, 128)
    .setRequired(false),
  Field.New()
    .setKey('token')
    .setLabel('API Token')
    .setDisabled(true)
];
