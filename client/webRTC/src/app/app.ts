import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { setButtonDisabled, closeChannel } from './core/helpers/webrtc.helper';
import { findElementById } from './core/helpers/dom.helper';
import { StateRTC } from './core/utils/app-enums';
import { updateElement } from './core/helpers/element.helper';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('conversation-ai');

  connectButton: HTMLElement | null = null;
  disconnectButton: HTMLElement | null = null;
  sendButton: HTMLElement | null = null;
  messageInputBox: HTMLElement | null = null;
  receiveBox: HTMLElement | null = null;

  localConnection: RTCPeerConnection | null = null; // RTCPeerConnection for our "local" connection
  remoteConnection: RTCPeerConnection | null = null; // RTCPeerConnection for the "remote"

  sendChannel: RTCDataChannel | null = null; // RTCDataChannel for the local (sender)
  receiveChannel: RTCDataChannel | null = null; // RTCDataChannel for the remote (receiver)

  contructor() {}

  ngOnInit() {
    this.startup();
  }

  startup() {
    this.connectButton = document.getElementById('connectButton') as HTMLElement;
    this.disconnectButton = document.getElementById('disconnectButton') as HTMLElement;
    this.sendButton = document.getElementById('sendButton') as HTMLElement;
    this.messageInputBox = document.getElementById('message') as HTMLElement;
    this.receiveBox = document.getElementById('receive-box') as HTMLElement;
    // Set event listeners for user interface widgets

    this.connectButton.addEventListener('click', () => this.connectPeers());
    this.disconnectButton.addEventListener('click', () => this.disconnectPeers());
    this.sendButton.addEventListener('click', () => this.sendMessage());
  }

  connectPeers() {
    console.log('Connecting peers...');
    this.localConnection = new RTCPeerConnection();

    this.sendChannel = this.localConnection.createDataChannel('sendChannel');
    this.sendChannel.onopen = this.updateState; // Or use Arrow function -> (event: Event) => {}
    this.sendChannel.onopen = this.updateState;

    this.remoteConnection = new RTCPeerConnection();

    this.remoteConnection.ondatachannel = this.receiveChannelCallback;

    this.localConnection.onicecandidate = (e) =>
      !e.candidate ||
      this.remoteConnection?.addIceCandidate(e.candidate).catch(this.handleAddCandidateError);

    this.remoteConnection.onicecandidate = (e) =>
      !e.candidate ||
      this.localConnection?.addIceCandidate(e.candidate).catch(this.handleAddCandidateError);

    // Connect the two peers
    this.localConnection
      .createOffer()
      .then((offer) => this.localConnection?.setLocalDescription(offer))
      .then(() =>
        this.remoteConnection?.setRemoteDescription(
          this.localConnection?.localDescription as RTCSessionDescriptionInit,
        ),
      )
      .then(() => this.remoteConnection?.createAnswer())
      .then((answer) => this.remoteConnection?.setLocalDescription(answer))
      .then(() =>
        this.localConnection?.setRemoteDescription(
          this.remoteConnection?.localDescription as RTCSessionDescriptionInit,
        ),
      )
      .catch(this.handleCreateDescriptionError);
  }

  disconnectPeers() {
    console.log('Disconnecting peers...');
    // Close the RTCDataChannels if they're open.

    this.sendChannel?.close();
    this.receiveChannel?.close();

    // Close the RTCPeerConnections

    this.localConnection?.close();
    this.remoteConnection?.close();

    this.sendChannel = null;
    this.receiveChannel = null;
    this.localConnection = null;
    this.remoteConnection = null;

    // Update user interface elements

    this.updateElementDisabled(this.connectButton, false);
    this.updateElementDisabled(this.sendButton, true);
    this.updateElementDisabled(this.disconnectButton, true);
    updateElement(this.messageInputBox, {
      value: { value: '' },
      state: { disabled: true },
      interaction: { focus: false },
    });
  }

  sendMessage() {
    console.log('Sending message...');

    const receivebox = document.querySelector('#receivebox') as HTMLInputElement;
    const messageInputBox = document.querySelector('#message') as HTMLInputElement;

    if (receivebox) {
      var message = messageInputBox.value;
      if (this.sendChannel && this.sendChannel.readyState === 'open') {
        this.sendChannel.send(message);
      }

      messageInputBox.value = '';
      messageInputBox.focus();
    }
  }

  handleAddCandidateError() {
    console.log('Error adding candidate');
  }

  handleReceiveChannelStatusChange = (event: Event) => {
    if (this.receiveChannel) {
      console.log(`Receive channel's status has changed to ${this.receiveChannel.readyState}`);
    }
  };

  handleCreateDescriptionError(error: any) {
    console.log('Unable to create an offer: ' + error.toString());
  }

  receiveChannelCallback = (event: RTCDataChannelEvent) => {
    console.log('Receive channel callback');
    this.receiveChannel = event.channel;
    this.receiveChannel.onmessage = this.handleReceiveMessage;
    this.receiveChannel.onopen = this.handleReceiveChannelStatusChange;
    this.receiveChannel.onclose = this.handleReceiveChannelStatusChange;
  };

  handleReceiveMessage = (event: MessageEvent) => {
    const el = document.createElement('p');
    const textNode = document.createTextNode(event.data);

    el.appendChild(textNode);
    const receivebox = document.querySelector('#receivebox') as HTMLInputElement;
    if (receivebox) {
      receivebox.appendChild(el);
    }
  };

  updateState = () => {
    if (!this.sendChannel) return;

    this.findAndUpdateElementDisabled();
  };

  findAndUpdateElementDisabled() {
    const isOpen = this.sendChannel?.readyState?.toLowerCase() === StateRTC.Open; // Get the current state of the send channel
    const input = findElementById('message');
    const sendButton = findElementById('sendButton');
    const disconnectButton = findElementById('disconnectButton');
    const connectButton = findElementById('connectButton');
    this.updateElementDisabled(input, !isOpen, isOpen);
    this.updateElementDisabled(sendButton, !isOpen);
    this.updateElementDisabled(disconnectButton, !isOpen);
    this.updateElementDisabled(connectButton, !isOpen);
  }

  updateElementDisabled = (element: HTMLElement | null, disabled: boolean, focus = false) => {
    if (!element) return;

    updateElement(element, {
      state: { disabled },
      interaction: { focus },
    });
  };
}
