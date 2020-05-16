import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


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

class message {
  time: string;
  from: string;
  classcontainer: string;
  classimage: string;
  timeclass: string;
  usernameclass: string;
  content: string;
}

const ROOMS: room[] = [
  { id: 101, name: "myroom", server: 11 },
  { id: 102, name: "aroom", server: 11 },
  { id: 103, name: "anotherroom", server: 12 },
  { id: 104, name: "room4", server: 12 },
  { id: 105, name: "room5", server: 13 },
  { id: 106, name: "room6", server: 13 },
  { id: 107, name: "room7", server: 14 },
  { id: 108, name: "room8", server: 15 },
];

const MESSAGES: message[] = [
  { time: "11:00", from: "otheruser", classcontainer: "container", classimage: "", timeclass: "time-right", usernameclass: "username-left", content: "whats up" },
  { time: "11:00", from: "jaredtest", classcontainer: "container darker", classimage: "right", timeclass: "time-left", usernameclass: "username-right", content: "whats up" },
  { time: "11:00", from: "otheruser", classcontainer: "container", classimage: "", timeclass: "time-right", usernameclass: "username-left", content: "whats up" },
  { time: "11:00", from: "otheruser", classcontainer: "container", classimage: "", timeclass: "time-right", usernameclass: "username-left", content: "whats up" },
  { time: "11:00", from: "jaredtest", classcontainer: "container darker", classimage: "right", timeclass: "time-left", usernameclass: "username-right", content: "whats up" },
  { time: "11:00", from: "jaredtest", classcontainer: "container darker", classimage: "right", timeclass: "time-left", usernameclass: "username-right", content: "whats up" },
  { time: "11:00", from: "otheruser", classcontainer: "container", classimage: "", timeclass: "time-right", usernameclass: "username-left", content: "whats up" },
  { time: "11:00", from: "jaredtest", classcontainer: "container darker", classimage: "right", timeclass: "time-left", usernameclass: "username-right", content: "whats up" },
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


  constructor() { }


  ngOnInit(): void {
    document.getElementById("refresh-chat").addEventListener("click", this.refreshChat, false);
    document.getElementById("refresh-friends").addEventListener("click", this.refreshFriendsList, false);
    document.getElementById("add-friend").addEventListener("click", this.addFriend, false);
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
    var friend = (<HTMLInputElement>document.getElementById("search-friend")).value;
    console.log("add friend: " + friend);

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

