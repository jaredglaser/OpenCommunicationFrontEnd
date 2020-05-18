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
    var backendresults: Array<any> = [];
    var isFriend;
    var roomid;
    var username;
    Array.from(document.getElementsByClassName("selected-list-item")).forEach(element => {

      if (element.parentNode.previousSibling.previousSibling.textContent.trim() === "Friends") {
        username = element.textContent;
        isFriend = true;
      }
      else if (element.parentNode.previousSibling.previousSibling.textContent.trim() === "Rooms") {

        roomid = this.rooms.find(room => room.name === element.textContent).id;
        isFriend = false;

      }
    });

    if (isFriend === true) {
      this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/messages/chatrefresh", { "username": username }, { headers: { "authorization": localStorage.getItem("usertoken") } }).subscribe(response => {
        this.setMessages(response);
      });
    }
    else if (isFriend === false) {
      this.http.get<any>(Globals.ip + ":" + Globals.port + "/api/room/refreshchat?roomid=" + roomid, { headers: { "authorization": localStorage.getItem("usertoken") } }).subscribe(response => {
        this.setMessages(response);
      });
    }
    else {
      return;
    }




  }

  setMessages(backendresults) {

    this.messages = [];
    backendresults.forEach((msg: any) => {
      var time;
      //HANDLE TIME FORMATTING
      var t = Date.now();
      var z = Date.parse(msg.time);
      var seconds: number = (Date.now() - Date.parse(msg.time)) / 1000;
      if (seconds < 60) {
        time = seconds.toString() + " seconds ago";
      }
      else if (seconds < 3600) {
        time = (seconds / 60).toString() + " minutes ago";
      }
      else if (seconds < 216000) {
        time = (seconds / 360).toString() + " hours ago";
      }
      else {
        time = msg.time.toLocaleDateString();
      }
      var from = msg.username;
      var content = msg.content;
      this.messages.push({time:time,from:from,content:content});
    });
  }

  //TODO GET request to api/messages/friendRefresh ->get current friends list
  refreshFriendsList(): void {
    console.log("refreshed friends list");
    this.http.get<any>(Globals.ip + ":" + Globals.port + "/api/messages/friendRefresh?username=" + localStorage.getItem('username')).subscribe(response => {
      this.friends = [];
      for (var i = 0; i < response.length; i++) {
        this.friends.push({ id: response[i]._id, username: response[i].friendrequests[i].username })
      }
    });
  }


  refreshServers(): void {
    console.log("refreshed servers");
    this.http.get<any>(Globals.ip + ":" + Globals.port + "/api/server/list?user=" + localStorage.getItem('username'), { headers: { "authorization": localStorage.getItem("usertoken") } }).subscribe(response => {
      this.servers = [];
      for (var i = 0; i < response.length; i++) {
        this.servers.push({ id: response[i]._id, name: response[i].Name })
      }
    });
  }

  refreshRooms(): void {
    //get the currently selected server
    var servername;
    Array.from(document.getElementsByClassName("selected-list-item")).forEach(btn => {
      if (btn.parentNode.previousSibling.previousSibling.textContent.trim() === "Servers") {
        servername = btn.textContent;
      }
    });
    var serverid = this.servers.find(server => server.name === servername).id;

    this.http.get<any>(Globals.ip + ":" + Globals.port + "/api/server/refreshrooms?Name=" + serverid, { headers: { "authorization": localStorage.getItem("usertoken") } }).subscribe(response => {
      this.rooms = [];
      for (var i = 0; i < response.length; i++) {
        this.rooms.push({ id: response[i]._id, name: response[i].name })
      }
    });

  }

  addToServer(): void {
    var servername;
    Array.from(document.getElementsByClassName("selected-list-item")).forEach(btn => {
      if (btn.parentNode.previousSibling.previousSibling.textContent.trim() === "Servers") {
        servername = btn.textContent;
      }
    });
    var serverid = this.servers.find(server => server.name === servername).id;
    var friendUsername = (<HTMLInputElement>document.getElementById("search-friend")).value;
    console.log("add friend: " + friendUsername);
    this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/server/join", { "serverId": serverid, "username": this.username }, { headers: { "authorization": localStorage.getItem("usertoken") } }).subscribe(response => {
      this.friends.push(friendUsername);
    });
  }

  // TODO POST request to api/messages/addFriend
  // add a friend, If Successful -> GET request to update friends list */
  // Should return whether or not send request was successfully sent or not (i.e. doesn't exist, already friends, etc.)
  addFriend(): void {
    var friendUsername = (<HTMLInputElement>document.getElementById("search-friend")).value;
    console.log("add friend: " + friendUsername);
    this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/messages/addFriend", { "to": friendUsername, "from": this.username }, { headers: { "authorization": localStorage.getItem("usertoken") } }).subscribe(response => {
      this.friends.push(friendUsername);
    });
  }

  acceptFriend(): void {
    var friendUsername = (<HTMLInputElement>document.getElementById("search-friend")).value;
    console.log("add friend: " + friendUsername);
    this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/messages/acceptFriend", { "to": friendUsername, "from": this.username }, { headers: { "authorization": localStorage.getItem("usertoken") } }).subscribe(response => {
      this.friends.push(friendUsername);
    });
  }

  //TODO POST request to api/room/create -> create room 
  createRoom(): void {
    var roomName = (<HTMLInputElement>document.getElementById("name-room")).value;
    console.log("create room: " + roomName);
    var servername;
    Array.from(document.getElementsByClassName("selected-list-item")).forEach(btn => {
      if (btn.parentNode.previousSibling.previousSibling.textContent.trim() === "Servers") {
        servername = btn.textContent;
      }
    });
    var serverid = this.servers.find(server => server.name === servername).id;
    this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/room/create", { "serverid": serverid, "name": roomName, "type": "chat" }, { headers: { "authorization": localStorage.getItem("usertoken") } }).subscribe(response => {
      console.log(response);

    });
  }

  createServer(): void {
    console.log("create server: ");
    var serverName = (<HTMLInputElement>document.getElementById("name-server")).value;
    console.log("create server: " + serverName);
    this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/server/create", { "Name": serverName, "username": localStorage.getItem('username') }, { headers: { "authorization": localStorage.getItem("usertoken") } }).subscribe(response => {
      console.log(response);
    });
  }

  sendRoomChat(): void {
    var roomname;
    Array.from(document.getElementsByClassName("selected-list-item")).forEach(btn => {
      if (btn.parentNode.previousSibling.previousSibling.textContent.trim() === "Rooms") {
        roomname = btn.textContent;
      }
    });
    var roomid = this.rooms.find(room => room.name === roomname).id;
    var messageText = (<HTMLInputElement>document.getElementById("send-msg-input")).value;
    console.log("sent Message: " + messageText);
    this.http.post<any>(Globals.ip + ":" + Globals.port + "/api/room/sendchat", { "username": this.username, "time": Date.now(), "content": messageText, "roomid": roomid }, { headers: { "authorization": localStorage.getItem("usertoken") } }).subscribe(response => {
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
        if (btn.parentNode.previousSibling.previousSibling.textContent.trim() !== "Servers") {
          btn.classList.remove("selected-list-item");
        }
        element.classList.add("selected-list-item");
      });
    }
    else if (element.parentNode.previousSibling.previousSibling.textContent.trim() === "Rooms") {
      Array.from(document.getElementsByClassName("list-group-item list-group-item-action")).forEach(btn => {
        if (btn.parentNode.previousSibling.previousSibling.textContent.trim() !== "Servers") {
          btn.classList.remove("selected-list-item");
        }
      })
      element.classList.add("selected-list-item");
    }
  }
}

