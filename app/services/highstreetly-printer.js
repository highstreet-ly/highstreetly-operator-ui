import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class HighstreetlyPrinterService extends Service {

    @service
    store

    printer
    ePosDev

    cbConnect(data) {
        if (data == 'OK' || data == 'SSL_CONNECT_OK') {
            this.ePosDev.createDevice('local_printer', this.ePosDev.DEVICE_TYPE_PRINTER,
                { 'crypto': false, 'buffer': false }, this.cbCreateDevice_printer.bind(this));
        } else {
            // alert(data);
        }
    }

    cbCreateDevice_printer(devobj, retcode) {
        if (retcode == 'OK') {
            this.printer = devobj;
            this.printer.timeout = 60000;
            this.printer.onreceive = function (res) { alert(res.success); };
            this.printer.oncoveropen = function () { alert('coveropen'); };
            this.store.findRecord('order', this.message.OrderId, { include: 'tickets,tickets.ticket-details,tickets.ticket-details.product-extras' })
                .then((order) => {
                    this.printInternal(order);
                })
        } else {
            // alert(retcode);
        }
    }

    print(message) {
        this.message = message
        this.ePosDev = new epson.ePOSDevice();
        let localStorage = window.localStorage
        let settings = {
            port: localStorage.getItem('printer-port'),
            ip: localStorage.getItem('printer-ip')
        }

        this.ePosDev.connect(settings.ip, settings.port, this.cbConnect.bind(this));
    }

    printInternal(order) {

        let promises = [];

        let lineItems = order.tickets.map((ticket) => {
            promises.push(ticket.ticketDetails.then((td) => {
                return {
                    name: td.displayName,
                    quantity: td.quantity,
                }
            }))
        })

        Promise.all(promises).then((lineItems) => {
            let li = '';
            lineItems.forEach((lineItem) => {
                li += `<text>${lineItem.name} x ${lineItem.quantity}&#10;</text>`
            });

            this.printer.setXmlString(`
            <image width="122" height="117" color="color_1" mode="mono">${this.imageData}</image>
            <feed line="5" />
            <text>Order Id: ${order.humanReadableId}&#10;</text>
            <text>Customer: ${order.ownerName}&#10;</text>
            <text>Order Details:&#10;</text>
            ${li}
            <feed line="5" />
            <cut type="feed"/>
           `)
            this.printer.send();
        })


    }

    imageData = "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"
}


