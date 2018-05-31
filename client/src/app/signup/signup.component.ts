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
import {Proposal} from "../components/proposal.interfaces";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
  signupFullName: string;
  signupEmail: string;
  signupPassword: string;
  confirmPassword: string;
  countryHtml: string = "";
  countries: any = [];
  provinces: any = [];
  cities: any = [];
  communities: any = [];

  loc = {
    "country": {"name": "", "id": 0},
    "province": {"name": "", "id": 0},
    "city": {"name": "", "id": 0},
    "comunity": {"name": "", "id": 0}
  };

  user: any = {};
  @ViewChild(LocationComponent) locationComponent: LocationComponent;


  constructor(public authService: AuthService,
              public flashMessagesService: FlashMessagesService,
              private router: Router,
              private locationService: LocationService,) {
  }

  ngOnInit() {
    this.getCountries();
    console.log("province is ");
    console.log(this.loc.province.name);
  }

  signUp() {
    this.user.emailVerified = false;
    // this.user.locationId = this.locationService.getLocationIdFromLocation(this.locationComponent.location);
    // let depth = this.locationService.getLocationDepthFromLocation(this.locationComponent.location);
    if (this.loc.comunity.id<1) {
      this.flashMessagesService.show('Please Select a Community.', {cssClass: 'alert-danger', timeout: 3000});
      return;
    }
    this.user.locationId = this.loc.comunity.id;
    var now = new Date();

    this.authService.registerUser(this.user).subscribe(data => {
      let dataType: User;
      dataType = <User>data;
      if (dataType.userId) {
        this.flashMessagesService.show('You are now registered! Congratulations.', {
          cssClass: 'alert-success',
          timeout: 3000
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      } else {
        this.flashMessagesService.show('You are now registered! Congratulations.', {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
    }, error => {
      this.flashMessagesService.show(error.error.error.message, {cssClass: 'alert-danger', timeout: 3000});
    })
  }

  getCountries() {
    this.locationService.getCountries().subscribe(res => {
      let countries: Proposal;
      countries = <Proposal>res;
      this.countries = countries.proposals;
    })
  }

  changedCountry($event) {
    let countryName = $event.target.value;
    this.loc.country.name = countryName;
    if (countryName == "" || countryName == null || countryName == undefined)
      return;
    let countryId = -1;
    countryId = this.findId(countryName,this.countries);
    this.loc.country.id = countryId;
    this.locationService.getProvinces(countryId, countryName).subscribe(res => {
      let data: Proposal;
      data = <Proposal>res;
      if (countryId == -1) {//create new country
        this.countries = data.proposals;
        this.loc.country.id = this.findId(countryName,this.countries);
        this.provinces = [];
      } else {//select existed country
        let provinces: Proposal;
        provinces = <Proposal>res;
        this.provinces = provinces.proposals;
      }
      this.loc.province.name = "Please Select a Province";
      this.loc.province.id = 0;
      this.loc.city.name = "";
      this.loc.comunity.name = "";
      this.cities = [];
      this.communities = [];

    });
  }

  changedProvince($event) {
    let provinceName = $event.target.value;
    this.loc.province.name = provinceName;
    if (provinceName == "" || provinceName == null || provinceName == undefined)
      return;
    if(this.loc.country.id<1){
      this.flashMessagesService.show('Please Select a country.', {cssClass: 'alert-danger', timeout: 3000});
      return;
    }
    let provinceId = this.findId(provinceName,this.provinces);
    this.loc.province.id = provinceId;
    this.locationService.getCities(this.loc.country.id,provinceId, provinceName).subscribe(res => {
      let data: Proposal;
      data = <Proposal>res;
      if (provinceId == -1) {//create new country
        this.provinces = data.proposals;
        this.loc.province.id = this.findId(provinceName,this.provinces);
      } else {//select existed country
        let cities: Proposal;
        cities = <Proposal>res;
        this.cities = cities.proposals;
      }
      this.loc.city.name = "Please Select a City";
      this.loc.city.id = 0;
      this.loc.comunity.name = "";
      this.communities = [];
    });
  }
  changedCity($event) {
    let cityName = $event.target.value;
    this.loc.city.name = cityName;
    if (cityName == "" || cityName == null || cityName == undefined)
      return;
    if(this.loc.province.id<1){
      this.flashMessagesService.show('Please Select a province.', {cssClass: 'alert-danger', timeout: 3000});
      return;
    }

    let cityId = this.findId(cityName,this.cities);
    this.loc.city.id = cityId;
    this.locationService.getCommunities(this.loc.province.id,cityId,cityName).subscribe(res=>{
      let data:Proposal;
      data = <Proposal>res;
      if(cityId==-1){//create a new city
        this.cities = data.proposals;
        this.loc.city.id = this.findId(cityName,this.cities);
      }else{//select exist city
        let communities : Proposal;
        communities = <Proposal>res;
        this.communities = communities.proposals;
      }
    })
  }
  changedCommunity($event){
    let communityName = $event.target.value;
    if (communityName == "" || communityName == null || communityName == undefined)
      return;
    if(this.loc.city.id<1){
      this.flashMessagesService.show('Please Select a city.', {cssClass: 'alert-danger', timeout: 3000});
      return;
    }

    this.loc.comunity.name = communityName;
    let communityId = this.findId(communityName,this.communities);
    this.loc.comunity.id = communityId
    if(communityId==-1){//create a new community
      this.locationService.createCommunity(this.loc.city.id,communityName).subscribe(res=>{
        let data:Proposal;
        data = <Proposal>res;
        this.communities = data.proposals;
        this.loc.comunity.id = this.findId(communityName,this.communities);
      })
    }
  }
  findId(name,lists){
    let result = -1;
    for (var i = 0; i < lists.length; i++) {
      if (lists[i].name.toUpperCase() == name.toUpperCase()) {
        result = lists[i].id;
        break;
      }
    }
    return result;
  }
}
