import Service from '@ember/service';
import Env from 'highstreetly-operator-ui/config/environment';
import { inject as service } from '@ember/service';

export default class HighstreetlySignalrService extends Service {
    @service
    eventBus;

    // @service 
    // notifications;

    async initialize(eventOrganiserId) {
        var connection = new signalR.HubConnectionBuilder()
            .withUrl(`${Env.sonatribe.OpsApi}/connection`)
            .build();

        connection.on('broadcastMessage',  (name, message) => {
            console.log(`recieved message: ${message}`)
            if(message === "order-confirmed"){
                // this.notifications.success(`New order placed`, { autoClear: true });
            }
            
            this.eventBus.publish(message);
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
