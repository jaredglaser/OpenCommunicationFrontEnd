import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals} from 'src/app/Globals';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    
  }

  login(form : any){
    this.http.post<any>(Globals.ip+":"+Globals.port+"/api/security/login",{"username" : form.username, "password" : form.password},{ headers: {"authorization":localStorage.getItem("usertoken")} }).subscribe( response => {
      window.localStorage.setItem("usertoken",response.data.token);
      window.localStorage.setItem("username",response.data.user.username);
      this.router.navigate(['/ui']);
    });
    
  }
  
}
