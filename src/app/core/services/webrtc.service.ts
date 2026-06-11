import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebrtcService {
  
  peer = new RTCPeerConnection({
    iceServers: [
      {
        urls:
        'stun:stun.l.google.com:19302'
      }
    ]
  });
  
  constructor() {}
}
