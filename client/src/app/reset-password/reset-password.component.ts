import { Component, OnInit } from '@angular/core';
import {routerTransition} from "../router.animations";
import {FlashMessagesService} from "angular2-flash-messages";
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [routerTransition()]

})
export class ResetPasswordComponent implements OnInit {
  user: any={};
  token:string="";

  constructor(
    public flashMessagesService: FlashMessagesService,
    public authService:AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.queryParams.subscribe(data=>{
      console.log('queryParams',data)
      this.user.access_token = data.access_token;
    })
  }

  ngOnInit() {

  }
  resetPassword(){
    console.log(this.user);
    this.authService.reset_password(this.user).subscribe(data=>{
      this.flashMessagesService.show('Password Changed.Please Login.', {cssClass: 'alert-success', timeout: 3000});
      setTimeout(()=>{
        this.router.navigate(['/login']);
      },3000);

    },error =>{
      this.flashMessagesService.show('Error!', {cssClass: 'alert-success', timeout: 3000});
    }) ;
  }
}
