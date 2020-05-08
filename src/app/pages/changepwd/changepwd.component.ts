import { Component, OnInit } from '@angular/core';

// Should only be accessible if user is already logged in
@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css']
})
export class ChangepwdComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //TODO verify validity of oldpwd given before updating
  verifyPwd(user: string, pwd: string): boolean{
    return null;
  }

  //TODO update password for that user in database
  updatePwd(user: string, pwd: string): void{

  }

}
