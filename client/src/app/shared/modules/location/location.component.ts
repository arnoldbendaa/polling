import { Component, OnInit , Inject} from '@angular/core';
import {LocationService} from "../../../services/location.service";
import { TranslateService } from '@ngx-translate/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  locations:any;
  communities:any=[];
  cities:any=[];
  provinces:any=[];
  countries:any=[];
  preLocationId=-1;
  selecteDisabled = false;
  verticalView = false;
  location={"country":0,"province":0,"city":0,"comunity":0};
  voteGov = false;
  constructor(
    private router:Router,
    private locationService : LocationService
  ) { }

  async ngOnInit() {
    await this.delay(300);
    this.getLocations();
  }
  getLocations(){
    this.locationService.getLocations().subscribe(res=>{
      this.locations = <Array<any>>res;
      for(let i = 0 ; i < this.locations.length; i++){
        if(this.locations[i].depth==0)
          this.countries.push(this.locations[i]);
      }
      if(this.preLocationId>0) this.setLocation(this.preLocationId);
    },err=>{
      console.log(err);
    })
  }
  changeCountry(){
    this.provinces = [];
    this.location.province = 0;
    this.location.city = 0;
    this.location.comunity = 0;
    for(let i = 0 ; i < this.locations.length; i++){
      if(this.locations[i].depth==1&&this.locations[i].parentId==this.location.country)
        this.provinces.push(this.locations[i]);
    }
    if(this.provinces.length>0){
      this.provinces.unshift({id:-1,name:"Select a Province",depth:1,parentId:this.location.country});
      this.location.province = this.provinces[0].id;
    }
    this.changeProvince();
  }
  changeProvince(){
    this.cities = [];
    this.location.city = 0;
    this.location.comunity = 0;
    for(let i = 0 ; i < this.locations.length; i++){
      if(this.locations[i].depth==2&&this.locations[i].parentId==this.location.province)
        this.cities.push(this.locations[i]);
    }
    if(this.cities.length>0){
      this.cities.unshift({id:-1,name:"Select a City",depth:2,parentId:this.location.province});
      this.location.city = this.cities[0].id;
    }

    this.changeCity();
  }
  changeCity(){
    this.communities = [];
    this.location.comunity = 0;
    for(let i = 0 ; i < this.locations.length; i++){
      if(this.locations[i].depth==3&&this.locations[i].parentId==this.location.city)
        this.communities.push(this.locations[i]);
    }
    if(this.communities.length>0){
      this.communities.unshift({id:-1,name:"Select a Community",depth:3,parentId:this.location.city});
      this.location.comunity = this.communities[0].id;
    }
    this.changeComunity();
  }
  changeComunity(){
    let url = this.router.url;
    this.locationService.change.emit(this.locationService.locationChanged);
    console.log("change location");
  }
  setLocation(locationId){
    let depth = -1;
    let index = this.getLocationIndexWithid(locationId);
    depth = this.locations[index].depth;
    if(depth==3){
      let cityId = this.locations[index].parentId;
      let cityIndex = this.getLocationIndexWithid(cityId);
      let provinceId = this.locations[cityIndex].parentId;
      let provinceIndex = this.getLocationIndexWithid(provinceId);
      let countryId = this.locations[provinceIndex].parentId;
      this.location.country = countryId;
      this.changeCountry();
      this.location.province = provinceId;
      this.changeProvince();
      this.location.city = cityId;
      this.changeCity();
      this.location.comunity = locationId;
      this.changeComunity();
    }else if(depth==2){
      let provinceId = this.locations[index].parentId;
      let provinceIndex = this.getLocationIndexWithid(provinceId);
      let countryId = this.locations[provinceIndex].parentId;
      this.location.country = countryId;
      this.changeCountry();
      this.location.province = provinceId;
      this.changeProvince();
      this.location.city = locationId;
      this.changeCity();
    }else if(depth==1){
      let countryId = this.locations[index].parentId;
      this.location.country = countryId;
      this.changeCountry();
      this.location.province = locationId;
      this.changeProvince();
    }else if(depth==0){
      this.location.country = locationId;
      this.changeCountry();
    }else
      return;
  }

  getLocationIndexWithid(id){
    for(var i = 0 ; i < this.locations.length; i ++){
      if(this.locations[i].id==id){
        return i;
      }
    }
    return -1;
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
