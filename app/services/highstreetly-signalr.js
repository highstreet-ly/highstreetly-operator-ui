import Service from '@ember/service';
import Env from 'highstreetly-operator-ui/config/environment';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import signalR from "@microsoft/signalr";

export default class HighstreetlySignalrService extends Service {
    @service
    eventBus;

    @service
    highstreetlyPrinter

    @service
    notifications;


    @tracked
    printerSettings

    connection
    eventOrganiserId

    async initialize(eventOrganiserId) {

        // this.audio.load('sounds/alert.mp3').asSound('alert')

        this.eventOrganiserId = eventOrganiserId

        let localStorage = window.localStorage
        this.printerSettings = {
            port: localStorage.getItem('printer-port'),
            ip: localStorage.getItem('printer-ip')
        }

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${Env.sonatribe.OpsApi}/connection`)
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();


        this.connection.onreconnecting(error => {
            console.assert(this.connection.state === signalR.HubConnectionState.Reconnecting);

            document.getElementById("messageInput").disabled = true;

            const li = document.createElement("li");
            li.textContent = `Connection lost due to error "${error}". Reconnecting.`;
            document.getElementById("messagesList").appendChild(li);
        });

        this.connection.onreconnected(connectionId => {
            console.assert(this.connection.state === signalR.HubConnectionState.Connected);

            document.getElementById("messageInput").disabled = false;

            const li = document.createElement("li");
            li.textContent = `Connection reestablished. Connected with connectionId "${connectionId}".`;
            document.getElementById("messagesList").appendChild(li);
        });

        this.connection.onclose(async error => {
            console.assert(this.connection.state === signalR.HubConnectionState.Disconnected);

            document.getElementById("messageInput").disabled = true;

            const li = document.createElement("li");
            li.textContent = `Connection closed due to error "${error}". Try refreshing this page to restart the connection.`;
            document.getElementById("messagesList").appendChild(li);

            await this.start();
        });

        var lockResolver;
        if (navigator && navigator.locks && navigator.locks.request) {
            const promise = new Promise((res) => {
                lockResolver = res;
            });

            navigator.locks.request('unique_lock_name', { mode: "shared" }, () => {
                return promise;
            });
        }

        // connection.on('connectionSlow', function () {
        //     console.log('Signalr: We are currently experiencing difficulties with the connection.')
        // });

        // connection.on('starting', function () {
        //     console.log('Signalr: Connection starting')
        // });

        // connection.received(function () {
        //     console.log('Signalr: Message recieved.')
        // });

        // connection.reconnecting(function () {
        //     console.log('Signalr: Reconnecting.')
        // });

        // connection.reconnected(function () {
        //     console.log('Signalr: Reconnected.')
        // });

        // connection.stateChanged(function () {
        //     console.log('Signalr: State Changed')
        // });

        // connection.disconnected(function () {
        //     console.log('Signalr: Disconnected')
        // });

        this.connection.on('broadcastMessage', (name, m) => {
            console.log(`recieved message: ${m}`)

            var message = JSON.parse(m)

            if (message.Status === "order-confirmed") {
                var audio = new Audio("/sounds/alert.mp3")
                audio.play()
                this.notifications.success(`New order placed`, { autoClear: true });

                if (this.printerSettings.port && this.printerSettings.ip) {
                    this.highstreetlyPrinter.print(message)
                }
            }

            this.eventBus.publish(message.Status, message);
        });



        // Start the connection.
        await this.start();
    }

    async start() {
        // Transport fallback functionality is now built into start.
        try {
            await this.connection.start()

            console.assert(this.connection.state === signalR.HubConnectionState.Connected);
            console.log("SignalR Connected.");

            console.log("Connected, transport = " + this.connection.connection.transport.name);
            this.connection.invoke("JoinGroup", this.eventOrganiserId)  //JoinGroup is C# method name
                .catch(err => {
                    console.log(err);
                });

            console.log('connection started');

        } catch (err) {
            console.assert(this.connection.state === signalR.HubConnectionState.Disconnected);
            console.log(err);
            setTimeout(() => this.start(), 5000);
        }
    }
}
