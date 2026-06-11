import { Injectable } from '@angular/core';

import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  hubConnection!: signalR.HubConnection;

  start() {
    this.hubConnection =
      new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:5001/callHub')
        .build();

    this.hubConnection.start();
  }

  sendOffer(data: any) {
    this.hubConnection.invoke(
      'SendOffer',
      data
    );
  }

  onReceiveOffer(callback: any) {
    this.hubConnection.on(
      'ReceiveOffer',
      callback
    );
  }
}
