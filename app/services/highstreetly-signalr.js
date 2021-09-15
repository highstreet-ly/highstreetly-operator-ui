import Service from '@ember/service';
import Env from 'highstreetly-operator-ui/config/environment';
import { inject as service } from '@ember/service';

export default class HighstreetlySignalrService extends Service {
    @service
    eventBus;

    @service
    highstreetlyPrinter

    @service
    notifications;

    async initialize(eventOrganiserId) {

        // this.audio.load('sounds/alert.mp3').asSound('alert')

        var connection = new signalR.HubConnectionBuilder()
            .withUrl(`${Env.sonatribe.OpsApi}/connection`)
            .build();

        connection.on('broadcastMessage', (name, m) => {
            console.log(`recieved message: ${m}`)

            var message = JSON.parse(m)

            if (message.Status === "order-confirmed") {
                var audio = new Audio("/sounds/alert.mp3")
                audio.play()
                this.notifications.success(`New order placed`, { autoClear: true });
                this.highstreetlyPrinter.print(message)
            }

            this.eventBus.publish(message.Status, message);
        });


        // Transport fallback functionality is now built into start.
        connection.start()
            .then(function () {
                connection.invoke("JoinGroup", eventOrganiserId)  //JoinGroup is C# method name
                    .catch(err => {
                        console.log(err);
                    });

                console.log('connection started');
            })
            .catch(error => {
                console.error(error.message);
            });
    }
}
