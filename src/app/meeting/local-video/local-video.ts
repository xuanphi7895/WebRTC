import { Component } from '@angular/core';

@Component({
  selector: 'app-local-video',
  imports: [],
  templateUrl: './local-video.html',
  styleUrl: './local-video.scss',
})
export class LocalVideo {
  peer = new RTCPeerConnection({
    iceServers: [
      {
        urls:
        'stun:stun.l.google.com:19302'
      }
    ]
  });


  constructor() {}

  async getMedia() {
    let stream = null;
    const constraints: MediaStreamConstraints = { video: true, audio: true };
    // video: { width: 1280, height: 720, resizeMode: "crop-and-scale" },
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      /* use the stream */
    } catch (err) {
      /* handle the error */
    } 
  }

}
