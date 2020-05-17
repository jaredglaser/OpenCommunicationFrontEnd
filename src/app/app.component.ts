import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  ngOnInit(): void {
    document.getElementById("sign-out").addEventListener("click", this.signOut, false);
  }

  //TODO Determine whether or not user is logged in
  getLoggedIn(): void{
    // use get /api/security/authorize
  }

  //TODO sign user out
  signOut(): void{
    console.log("sign-out");
    document.getElementById("nav-logged-in").style.visibility = "hidden";
    document.getElementById("nav-logged-out").style.visibility = "visible";
  }



}


