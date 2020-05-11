import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/app/Globals';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  login(form : any){
    this.http.post<any>(Globals.ip+":"+Globals.port+"/api/security/login",{"username" : form.username, "password" : form.password}).subscribe( data => {
      alert(JSON.stringify(data));
    })
  }
  
}
