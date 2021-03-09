import classic from "ember-classic-decorator";
import { inject as service } from "@ember/service";
import Component from "@ember/component";
import { action } from "@ember/object";
import { debounce } from "@ember/runloop";
import { isEmpty } from "@ember/utils";
import { tracked } from "@glimmer/tracking";
import { filter } from "@ember/object/computed";

@classic
export default class OrdersPanel extends Component {
  @service
  store;

  @service
  eventBus;

  viewOrderVisible = false;
  pageSize = 100;
  pageNumber = null;
  recordCount = null;
  query = null;
  commandType = null;

  @tracked loading = true;
  @tracked orders = [];

  @tracked status = null;

  @tracked filterSearch = '';

  constructor() {
    super(...arguments);
    this.imageOptions = "w_80";
    this.foundDraftOrders = {};
  }

  async init() {
    super.init(...arguments);

    if (!this.get("isMobile.any")) {
      this.set("pageSize", 10);
    }

    if (!isEmpty(this.commandType)) {
      this.commandType
        .split(",")
        .forEach((cmd) =>
          this.eventBus.subscribe(cmd, this, this.handleUpdate)
        );
    }

    await this.loadPosts(1);
  }

  willDestroyElement() {
    try {
      this.commandType
        .split(",")
        .forEach((cmd) =>
          this.eventBus.unsubscribe(cmd, this, this.handleUpdate)
        );
    } catch {}
    this._super(...arguments);
  }

  handleUpdate() {
    this.loadPosts(1);
  }

  async loadPosts(getPageNumber) {
    this.set("loading", true);
    let q = this.query || {};
    q.page = {};
    q.page.number = getPageNumber;
    q.page.size = this.pageSize;

    this.set("query", q);

    let result = await this.store.query("order", this.query);

    this.set("orders", result);

    this.setProperties({
      recordCount: result.get("meta.total-records"),
      pageNumber: getPageNumber,
    });
    this.set("loading", false);
  }

  async doSearchInternal(search) {
    this.set("loading", true);
    let q = this.query;
    q.filter["human-readable-id"] = "like:" + search;
    q.page.number = 1;

    let result = await this.store.query("order", this.query);

    this.set("orders", result);

    this.setProperties({
      recordCount: result.get("meta.total-records"),
    });

    this.set("loading", false);
  }

  get filteredOrders() {
    let orders = this.orders;
    let status = this.status;

    let filteredOrders = [];


    /* orders.filter(function(order, index, array) {
      return (
        order &&
        (order.status && order.status === status)
        && order.humanReadableId.includes(filterSearch)
         (
          !filterSearch || (
            order,humanReadableId,includes(filterSearch)
          )
        )
      );
    }) */

    if (status) {
      filteredOrders = orders.filterBy("status", status);
    } else {
      // convert to standard array to shoehorn in this basic sort
      orders.forEach(function (o) {
        filteredOrders.pushObject(o);
      });
    }

    filteredOrders = filteredOrders.filter(order => {
      const filterSearch = this.filterSearch.toLowerCase();
      return (
        order.humanReadableId.toLowerCase().includes(filterSearch)
        || order.ownerName.toLowerCase().includes(filterSearch)
        || order.ownerEmail.toLowerCase().includes(filterSearch)
        // || order.deliveryLine1.toLowerCase().includes(filterSearch)
        // || order.deliveryPostcode.toLowerCase().includes(filterSearch)
      );
    });

    filteredOrders = filteredOrders.sort((a, b) => {
      if (a.confirmedOn.getTime() > b.confirmedOn.getTime()) {
        return -1;
      }
      if (a.confirmedOn.getTime() < b.confirmedOn.getTime()) {
        return 1;
      }
      return 0;
    });
    return filteredOrders;
  }

  @action
  closeOrderModal() {
    let viewOrderModal = this.element.querySelector("#viewOrderModal");
    viewOrderModal.style.display = "none";
    viewOrderModal.className = "modal fade";
  }

  @action
  async viewOrder(order) {
    this.set("viewOrderVisible", true);
  }

  @action
  async getPage(getPageNumber) {
    this.loadPosts(getPageNumber);
  }

  @action
  setSort(sortBy) {
    this.set("sortBy", [sortBy]);
  }

  @action
  async doSearch(search) {
    debounce(this, this.doSearchInternal, search, 500);
  }
}
