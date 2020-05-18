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

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css'],
})
export class UIComponent implements OnInit {
  servers = [];
  messages = [];
  rooms = [];
  friends = [];
  activeusers = [{ id: 1, name: "testuser" }];
  username = localStorage.getItem('username');


  constructor(private http: HttpClient) { }


  ngOnInit(): void {
  }

  //TODO GET request to api/messages/chatRefresh -> update messages list
  refreshChat(): void {
    //figure out if the chat is with a friend or with a room
    Array.from(document.getElementsByClassName("selected-list-item")).forEach(element => {
      var backendresults: Array<backend_message> = [];
      if (element.parentNode.previousSibling.textContent === "Friends") {
        this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/room/chatrefresh", { "name": element.textContent },{ headers: {"authorization":localStorage.getItem("usertoken")} }).subscribe(response => {
          backendresults = response;
        });
      }
      else if (element.parentNode.previousSibling.textContent === "Rooms") {
        var today = new Date();
        this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/messages/chatrefresh", { "username": element.textContent },{ headers: {"authorization":localStorage.getItem("usertoken")} }).subscribe(response => {
          backendresults = response;
        });
      }

      this.messages = [];
      backendresults.forEach((msg: backend_message) => {
        var uimessage = new frontend_message();

        //HANDLE TIME FORMATTING
        var seconds: number = (today.getTime() - msg.time.getTime()) / 1000;
        if (seconds < 60) {
          uimessage.time = seconds.toString() + " seconds ago";
        }
        else if (seconds < 3600) {
          uimessage.time = (seconds / 60).toString() + " minutes ago";
        }
        else if (seconds < 86400) {
          uimessage.time = (seconds / 360).toString() + " hours ago";
        }
        else {
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
    console.log("refreshed friends list");
    this.http.get<any>(Globals.ip + ":" + Globals.port + "/api/messages/friendRefresh?username="+localStorage.getItem('username')).subscribe(response => {
      this.friends = [];
      for(var i = 0 ; i < response.length; i++ ){
        this.friends.push({id: response[i]._id, name: response[i].username})
      }
    });
  }


  refreshServers(): void {
    console.log("refreshed servers");
        this.http.get<any>(Globals.ip + ":" + Globals.port + "/api/server/list?user="+localStorage.getItem('username'),{ headers: {"authorization":localStorage.getItem("usertoken")} }).subscribe(response => {
          this.servers = [];
          for(var i = 0 ; i < response.length; i++ ){
            this.servers.push({id: response[i]._id, name: response[i].Name})
          }
        });
  }

  refreshRooms(): void {
    console.log("refreshed rooms");
        this.http.get<any>(Globals.ip + ":" + Globals.port + "/api/server/refreshrooms?user="+localStorage.getItem('username'),{ headers: {"authorization":localStorage.getItem("usertoken")} }).subscribe(response => {
          this.rooms = [];
          for(var i = 0 ; i < response.length; i++ ){
            this.rooms.push({id: response[i]._id, name: response[i].Name})
          }
        });

  }

  // TODO POST request to api/messages/addFriend
  // add a friend, If Successful -> GET request to update friends list */
  // Should return whether or not send request was successfully sent or not (i.e. doesn't exist, already friends, etc.)
  addFriend(): void {
    var friendUsername = (<HTMLInputElement>document.getElementById("search-friend")).value;
    console.log("add friend: " + friendUsername);
    this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/messages/addFriend", { "to": friendUsername, "from": this.username},{ headers: {"authorization":localStorage.getItem("usertoken")} }).subscribe(response => {
      this.friends.push(friendUsername);
    });
  }

  acceptFriend(): void {
    var friendUsername = (<HTMLInputElement>document.getElementById("search-friend")).value;
    console.log("add friend: " + friendUsername);
    this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/messages/acceptFriend", { "to": friendUsername, "from": this.username},{ headers: {"authorization":localStorage.getItem("usertoken")} }).subscribe(response => {
      this.friends.push(friendUsername);
    });
  }

  //TODO POST request to api/room/create -> create room 
  createRoom(): void {
    var roomName = (<HTMLInputElement>document.getElementById("search-friend")).value;
    console.log("create room: " + roomName);
    Array.from(document.getElementsByClassName("selected-list-item")).forEach(element => {
      if (element.parentNode.previousSibling.textContent === "Servers") {
        this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/room/create", { "server": element.textContent, "name": roomName, "type": "chat", "users": [{ "username": localStorage.getItem('username') }] },{ headers: {"authorization":localStorage.getItem("usertoken")} }).subscribe(response => {
          console.log(response);
        });
      }
    });
  }

  createServer(): void {console.log("create server: ");
    var serverName = (<HTMLInputElement>document.getElementById("name-server")).value;
    console.log("create server: " + serverName);
    this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/server/create", { "Name": serverName, "username": localStorage.getItem('username') },{ headers: {"authorization":localStorage.getItem("usertoken")} }).subscribe(response => {
      console.log(response);
    });
  }


  // Adds active class to current list-item selected
  handleListeners(event) {
        var element = event.target.closest('button');
        var elementid = element.attributes.id;
        if (element.parentNode.previousSibling.previousSibling.textContent.trim() === "Servers") {
          Array.from(document.getElementsByClassName("list-group-item list-group-item-action")).forEach(btn => {
            console.log("removed class");
            btn.classList.remove("selected-list-item");
          })
          element.classList.add("selected-list-item");
        }
        else if (element.parentNode.previousSibling.previousSibling.textContent.trim() === "Friends") {
          Array.from(document.getElementsByClassName("list-group-item list-group-item-action")).forEach(btn => {
            console.log("removed class");
            if (btn.parentNode.previousSibling.textContent !== "Servers") {
              btn.classList.remove("selected-list-item");
            }
            element.classList.add("selected-list-item");
          });
        }
        else if (element.parentNode.previousSibling.previousSibling.textContent.trim() === "Rooms") {
          Array.from(document.getElementsByClassName("list-group-item list-group-item-action")).forEach(btn => {
            if (btn.parentNode.previousSibling.textContent !== "Servers") {
              btn.classList.remove("selected-list-item");
            }
          })
          element.classList.add("selected-list-item");
        }
  }
}

