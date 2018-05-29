import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationComponent} from "../../shared/modules/location/location.component";
import {LocationService} from "../../services/location.service";
import {ProposalService} from "../../services/proposal.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { routerTransitionRight } from '../../router.animations';

@Component({
  selector: 'app-create-proposal-steps',
  templateUrl: './create-proposal-steps.component.html',
  styleUrls: ['./create-proposal-steps.component.scss'],
  animations: [routerTransitionRight()]
})
export class CreateProposalStepsComponent implements OnInit {
  constructor(
      private locationService:LocationService,
      private proposalService:ProposalService,
      public flashMessagesService: FlashMessagesService
  ){

  }
  proposal={
    title:"",
    dates:{"year":(new Date()).getFullYear(),"month":(new Date()).getMonth()+1,"day":(new Date()).getDate()},
    date:"",
    details:"",
    locationId:"",
    displayUserName:1,
    priority:0,
    createdUser:0,
    locationLink:"",
    userName:"",
    userId:0,
    myVote:0,
    myPriority:0
  };
  canvote = true;
  created = false;
  btnNext = "Next";
  btnPrev = "Prev";

  step = 0;
  @ViewChild(LocationComponent)locationComponent:LocationComponent;
  ngOnInit() {
    let locationId = JSON.parse(localStorage.user).locationId;
    this.locationComponent.preLocationId = locationId;
    this.locationComponent.selecteDisabled = true;
  }
  submitProposal(){
    //get optional location id . for ex canada calgary to calgary. so you can find all location easily.
      this.proposal.locationId = this.locationService.getLocationIdFromLocation(this.locationComponent.location);
      this.proposal.createdUser = JSON.parse(localStorage["user"]).userId;
      this.proposal.date = this.proposal.dates.year + "-"+this.proposal.dates.month+"-"+this.proposal.dates.day;
      this.proposalService.createProposal(this.proposal).subscribe(data=>{
        this.created = true;
        this.flashMessagesService.show("Your proposal has been submitted", {cssClass: 'alert-success', timeout: 3000});
      },error=>{
        this.flashMessagesService.show(error.error.error.message, {cssClass: 'alert-warning', timeout: 3000});
      })
  }
  voteProposal(){
    console.log("vote proposal");
  }
  Continue(){
    switch(this.step){
      case 0:{
        if(this.proposal.title==null||this.proposal.title==''||this.proposal.title==undefined){
          this.flashMessagesService.show("Please input title.", {cssClass: 'alert-success', timeout: 3000});
          return ;
        }
        break;
      }
      case 1:{
        if(this.proposal.locationLink==null||this.proposal.locationLink==''||this.proposal.locationLink==undefined){
          this.flashMessagesService.show("Please input locationLink.", {cssClass: 'alert-success', timeout: 3000});
          return ;
        }
        break;
      }
      case 2:{
        if(this.proposal.details==null||this.proposal.details==''||this.proposal.details==undefined){
          this.flashMessagesService.show("Please input detail.", {cssClass: 'alert-success', timeout: 3000});
          return ;
        }
        break;
      }
      case 3:{
        break;
      }
      case 4:{
        break;
      }
    }
    if(this.step<5)
       this.step++;
    else
      this.step = 5;
    console.log(this.step);
  }
  Prev(){
    if(this.step>0)
      this.step--;
    else
      this.step = 0;
  }
}
