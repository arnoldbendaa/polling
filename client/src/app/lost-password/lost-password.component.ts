import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss'],
  animations: [routerTransition()]

})
export class LostPasswordComponent implements OnInit {
  user: any={};
  constructor(
    public authService:AuthService,
    public flashMessagesService: FlashMessagesService

  ) { }

  ngOnInit() {
  }
  request_password_reset(){
    console.log(this.user);
    this.authService.request_password_reset(this.user).subscribe(data=>{
      this.flashMessagesService.show('Email Sent.Please check your email.', {cssClass: 'alert-success', timeout: 3000});
    },error =>{
      this.flashMessagesService.show('Error!', {cssClass: 'alert-success', timeout: 3000});
    }) ;
  }

}
