import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test';
  

  //TODO Determine whether or not user is logged in
  get loggedIn(): boolean {
    return null;
  }

  //TODO sign user out
  signOut(): void{

  }



}


