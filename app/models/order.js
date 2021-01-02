import Model from '@ember-data/model';
import attr from 'ember-data/attr';

export default class OrderModel extends Model {
  @attr('string')
  eventInstanceId;

  @attr('string')
  assignmentsId;

  @attr('string')
  ownerId;

  @attr('string')
  ownerName;

  @attr('string')
  ownerEmail;

  @attr('string')
  ownerPhone;

  @attr('number')
  totalAmount;

  @attr('number')
  status;

  @attr('raw')
  tickets;

  @attr('number')
  deliveryLine1;

  @attr('number')
  deliveryPostcode;

  // payments: DS.hasMany('payment', { async: true }),

  @attr('date')
  createdOn;

  @attr('date')
  confirmedOn;

  @attr('string')
  humanReadableId;

  @attr('string')
  statusText;

  @attr('boolean')
  isClickAndCollect;

  @attr('boolean')
  isLocalDelivery;

  @attr('boolean')
  isNationalDelivery;

  @attr('date')
  refundedDate;

  @attr('date')
  refundedReason;

  @attr('date')
  pricedDateTime;

  @attr('date')
  paidDateTime;

  @attr('date')
  processingDateTime;

  @attr('date')
  processingCompleteDateTime;

  @attr('date')
  expiredDateTime;

  @attr('string')
  customerDispatchAdvisory;

}
