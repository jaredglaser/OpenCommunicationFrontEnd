import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/app/Globals';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  login(form : NgForm){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post<any>(Globals.ip+":"+Globals.port+"/api/security/login",{username : form.controls.username, password : form.controls.password},httpOptions).subscribe( data => {
      alert(data);
    })
  }
  
}
