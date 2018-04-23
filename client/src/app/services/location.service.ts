import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {serverUrl} from "../config/globals";
import {Output} from "@angular/core";
import {EventEmitter} from "@angular/core";

@Injectable()
export class LocationService {

  locationChanged = false;
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http:HttpClient  )
  {

  };
  getLocations(){
    return this.http.get(serverUrl + 'api/locations')
      .map(res => res);
  }
  getLocationIdFromLocation(loc:any){
    if(loc.comunity>0)
      return loc.comunity;
    else if(loc.city>0)
      return loc.city;
    else if(loc.province>0)
      return loc.province;
    else if(loc.country>0)
      return loc.country;
    else return 0;
  }
  getLocationDepthFromLocation(loc:any){
    // return 1;
    if(loc.comunity>0)
      return 3;
    else if(loc.city>0)
      return 2;
    else if(loc.province>0)
      return 1;
    else if(loc.country>0)
      return 0;
    else
      return -1;
  }
  checkLocationContains(myId,locationId){
    return this.http.get(serverUrl + 'api/locations/checkLocationContains?myId='+myId+'&locationId='+locationId)
      .map(res => res);
  }
  getProvinces(countryId,countryName){
    return this.http.get(serverUrl + 'api/locations/getProvinces?countryId='+countryId+"&countryName="+countryName).map(res=>res);
  }
  getCountries(){
    return this.http.get(serverUrl + "api/locations/getCountries").map(res=>res);
  }
  getCities(countryId,provinceId,provinceName){
    return this.http.get(serverUrl + "api/locations/getCities?provinceId="+provinceId+"&provinceName="+provinceName+"&countryId="+countryId).map(res=>res);
  }
  getCommunities(provinceId,cityId,cityName){
    return this.http.get(serverUrl + "api/locations/getCommunities?provinceId="+provinceId + "&cityId="+cityId+"&cityName="+cityName).map(res=>res);
  }
  createCommunity(cityId,communityName){
    return this.http.get(serverUrl+"api/locations/createCommunity?cityId="+cityId+"&communityName="+communityName).map(res=>res);
  }
}
