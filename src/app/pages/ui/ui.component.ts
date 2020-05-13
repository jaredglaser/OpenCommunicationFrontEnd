import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Globals } from 'src/app/Globals';
import { HttpClient } from '@angular/common/http';
import * as SimplePeer from 'src/assets/simplepeer.min.js'

class server{
  id : number;
  name : string;
}

class user{
  id : number;
  username: string;
}

const SERVERS: server[] = [
  { id: 11, name: 'myserver' },
  { id: 12, name: 'aserver' },
  { id: 13, name: 'thatserver' },
  { id: 14, name: 'thisserver' },
];
@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css'],
})
export class UIComponent implements OnInit {
  servers = SERVERS;
  peerid = "";
  peer;
  activeusers = [];
  username = localStorage.getItem('username');

  constructor(private http: HttpClient) { }

 

  ngOnInit(): void {
    
  }
  createcall(){
    this.peer = new SimplePeer({ initiator: true, trickle: false});
    console.log("peer made");
    this.peer.on('signal', data => {
      console.log("signaled");
      this.peerid = JSON.stringify(data);
      console.log(JSON.stringify(data));
    });
    this.peer.on('error', err => console.log('error', err));
    this.peer.on('stream', stream => {
      console.log("got stream");
      // got remote video stream, now let's show it in a video tag
      var video = document.querySelector('video');
      video.srcObject = stream;
      video.play();
    });
    
  }
  joincallHost(peerstring){
    this.peer.signal(JSON.parse(peerstring));
    this.peer.on('connect', () => {
      console.log('CONNECTED');
      this.peer.send("message from the host");
    });
    this.peer.on('data', data => {
      console.log('data: ' + data)
    })
  }
  joincall(peerstring){
    //if(this.peer != null){ //host is joining
    //  this.peer.signal(JSON.parse(peerstring));
    //}
    //else{
    this.peer = new SimplePeer({ initiator : false, trickle: false});
    console.log("peer made");
    this.peer.on('signal', data => {
      console.log("peer data recieved");
      this.peerid = JSON.stringify(data);
      console.log(JSON.stringify(data));
    });
    this.peer.on('error', err => console.log('error', err));
    console.log("peer signaled");
    this.peer.signal(JSON.parse(peerstring));
    this.peer.on('stream', stream => {
      console.log("got remote stream");
      // got remote video stream, now let's show it in a video tag
      var video = document.querySelector('video');
      video.srcObject = stream;
      video.play();
    });
    this.peer.on('connect', () => {
      console.log('CONNECTED');
      this.peer.send("message from the guest");
    });
    this.peer.on('data', data => {
      console.log('data: ' + data)
    })
  //}
  }
  shareVideo(){
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(this.gotMedia).catch(() => {});
  }
  gotMedia (stream) {
    console.log("adding stream");
    this.peer.addStream(stream);  
  }
  refreshUsers(){
    this.http.get<any>(Globals.ip+":"+Globals.port+"/api/").subscribe( response => {
      console.log("test");
    });
  }
  

}

