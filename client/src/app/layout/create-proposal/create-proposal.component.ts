import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationComponent} from "../../shared/modules/location/location.component";
import {LocationService} from "../../services/location.service";
import {ProposalService} from "../../services/proposal.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.scss'],
  animations: [routerTransition()]
})
export class CreateProposalComponent implements OnInit {
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
  detailWindow = false;
  canvote = true;
  created = false;
 @ViewChild(LocationComponent)locationComponent:LocationComponent;
  ngOnInit() {
    let locationId = JSON.parse(localStorage.user).locationId;
    // this.locationComponent.delay(300);
    // this.locationComponent.setLocation(locationId);
    this.locationComponent.preLocationId = locationId;
    this.locationComponent.selecteDisabled = true;
  }
  submitProposal(){
    //get optional location id . for ex canada calgary to calgary. so you can find all location easily.
    if(this.detailWindow){
      // console.log("vote proposal");
      // console.log(this.proposal);
      if(this.proposal.myPriority>100 || this.proposal.myPriority<0){
        // Swal("Please input between 0~100");
        this.flashMessagesService.show("Please input between 0~100", {cssClass: 'alert-danger', timeout: 3000});
        return;
      }

      var userId = JSON.parse(localStorage["user"]).userId;
      var proposals = [this.proposal];
      this.proposalService.vote(proposals,userId).subscribe(data=>{
        this.flashMessagesService.show("Success Voted", {cssClass: 'alert-success', timeout: 3000});
      },error=>{
        console.log(error);
      })

    }else{
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
  }
  voteProposal(){
    console.log("vote proposal");
  }
}
