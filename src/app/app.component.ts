import { Component } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = window.localStorage.removeItem("username")!=null;

  constructor(private router: Router){}

  ngOnInit(): void {

     
  }
 

  //TODO sign user out
  signOut(): void{
    window.localStorage.removeItem("usertoken");
    window.localStorage.removeItem("username");
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
  }
 
  



}


