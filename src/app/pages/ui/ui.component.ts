import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


class server{
  id : number;
  name : string;
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
  constructor() { }


  ngOnInit(): void {
    
  }

  

}

