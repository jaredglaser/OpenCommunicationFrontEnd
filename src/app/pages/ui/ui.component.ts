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
  { id: 103, name: "anotherroom", server: 12},
  { id: 104, name: "room4", server: 12},
  { id: 105, name: "room5", server: 13},
  { id: 106, name: "room6", server: 13},
  { id: 107, name: "room7", server: 14},  
  { id: 108, name: "room8", server: 15},
];

const SERVERS: server[] = [
  { id: 11, name: 'myserver' },
  { id: 12, name: 'aserver' },
  { id: 13, name: 'thatserver' },
  { id: 14, name: 'thisserver' },
  { id: 15, name: 'anotherserver' }
];

const FRIENDS: user[] = [
  { id: 1001, username: 'bestFriend'},
  { id: 1002, username: 'myFriend'},
  { id: 1003, username: 'aFriend'},
];




@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css'],
})
export class UIComponent implements OnInit {
  servers = SERVERS;
  rooms = ROOMS;
  friends = FRIENDS;
  activeusers = [{id:1,name: "testuser"}];
  username = localStorage.getItem('username');
  

  constructor() { }


  ngOnInit(): void {
    document.getElementById("refresh-chat").addEventListener("click", this.refreshChat, false);
    document.getElementById("refresh-friends").addEventListener("click", this.refreshFriendsList, false);
    document.getElementById("add-friend-btn").addEventListener("click", this.addFriend, false);
  }

  //TODO GET request to update messages list
  refreshChat(): void{
    console.log("refresh friends list");
  }

  //TODO GET request to get current friends list
  refreshFriendsList(): void{
    console.log("refresh friends list");
  }

  //TODO POST request to add a friend, If Successful -> GET request to update friends list
  addFriend(): void{
    console.log("add friend");
  }


}

