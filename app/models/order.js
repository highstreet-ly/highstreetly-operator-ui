import Model , { hasMany } from '@ember-data/model';
import { attr } from '@ember-data/model';

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

  @hasMany('order-ticket', { async: true })
  tickets;

  @attr('string')
  deliveryLine1;

  @attr('string')
  deliveryPostcode;

  // payments: DS.hasMany('payment', { async: true }),

  @attr('date')
  createdOn;

  @attr('date')
  confirmedOn;

  @attr('string')
  humanReadableId;

  @attr('string')
  status;

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

  get totalAmountFormatted() {
    return this.totalAmount.toFixed(2);
  }

  get typeText() {
    if (this.isClickAndCollect) {
      return 'Click and collect';
    } else if (this.isLocalDelivery) {
      return 'Local delivery';
    } else if (this.isNationalDelivery) {
      return 'National delivery'
    } else {
      return 'Unknown';
    }
  }
}
