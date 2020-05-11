import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }
 
  register(){
    var user = (<HTMLInputElement>document.getElementById("username")).value;
    var pwd = (<HTMLInputElement>document.getElementById("pwd")).value;
    document.getElementById("heading").innerHTML = user;
    /*
    $.ajax({
      type: "post",
      url: "localhost:3000/api/security/register",
      data: {
        username: user,
        password: pwd
      },
      success: function(respone){
        console.log(respone);
      }
    });
    console.log("ajax register post sent");
    */
  }




}
