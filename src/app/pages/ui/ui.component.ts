import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


class server{
  id : number;
  name : string;
}

class room{
  id : number;
  name : string;
  server: number;
}

class user{
  id : number;
  username: string;
}

const ROOMS: room[] = [
  { id: 101, name: "myroom", server: 11 },
  { id: 102, name: "aroom", server: 11},
  { id: 103, name: "anotherroom", server: 12}
];

const SERVERS: server[] = [
  { id: 11, name: 'myserver' },
  { id: 12, name: 'aserver' },
  { id: 13, name: 'thatserver' },
  { id: 14, name: 'thisserver' },
  { id: 15, name: 'anotherserver' }
];
@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css'],
})
export class UIComponent implements OnInit {
  servers = SERVERS;
  rooms = ROOMS;
  activeusers = [{id:1,name: "testuser"}];
  username = localStorage.getItem('username');
  constructor() { }


  ngOnInit(): void {
    
  }

  

}

