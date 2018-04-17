import {Component, OnInit, ViewChild} from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { User } from '../components/user.interfaces';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { catchError, map, tap } from 'rxjs/operators';
import {LocationComponent} from "../shared/modules/location/location.component";
import {LocationService} from "../services/location.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    signupFullName:string;
    signupEmail:string;
    signupPassword:string;
    confirmPassword:string;

    user: any={};
  @ViewChild(LocationComponent)locationComponent:LocationComponent;


    constructor(
        public authService:AuthService,
        public flashMessagesService: FlashMessagesService,
        private router: Router,
        private locationService:LocationService,

    ) {
    }

    ngOnInit() {
      this.locationComponent.verticalView = true;

    }
    signUp(){
        this.user.emailVerified=false;
      this.user.locationId = this.locationService.getLocationIdFromLocation(this.locationComponent.location);
      let depth = this.locationService.getLocationDepthFromLocation(this.locationComponent.location);
        if(this.user.locationId<1||depth!=3) {
            this.flashMessagesService.show('Please Select Location.', {cssClass: 'alert-danger', timeout: 3000});
            return;
        }
      this.authService.registerUser(this.user).subscribe(data=>{
            let dataType:User;
            dataType=<User>data;
            if(dataType.userId){
                this.flashMessagesService.show('You are now registered! Congratulations.', {cssClass: 'alert-success', timeout: 3000});
                setTimeout(()=>{
                    this.router.navigate(['/login']);
               },3000);


            }else{
                this.flashMessagesService.show('You are now registered! Congratulations.', {cssClass: 'alert-danger', timeout: 3000});
            }
        },error=>{
            this.flashMessagesService.show(error.error.error.message, {cssClass: 'alert-danger', timeout: 3000});
        })
    }
}
