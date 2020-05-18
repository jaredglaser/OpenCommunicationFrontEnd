import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/app/Globals';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


class server {
  id: number;
  name: string;
}

class room {
  id: number;
  name: string;
  server: number;
}

class user {
  id: number;
  username: string;
}

class frontend_message {
  time: String;
  from: String;
  content: String;
}
class backend_message {
  username: String;
  time: Date;
  content: String;
}

const ROOMS: room[] = [
  { id: 101, name: "myroom", server: 11 },
  { id: 102, name: "aroom", server: 11 },
  { id: 103, name: "anotherroom", server: 12 },
  { id: 104, name: "room4", server: 12 },
  { id: 105, name: "room5", server: 13 },
  { id: 106, name: "room6", server: 13 },
  { id: 107, name: "room7", server: 14 },
  { id: 108, name: "room8", server: 15 }
];

const MESSAGES: frontend_message[] = [
  { time: "11:00", from: "otheruser", content: "whats up" },
  { time: "11:00", from: "jaredtest", content: "whats up" },
  { time: "11:00", from: "otheruser", content: "whats up" },
  { time: "11:00", from: "otheruser",  content: "whats up" },
  { time: "11:00", from: "jaredtest",content: "whats up" },
  { time: "11:00", from: "jaredtest", content: "whats up" },
  { time: "11:00", from: "otheruser",  content: "whats up" },
  { time: "11:00", from: "jaredtest",  content: "whats up" }
];


const SERVERS: server[] = [
  { id: 11, name: 'myserver' },
  { id: 12, name: 'aserver' },
  { id: 13, name: 'thatserver' },
  { id: 14, name: 'thisserver' },
  { id: 15, name: 'anotherserver' }
];

const FRIENDS: user[] = [
  { id: 1001, username: 'bestFriend' },
  { id: 1002, username: 'myFriend' },
  { id: 1003, username: 'aFriend' },
  { id: 1004, username: 'pal' },
  { id: 1005, username: 'someGuy' },
  { id: 1006, username: 'Dave' },
  { id: 1007, username: 'randomGuy' },
  { id: 1008, username: 'anotherOne' },
  { id: 1009, username: 'dude' },
  { id: 1010, username: 'someGirl' },
  { id: 1011, username: 'bro' },
  { id: 1012, username: 'guy' }
];




@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css'],
})
export class UIComponent implements OnInit {
  servers = SERVERS;
  messages = MESSAGES;
  rooms = ROOMS;
  friends = FRIENDS;
  activeusers = [{ id: 1, name: "testuser" }];
  username = localStorage.getItem('username');


  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    document.getElementById("refresh-chat").addEventListener("click", this.refreshChat, false);
    document.getElementById("refresh-friends").addEventListener("click", this.refreshServers, false);
    document.getElementById("refresh-servers").addEventListener("click", this.refreshRooms, false);
    document.getElementById("refresh-rooms").addEventListener("click", this.refreshFriendsList, false);
    document.getElementById("add-friend").addEventListener("click", this.addFriend, false);
    document.getElementById("create-room").addEventListener("click", this.createRoom, false);

  }

  //TODO GET request to api/messages/chatRefresh -> update messages list
  refreshChat(): void {
    //figure out if the chat is with a friend or with a room
    Array.from(document.getElementsByClassName("selected-list-item")).forEach(element => {
      var backendresults : Array<backend_message> = []; 
      if (element.parentNode.previousSibling.textContent === "Friends") {
        this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/room/chatrefresh", { "name": element.textContent }).subscribe(response => {
          backendresults = response;
        });
      }
      else if (element.parentNode.previousSibling.textContent === "Rooms") {
        var today = new Date();
        this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/messages/chatrefresh", { "username": element.textContent }).subscribe(response => {
          backendresults = response;
        });
      }

      this.messages = [];
      backendresults.forEach((msg:backend_message) => {
        var uimessage = new frontend_message();

        //HANDLE TIME FORMATTING
        var seconds : number = (today.getTime() - msg.time.getTime())/1000;
        if(seconds < 60){
          uimessage.time = seconds.toString() + " seconds ago";
        }
        else if(seconds < 3600){
          uimessage.time = (seconds/60).toString() + " minutes ago";
        }
        else if(seconds < 86400){
          uimessage.time = (seconds/360).toString() + " hours ago";
        }
        else{
          uimessage.time = msg.time.toLocaleDateString();
        }
        uimessage.from = msg.username;
        uimessage.content = msg.content;
        this.messages.push()
      });

    });

  }

  //TODO GET request to api/messages/friendRefresh ->get current friends list
  refreshFriendsList(): void {
  }


  refreshServers(): void {
    Array.from(document.getElementsByClassName("selected-list-item")).forEach(element => {
      var backendresults : Array<server> = []; 
      if (element.parentNode.previousSibling.textContent === "Server") {
        this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/server/list", { "Name": element.textContent }).subscribe(response => {
          backendresults = response;
        });
      }
      this.servers = [];
      backendresults.forEach((serv: server) => {
        this.servers.push();
      })
    });

  }

  refreshRooms(): void {
    Array.from(document.getElementsByClassName("selected-list-item")).forEach(element => {
      var backendresults : Array<room> = []; 
      if (element.parentNode.previousSibling.textContent === "Room") {
        this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/server/list", { "Name": element.textContent }).subscribe(response => {
          backendresults = response;
        });
      }
      this.rooms = [];
      backendresults.forEach((rm: room) => {
        this.rooms.push();
      })
    });

  }

  // TODO POST request to api/messages/addFriend
  // add a friend, If Successful -> GET request to update friends list */
  // Should return whether or not send request was successfully sent or not (i.e. doesn't exist, already friends, etc.)
  addFriend(): void {
    var friendUsername = (<HTMLInputElement>document.getElementById("search-friend")).value;
    console.log("add friend: " + friendUsername);
  }

  //TODO POST request to api/room/create -> create room 
  createRoom(): void {
    var roomName = (<HTMLInputElement>document.getElementById("search-friend")).value;
    console.log("create room: " + roomName);
    Array.from(document.getElementsByClassName("selected-list-item")).forEach(element => {
      if (element.parentNode.previousSibling.textContent === "Servers") {
        this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/room/create", { "server": element.textContent, "name": roomName, "type": "chat", "users" : [{"username": this.username}] }).subscribe(response => {
          console.log(response);
        });
      }
    });
  }


  // Adds active class to current list-item selected
  ngAfterViewInit() {
    var def = this;
    Array.from(document.getElementsByClassName("list-group-item-action")).forEach(element => {
      element.addEventListener("click", function () {
        console.log(element.parentNode);
        console.log(element.parentNode.previousSibling.textContent);
        if (element.parentNode.previousSibling.textContent === "Servers") {
          Array.from(document.getElementsByClassName("list-group-item-action")).forEach(btn => {
            console.log("removed class");
            btn.classList.remove("selected-list-item");
          })
          element.classList.add("selected-list-item");
        }
        else if (element.parentNode.previousSibling.textContent.trim() === "Friends") {
          Array.from(document.getElementsByClassName("list-group-item-action")).forEach(btn => {
            console.log("removed class");
            if (btn.parentNode.previousSibling.textContent !== "Servers") {
              btn.classList.remove("selected-list-item");
            }
            element.classList.add("selected-list-item");
          });
        }
        else if (element.parentNode.previousSibling.textContent === "Rooms") {
          Array.from(document.getElementsByClassName("list-group-item-action")).forEach(btn => {
            if (btn.parentNode.previousSibling.textContent !== "Servers") {
              btn.classList.remove("selected-list-item");
            }
          })
          element.classList.add("selected-list-item");
        }
      });
    });
  }
}

