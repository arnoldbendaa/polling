import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../components/user.interfaces';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    mail:string;
    password:string;
    // authService:AuthService;
    returnUrl:string;
    constructor(public router: Router,
        public authService:AuthService,
        private route:ActivatedRoute,
        public flashMessagesService: FlashMessagesService,
    ) {

    }
    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl']||'/';
    }

    Login() {
        localStorage.setItem('isLoggedin', 'true');
        const user = {
          email: this.mail,
          password: this.password
        }

        console.log(user);
        this.authService.authenticateUser(user).subscribe(data=>{
            let dataType:User;
            dataType=<User>data;
            if(dataType.err=='1'){
              this.flashMessagesService.show("Invalid email or password",{cssClass: 'alert-warning', timeout: 3000});
              localStorage.setItem("is_login",'0');
              return;
            }

          dataType.email = user.email;
            dataType.password = user.password;
            this.authService.storeUserData(dataType.id, dataType);
            // this.authService.login = true;
          localStorage.setItem("is_login",'1');

            // this.router.navigate(['/dashboard']);
            this.router.navigateByUrl(this.returnUrl);
        },error=>{
            this.flashMessagesService.show(error.error.error.message, {cssClass: 'alert-warning', timeout: 3000});
            // this.authService.login = true;
          localStorage.setItem("is_login",'0');
        })
    }
}
