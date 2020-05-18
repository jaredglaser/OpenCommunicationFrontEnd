import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/Globals';
import { Location } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;


  constructor(private http: HttpClient, private location: Location) { }

  ngOnInit(): void {
  }
 
  register(form : any){
    var user = (<HTMLInputElement>document.getElementById("username")).value;
    var pwd = (<HTMLInputElement>document.getElementById("pwd")).value;
    
    this.http.post<any>(Globals.ip+":"+Globals.port+"/api/security/register",{"username" : form.username, "password" : form.password}).subscribe( data => {
      
    })
  }
    
}
